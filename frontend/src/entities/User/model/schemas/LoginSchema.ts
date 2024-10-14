import * as Yup from 'yup'


export const LoginSchema = Yup.object({
    username: Yup.string()
        .required("Заполните поле"),
    password: Yup.string()
        .min(4, "Пароль должен быть не меньше 4 символов")
        .required("Укажите пароль"),
});