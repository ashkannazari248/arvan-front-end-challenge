import {defineStore} from 'pinia'
import type {LoadingInterface} from '@/composable/loading/Loading.interface'
const defaultState = (): LoadingInterface => ({
    loading:0
})
export const useLoadingStore = defineStore({
    id: 'loading',
    state: defaultState,
    getters: {
        getLoading: (state) => state.loading,
    },
    actions: {
        async startLoading(): Promise<any> {
            this.loading++
            return this.loading
        },
        async finishLoading(): Promise<any> {
            setTimeout(() => {
                --this.loading
                return this.loading
            }, 200)

        },
    }
})
