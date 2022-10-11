import {ToastEnum} from "@/composables/toast/Toast.interface";
import {useAuthStore} from "@/composables/auth/Auth.store";
import {useLoginService} from "@/composables/auth/login/login.service";
import {useStorageStore} from "@/composables/storage/Storage.store";

import {useToast} from "@/composables/toast/useToast";
import {ref} from "vue";
import {useRouter} from "vue-router";
import type {SubmissionContext} from "vee-validate";





export const useLogin = () => {
    const Storage = () => useStorageStore()
    const {showToast} = useToast()
    const loading = ref(false);
    const AuthStore = useAuthStore()
    const {login} = useLoginService();
    const error = ref("");



    const router = useRouter()
    const submit = (values,action: SubmissionContext<Record<string, unknown>>): void => {
        loading.value = true;
        error.value = "";
        const customErrorFunc = (resError) => {
            if (resError?.response?.status === 401) {
                error.value = "The username or password is incorrect";
            } else if (resError?.response?.status === 403) {
                error.value = "The email or password is incorrect";
            } else {
                error.value = "An error has occurred"
            }
            showToast({message:  error.value, type: ToastEnum.error})
        }
        login(values, customErrorFunc)
            .then(async (response) => {
                if (response?.user?.token) {
                    await AuthStore.setUser(response.user)
                    await Storage().setCookie('cookieToken', response.user.token, '1d')
                    showToast({message: `Welcome ${response.user.username}`, type: ToastEnum.success})
                    await router.push('/')
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };
    return {loading, error, submit}
}