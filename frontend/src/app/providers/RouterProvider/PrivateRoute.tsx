import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RouteNames } from "./routeConfig";
import { useAuth } from "@/entities/User";

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
    const { isAuth } = useAuth()
    const { pathname } = useLocation()

    if(!isAuth) {
        return <Navigate to={RouteNames.LOGIN_PAGE} state={{ from: pathname }} />
    }

    return <>{children}</>
}