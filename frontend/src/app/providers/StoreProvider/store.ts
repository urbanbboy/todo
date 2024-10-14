import { todoReducer } from "@/entities/Todo";
import { userReducer } from "@/entities/User";
import { baseApi } from "@/shared/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        userReducer: userReducer,
        todoReducer: todoReducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat([
            baseApi.middleware
        ])
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch