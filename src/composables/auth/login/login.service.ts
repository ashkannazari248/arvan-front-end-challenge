import type {InferType} from "yup";
import {useFetch} from "@/composables/api/useFetchApi"
import type {User} from "@/composables/auth/User.interface";
import {useLoginValidator} from "@/composables/auth/login/login.validator";


export const useLoginService = () => {
    const {schema} = useLoginValidator()
    const {fetch} = useFetch()
    const login = async ({email, password}: InferType<typeof schema>, customErrorFunc: Function) => {
        let response = await fetch({
            method: 'post',
            url: 'users/login',
            data: {
                user: {
                    email: email,
                    password: password
                }
            }, response: {customErrorFunc}
        })
        if (response?.data?.user) {
            return <User>response.data.user
        }
        return response

    }
    return {login}
}