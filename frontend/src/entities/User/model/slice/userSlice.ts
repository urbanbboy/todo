import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserData, UserLoginData, UserState } from "../types/UserType"
import { USER } from "@/shared/consts/userConst"


const initialState: UserState = {
    userAuthData: undefined,
    userData: undefined,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<UserLoginData>) => {
            state.userAuthData = action.payload
        },
        logout: (state) => {
            state.userAuthData = undefined
            state.userData = undefined
            localStorage.removeItem(USER.REFRESH_TOKEN)
            localStorage.removeItem(USER.ACCESS_TOKEN)
            localStorage.removeItem(USER.USER_DATA)
        },
        setUserData: (state, action: PayloadAction<UserData | undefined>) => {
            state.userData = action.payload
        }
    }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice