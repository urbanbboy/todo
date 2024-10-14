import { USER } from "@/shared/consts/userConst"
import { UserData, UserLoginData } from "./types/UserType"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/app/providers/StoreProvider"
import { userActions } from "./slice/userSlice"
import { toast } from "react-toastify"
// import { getCurrentUser } from "./selectors/getCurrentUser"

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>()

    const login = (data: UserLoginData) => {
        dispatch(userActions.setAuthData(data))
        localStorage.setItem(USER.USER_DATA, JSON.stringify(data.user))
        localStorage.setItem(USER.ACCESS_TOKEN, JSON.stringify(data.token))
        toast.success(data.message)
    }

    const setUserData = (data: UserData) => {
        dispatch(userActions.setUserData(data))
    }

    const logout = () => {
        dispatch(userActions.logout())
    }

    // const isAuth = useSelector(getCurrentUser)
    const isAuth = localStorage.getItem(USER.USER_DATA)

    return {
        login,
        logout,
        setUserData,
        isAuth,
    }
}