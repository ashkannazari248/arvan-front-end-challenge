import type {InferType} from "yup";
import {useFetch} from "@/composables/api/useFetchApi"
import type {User} from "@/composables/auth/User.interface";
import {useRegisterValidator} from "@/composables/auth/register/register.validator";

export const useRegisterService = () => {
    const {schema} = useRegisterValidator()
    const {fetch} = useFetch()
    const register = ({email, password,username}: InferType<typeof schema>, customErrorFunc: Function) =>
        fetch({
            method: 'post',
            url: 'users',
            data: {
               user:{
                   email: email,
                   password: password,
                   username: username,
               }
            }, response: {customErrorFunc}
        }).then((response: any) => {
            if (response?.data?.user) {
                return <User>response.data.user
            }
            return response
        });
    return {register}
}