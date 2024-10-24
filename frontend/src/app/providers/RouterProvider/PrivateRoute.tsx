import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RouteNames } from "./routeConfig";
// import { useAuth } from "@/entities/User";
import { useAboutMeQuery } from "@/entities/User/model/api/userApi";

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
    // const { currentUser } = useAuth()
    const { isSuccess, isError } = useAboutMeQuery()
    const { pathname } = useLocation()


    if (isError) {
        return <Navigate to={RouteNames.LOGIN_PAGE} state={{ from: pathname }} />
    }
    if (isSuccess) {
        return <>{children}</>
    }
    return <></>
}