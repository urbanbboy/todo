import { Mutex } from "async-mutex";
import { USER } from "../consts/userConst";
import { userActions } from "@/entities/User";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { UserLoginData } from "@/entities/User/model/types/UserType";

interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
  }

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: __BASE_URL__,
    credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                if (localStorage.getItem(USER.REFRESH_TOKEN)) {
                    const refreshToken = JSON.parse(localStorage.getItem(USER.REFRESH_TOKEN) || '""');
                    console.log(refreshToken)
                    const refreshResult = await baseQuery(
                        {
                            url: "/auth/refresh-token",
                            body: {
                                refreshToken: refreshToken
                            },
                            method: "POST",
                        },
                        api,
                        extraOptions
                    );
                    if (refreshResult.data) {
                        console.log(refreshResult.data)
                        const { accessToken, refreshToken } = refreshResult.data as RefreshTokenResponse

                        api.dispatch(userActions.setAuthData(refreshResult.data as UserLoginData));
                        localStorage.setItem(USER.ACCESS_TOKEN, JSON.stringify(accessToken));
                        localStorage.setItem(USER.REFRESH_TOKEN, JSON.stringify(refreshToken));
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch(userActions.logout());
                    }
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
