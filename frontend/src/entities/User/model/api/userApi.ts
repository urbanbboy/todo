import { LoginSchema } from './../schemas/LoginSchema';
import { baseApi } from "@/shared/api/baseApi";
import * as Yup from 'yup'
import { UserLoginData } from "../types/UserType";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<UserLoginData, Yup.InferType<typeof LoginSchema>>({
            query: (data) => ({
                url: '/auth/login',
                method: "POST",
                body: data
            })
        })
    })
})

export const { 
    useLoginMutation    
} = userApi