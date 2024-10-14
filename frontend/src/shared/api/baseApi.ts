import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER } from "../consts/userConst";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: __BASE_URL__,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER.ACCESS_TOKEN)
            if(token) {
                headers.set('Authorization', `Bearer ${JSON.parse(token)}`)
            }
            return headers
        } 
    }),
    endpoints: () => ({}),
    tagTypes: ["todo", "user"]
})