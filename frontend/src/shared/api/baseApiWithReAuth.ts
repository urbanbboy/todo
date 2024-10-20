import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryReAuth";
import { USER } from "../consts/userConst";

export const baseApiWithReAuth = createApi({
    baseQuery: async (args, api, extraOptions) => {
        if (!args.headers) {
            args.headers = new Headers();
        }
        const token = localStorage.getItem(USER.ACCESS_TOKEN);
        if (token) {
            args.headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
        }

        const baseQueryResult = await baseQueryWithReauth(args, api, extraOptions);
        return baseQueryResult;
    },
    reducerPath: "baseApiWithReAuth",
    endpoints: () => ({}),
    tagTypes: ["todo", "user"],
});
