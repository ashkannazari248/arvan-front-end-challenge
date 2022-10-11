import { object, string } from "yup";

export const useEditValidator = () => {
    const schema = object({
        email: string().required().email().label("Email"),
    });
    return { schema }
}