import {ToastEnum} from "@/composables/toast/Toast.interface";
import {useAuthStore} from "@/composables/auth/Auth.store";
import {currentUserService} from "@/composables/auth/user/currentUser.service";
import {useStorageStore} from "@/composables/storage/Storage.store";

import {useToast} from "@/composables/toast/useToast";
import {ref} from "vue";
import {useRouter} from "vue-router";
import type {SubmissionContext} from "vee-validate";





export const useCurrentUser = () => {
    const Storage = () => useStorageStore()
    const {showToast} = useToast()
    const loading = ref(false);
    const AuthStore = useAuthStore()
    const {user} = currentUserService();
    const error = ref("");


    const submit = (action?: SubmissionContext<Record<string, unknown>>): void => {
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
        user(customErrorFunc)
            .then(async (response) => {
                if (response?.user?.token) {
                    await AuthStore.setUser(response.user)
                    await Storage().setCookie('cookieToken', response.user.token, '1d')
                    showToast({message: `Welcome ${response.user.username}`, type: ToastEnum.success})
                }
            })
            .finally(() => {
                loading.value = false;
            });
    };
    return {loading, error, submit}
}