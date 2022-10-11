import type {ToastFace} from "@/composables/toast/Toast.interface";
import {ToastEnum} from "@/composables/toast/Toast.interface";

import {useDebounceFn} from '@vueuse/core'
import {ref} from "vue";

const toastRef = ref<ToastFace>({show: false, message: '', type: ToastEnum.info})

export const useToast = () => {
    const time = ref(3000)

    const showToast = (
        {message, type = ToastEnum.info, showTime=3000}
            : { message: string, type: ToastEnum, showTime?: number }) => {
        if (showTime)
            time.value = showTime
        toastRef.value = {message, type, show: true}
        const debounceClose = useDebounceFn(() => {
            toastRef.value = {...toastRef.value, show: false}
        }, time.value)
        debounceClose()
    }
    return {showToast, toastRef}
}