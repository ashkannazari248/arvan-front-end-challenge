import {defineStore} from 'pinia'

import {useDebounceFn} from "@vueuse/core";
import {useCookies} from "vue3-cookies";
import {useToast} from "@/composables/toast/useToast";
import {ToastEnum} from "@/composables/toast/Toast.interface";
const {showToast} = useToast();

const cookies = useCookies().cookies
export const useStorageStore = defineStore({
    id: 'storage',
    state: () => ({
        cookieEnabled: true,
        localStorageEnabled: true,
        sessionStorageEnabled: true,
    }),
    getters: {
        getCookieEnabled: (state) => state.cookieEnabled,
        getLocalStorageEnabled: (state) => state.localStorageEnabled,
        getSessionStorageEnabled: (state) => state.sessionStorageEnabled,
    },
    actions: {
        async checkStoragePermissions() {
            await this.checkSessionStorageEnabled();
            await this.checkCookieEnabled()
            await this.checkLocalStorageEnabled()
            await this.showAlert()
        },
        showAlert(){
            return useDebounceFn(()=>{
            let message = ''
            if (!this.cookieEnabled)
                message += 'cookie '
            if (!this.localStorageEnabled)
                message += (!this.cookieEnabled && !this.sessionStorageEnabled ? '&' : (!this.cookieEnabled ? '& ' : '')) + 'localStorage '
            if (!this.sessionStorageEnabled)
                message += (!this.cookieEnabled || !this.localStorageEnabled ? '& ' : '') + 'sessionStorage '
            if (message) {
                message = `Your browser has been blocked from accessing ${message}. You must <b class="text-danger">unblock</b> through browser settings. <b class="text-danger">We will not</b> be able to provide you service until you <b class="text-success">unblock</b> it`
                showToast({message, type: ToastEnum.warning})
            }
        },100)},
        setCookie(key: string, value: any, expiresOn: string='') {
            if (!this.cookieEnabled)
                return this.showAlert()
            else {
                if (expiresOn)
                    cookies.set(key, value, expiresOn)
                else
                    cookies.set(key, value)
            }
        },
        getCookie(key: string): string | object | null {
            if (this.cookieEnabled)
                return cookies.get(key)
            else {
                this.showAlert()
                return null
            }
        },
        removeCookie(key: string) {
            if (this.cookieEnabled)
                cookies.remove(key)
            else
                this.showAlert()
        },
        async checkCookieEnabled() {
            let cookieEnabled = navigator.cookieEnabled;
            if (!cookieEnabled) {
                document.cookie = "testCookie";
                cookieEnabled = document.cookie.indexOf("testCookie") != -1;
            }
            this.cookieEnabled = cookieEnabled
            return cookieEnabled;
        },
        setLocalStorage(key: string, value: any) {
            if (!this.localStorageEnabled)
                return this.showAlert()
            else
                localStorage.setItem(key, value)
        },
        getLocalStorage(key: string) {
            if (this.localStorageEnabled)
                return localStorage.getItem(key)
            else {
                this.showAlert()
                return null
            }


        },
        removeLocalStorage(key: string) {
            if (!this.localStorageEnabled)
                this.showAlert()
            else
                localStorage.removeItem(key)
        },
        checkLocalStorageEnabled() {
            let test = 'testLocalStorage';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                this.localStorageEnabled = true
                return true;
            } catch (e) {
                this.localStorageEnabled = false
                return false;
            }
        },
        setSessionStorage(key: string, value: any) {
            if (!this.sessionStorageEnabled)
                this.showAlert()
            else
                sessionStorage.setItem(key, value)
        },
        getSessionStorage(key: string) {
            if (this.sessionStorageEnabled)
                return sessionStorage.getItem(key)
            else {
                this.showAlert()
                return null
            }


        },
        removeSessionStorage(key: string) {
            if (!this.sessionStorageEnabled)
                this.showAlert()
            else
                sessionStorage.removeItem(key)
        },
        checkSessionStorageEnabled() {
            try {
                sessionStorage.setItem('testSessionStorage', '')
                this.sessionStorageEnabled = true
                return true
            } catch (e) {
                this.sessionStorageEnabled = false
                return false;
            }
        },
    }
})
