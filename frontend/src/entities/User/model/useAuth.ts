import { USER } from "@/shared/consts/userConst"
import { UserData, UserLoginData } from "./types/UserType"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/app/providers/StoreProvider"
import { userActions } from "./slice/userSlice"
import { toast } from "react-toastify"
import { getCurrentUser } from "./selectors/getCurrentUser"
import { useAboutMeQuery } from "./api/userApi"
// import { getCurrentUser } from "./selectors/getCurrentUser"

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { refetch } = useAboutMeQuery()

    const login = (data: UserLoginData) => {
        dispatch(userActions.setAuthData(data))
        // localStorage.setItem(USER.USER_DATA, JSON.stringify(data.user))
        localStorage.setItem(USER.REFRESH_TOKEN, JSON.stringify(data.refreshToken))
        localStorage.setItem(USER.ACCESS_TOKEN, JSON.stringify(data.accessToken))
        toast.success(data.message)
    }

    const setUserData = (data: UserData) => {
        dispatch(userActions.setUserData(data))
    }

    const logout = () => {
        dispatch(userActions.logout())
    }

    const getMe = () => {
        if (refetch) {
            return refetch();
        }
    };

    const currentUser = useSelector(getCurrentUser)

    return {
        login,
        logout,
        setUserData,
        currentUser,
        getMe
    }
}