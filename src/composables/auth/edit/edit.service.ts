import type {InferType} from "yup";
import {useFetch} from "@/composables/api/useFetchApi"
import type {User} from "@/composables/auth/User.interface";
import {useEditValidator} from "@/composables/auth/edit/edit.validator";

export const useEditService = () => {
    const {schema} = useEditValidator()
    const {fetch} = useFetch()
    const edit = ({email}: InferType<typeof schema>, customErrorFunc: Function) =>
        fetch({
            method: 'put',
            url: 'user',
            data: {
               user:{
                   email: email,
               }
            }, response: {customErrorFunc}
        }).then((response: any) => {
            if (response?.data?.user) {
                return <User>response.data.user
            }
            return response
        });
    return {edit}
}