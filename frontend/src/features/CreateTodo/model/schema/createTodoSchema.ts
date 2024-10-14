import * as Yup from 'yup'


export const createTodoSchema = Yup.object({
    text: Yup.string()
        .required("Заполните поле"),
    description: Yup.string()
        .required("Заполните поле"),
});