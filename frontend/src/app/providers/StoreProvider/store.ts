import { todoReducer } from "@/entities/Todo";
import { userReducer } from "@/entities/User";
import { baseApi } from "@/shared/api/baseApi";
import { baseApiWithReAuth } from "@/shared/api/baseApiWithReAuth";
import { headerReducer } from "@/widgets/Header";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [baseApiWithReAuth.reducerPath]: baseApiWithReAuth.reducer,
        userReducer: userReducer,
        todoReducer: todoReducer,
        headerReducer: headerReducer
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat([
            baseApi.middleware,
            baseApiWithReAuth.middleware,
        ])
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch