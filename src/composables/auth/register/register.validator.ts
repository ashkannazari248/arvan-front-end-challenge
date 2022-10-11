import { object, string } from "yup";

export const useRegisterValidator = () => {
    const schema = object({
        email: string().required().email().label("Email"),
        password: string().min(6).required().label("Password"),
        username: string().required().label("Username"),
    });
    return { schema }
}