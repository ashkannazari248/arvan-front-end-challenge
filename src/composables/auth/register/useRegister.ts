import {ToastEnum} from "@/composables/toast/Toast.interface";
import {useAuthStore} from "@/composables/auth/Auth.store";
import {useRegisterService} from "@/composables/auth/register/register.service";
import {useToast} from "@/composables/toast/useToast";
import {ref} from "vue";
import {useRouter,} from "vue-router";
import type {SubmissionContext,} from "vee-validate";


const {useStorageStore} = await import("@/composables/storage/Storage.store");
const Storage = () => useStorageStore()


export const useRegister = () => {
    const {showToast} = useToast()
    const loading = ref(false);
    const AuthStore = useAuthStore()
    const {register} = useRegisterService();
    const error = ref("");
    


    const router = useRouter()
    const submit = (values,action: SubmissionContext<Record<string, unknown>>): void => {
        loading.value = true;
        error.value = "";
        const customErrorFunc = (resError) => {
            if (resError?.response?.status === 422 && resError?.response?.data?.errors) {
                for (const key in resError.response.data.errors) {
                    action.setFieldError(key, resError.response.data.errors[key]);
                }
                error.value = resError.response.data.errors;
            } else {
                error.value = "An error has occurred"
                showToast({message:  error.value, type: ToastEnum.error})
            }

        }
        register(values, customErrorFunc)
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