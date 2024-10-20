import { LoginSchema } from './../schemas/LoginSchema';
import * as Yup from 'yup'
import { AboutMeResponse, UserLoginData, UserLogoutData } from "../types/UserType";
import { baseApiWithReAuth } from '@/shared/api/baseApiWithReAuth';
import { userActions } from '../slice/userSlice';

export const userApi = baseApiWithReAuth.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<UserLoginData, Yup.InferType<typeof LoginSchema>>({
            query: (data) => ({
                url: '/auth/login',
                method: "POST",
                body: data
            })
        }),
        register: build.mutation<UserLoginData, Yup.InferType<typeof LoginSchema>>({
            query: (data) => ({
                url: '/auth/register',
                method: "POST",
                body: data
            })
        }),
        aboutMe: build.query<AboutMeResponse, void>({
            query: () => ({
                url: 'auth/aboutme',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userActions.setUserData(data.result))
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                    dispatch(userActions.setUserData(undefined))
                }
            },
            providesTags: ["user"]
        }),
        refreshToken:  build.mutation<UserLogoutData,  { refreshToken: string | null }>({
            query: ({ refreshToken }) => ({
                url: '/auth/logout',
                method: "POST",
                body: { refreshToken },
            })
        }),
        logout: build.mutation<UserLogoutData,  { refreshToken: string | null }>({
            query: ({ refreshToken }) => ({
                url: '/auth/logout',
                method: "POST",
                body: { refreshToken },
            })
        }),
    })
})

export const { 
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useAboutMeQuery,
} = userApi