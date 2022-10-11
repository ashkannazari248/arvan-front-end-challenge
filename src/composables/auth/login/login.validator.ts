import { object, string } from "yup";

export const useLoginValidator = () => {
    const schema = object({
        email: string().required().email().label("Email"),
        password: string().required().label("Password"),
    });
    return { schema }
}