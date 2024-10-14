import { LoginPage } from "@/pages/LoginPage";
import { TodoPage } from "@/pages/TodoPage";
import { ReactNode } from "react";


export enum RouteNames {
    TODO_PAGE = '/',
    LOGIN_PAGE = '/login',
    DETAIL_PAGE = '/:id'
}

export interface Route {
    path: string;
    element: ReactNode;
    private?: boolean;
    layout: boolean | 'header' | 'footer'
}

export const routeConfig: Route[] = [
    {
        path: RouteNames.TODO_PAGE,
        element: <TodoPage />,
        private: true,
        layout: 'header'
    },
    {
        path: RouteNames.LOGIN_PAGE,
        element: <LoginPage/>,
        private: false,
        layout: false
    },
    {
        path: RouteNames.DETAIL_PAGE,
        element: <div>DETAIL PAGE</div>,
        private: true,
        layout: false
    }
]