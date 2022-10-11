import {useFetch} from "@/composables/api/useFetchApi"
import type {User} from "@/composables/auth/User.interface";


export const currentUserService = () => {
    const {fetch} = useFetch()
    const user = (customErrorFunc: Function) =>
        fetch({
            method: 'get',
            url: 'user',
            response: {customErrorFunc}
        }).then((response: any) => {
            if (response?.data?.user) {
                return <User>response.data.user
            }
            return response
        });
    return {user}
}