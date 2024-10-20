import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RouteNames } from "./routeConfig";
import { useAuth } from "@/entities/User";

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
    const { currentUser } = useAuth()
    const { pathname } = useLocation()

    if(!currentUser) {
        return <Navigate to={RouteNames.LOGIN_PAGE} state={{ from: pathname }} />
    }

    return <>{children}</>
}