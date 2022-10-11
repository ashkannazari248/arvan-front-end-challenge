import {acceptHMRUpdate, defineStore} from 'pinia'
import type {User} from '@/composables/auth/User.interface';

import {useStorageStore} from "@/composables/storage/Storage.store";



const Storage =()=> useStorageStore()

const defaultState = () => ({
    user: {} as User,
})
export const useAuthStore = defineStore('auth', {
    state: defaultState,
    getters: {
        getUser: (state) => state.user,
        getToken: (state):string => {
            if (state.user?.token?.length)
                return state.user.token
            if (typeof Storage().getCookie('cookieToken') === 'string')
                return <string>Storage().getCookie('cookieToken')
            if (typeof Storage().getCookie('sessionToken')=== 'string')
                return <string>Storage().getCookie('sessionToken')
            return ''
        },
    },
    actions: {
        async setToken(token: string) {
            this.user.token = token
        },
         async setUser(user: User) {
            this.user = user
        },
        async checkLogin() {
            let token = this.getToken
            if (token && this.user.username)
                return Promise.resolve(true);
            else if (token && !this.user.username && Storage().getCookie('user')) {
                let user: any = Storage().getCookie('user')
                if (user?.username && user?.token) {
                    this.user = {...user}
                    return Promise.resolve(true);
                }
            }
            return Promise.resolve(false);
        },
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
