import { USER } from "@/shared/consts/userConst"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserData, UserLoginData, UserState } from "../types/UserType"


const initialState: UserState = {
    userAuthData: undefined,
    userData: undefined
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
            localStorage.removeItem(USER.ACCESS_TOKEN)
        },
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload
        }
    }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice