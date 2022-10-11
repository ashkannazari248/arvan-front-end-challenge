import type {Method} from "axios"
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {useLoadingStore} from "@/composables/loading/Loading.store";
import {ToastEnum} from "@/composables/toast/Toast.interface";
import {useToast} from "@/composables/toast/useToast";
import {useAuthStore} from "@/composables/auth/Auth.store";
import * as CONFIG from "@/composables/api/api.config";
import { ref} from "vue";
import {useStorageStore,} from "@/composables/storage/Storage.store";
import {plainToInstance} from 'class-transformer';




export const useFetch=()=>{
    const {showToast} = useToast();
    const route = useRoute();
    const router = useRouter();
    const Auth = useAuthStore();

    const Storage =useStorageStore()
    const Loading = useLoadingStore()
    const INSTANCE = ref<any>(null);
    

    const resultHasError = (result: any): boolean => {
        return result.isAxiosError || result?.data?.isFailed === true
    }

    const headerToken =(instance)=> ({
        get: () => Auth.getToken,
        set: (value: string) =>{ instance.defaults.headers.common['Authorization'] = value;Auth.setToken(value)}
    })
    const setToke = async (instance) => {
        if (Auth.getToken) {
            headerToken(instance).set(Auth.getToken);
            await Auth.checkLogin()
        }
    }
    const createInstance = () => axios.create({
        baseURL: CONFIG.BASE_URL,
        headers: {
            "Content-Type": "application/json",
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': Auth.getToken,
        }
    });


    const instanceRequestHandler = (instance: any, customRequestFunc?: Function, customErrorFunc?: Function) => {

        instance.interceptors.request.use(async (config: any) => {
            if (config.cancelToken)
                config.cancelToken.throwIfRequested();
            if (customRequestFunc) {
                let cancel = axios.Cancel
                return await customRequestFunc(config, cancel)
            } else {
                if (!config.headers.common?.Authorization)
                    await setToke(instance);
                await Loading.startLoading()
                return config
            }
        }, async (error: any) => {
            if (!CONFIG.isProd)
                console.log('request error', error)
            if (customErrorFunc) {
                await customErrorFunc(error)
            } else {
                setTimeout(() => {
                    Loading.finishLoading()
                }, 300)
                showToast({message: 'Error fetch data', type: ToastEnum.error})
            }
            return error

        })
    }
    const instanceResponseHandler = (instance: any, customResponseFunc?: Function, customErrorFunc?: Function) => {
        instance.interceptors.response.use(async (config: any) => {
            if (customResponseFunc) {
                let cancel = axios.Cancel
                return await customResponseFunc(config, cancel)
            } else {
                setTimeout(() => {
                    Loading.finishLoading()
                }, 300)
                return config
            }
        }, async (error: any) => {
            if (!CONFIG.isProd)
                console.log('response error', error)
            if (customErrorFunc) {
                await customErrorFunc(error)
            } else {
                setTimeout(() => {
                    Loading.finishLoading()
                }, 300)
                if (!CONFIG.isProd)
                    console.log('response error', error)
                if (error?.toJSON() && error.toJSON()?.message === 'Network Error') {
                    if (!window.navigator.onLine)
                        showToast({message: 'Your device is not connected to the Internet!', type: ToastEnum.warning})
                } else if (error.response && error.response.status) {
                    if (error.response.status === 401) {
                        Storage.removeSessionStorage('sessionToken')
                        Storage.removeCookie('cookieToken')
                        Storage.removeCookie('user')
                        if (!route.query.from)
                            await router.push({name: 'login', query: {from: route.fullPath}})
                        else
                            await router.push({name: 'login', query: {from: route.query.from}})
                    }
                } else
                    showToast({message: 'Fetch error : ' + error.response.status, type: ToastEnum.error})
            }
            return error
        })
    }


    const fetch = async (payload: {
        method: Method,
        query?: { key: string, value: string | number }[],
        url: string,
        data?: any,
        classTransformer?: null,
        header?: object,
        request?: { customRequestFunc?: Function, customErrorFunc?: Function },
        response?: { customResponseFunc?: Function, customErrorFunc?: Function }
    }) => {
        const instance = createInstance()
        await setToke(instance);
        instanceRequestHandler(instance, payload.request?.customRequestFunc, payload.request?.customErrorFunc)
        instanceResponseHandler(instance, payload.response?.customResponseFunc, payload.response?.customErrorFunc)

        if (payload.method === 'delete')
            payload.data = {data: {...payload.data}}
        if (payload.query && payload.query.length) {
            await payload.query.forEach(({key, value}, index) => {
                if (index === 0)
                    payload.url += '?'
                else
                    payload.url += '&'
                payload.url += `${key}=${encodeURIComponent(value)}`
            })
        }
        try {
            let result = await instance[payload.method](payload.url, payload.data, payload.header || {})
            if (payload.classTransformer != null && resultHasError(result))
                return plainToInstance(payload.classTransformer, result.data);
            return result.data

        } catch (e) {
            if (!CONFIG.isProd)
                console.log('error Auth.store.ts', e)
            return e
        }

    }

    return {INSTANCE,resultHasError,createInstance,instanceRequestHandler,instanceResponseHandler,fetch,token:Auth.getToken}
}




