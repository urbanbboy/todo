import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { TodoPage } from "@/pages/TodoPage";
import { ReactNode } from "react";


export enum RouteNames {
    MAIN_PAGE = '/',
    TODO_PAGE = '/todos',
    DETAIL_PAGE = '/todos/:id',
    LOGIN_PAGE = '/login',
    REGISTER_PAGE = '/register',
    NOT_FOUND_PAGE = '*'
}

export interface Route {
    path: string;
    element: ReactNode;
    private?: boolean;
    layout: boolean | 'sidebar' | 'header'
}

export const routeConfig: Route[] = [
    {
        path: RouteNames.TODO_PAGE,
        element: <TodoPage />,
        private: true,
        layout: true
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
    },
    {
        path: RouteNames.NOT_FOUND_PAGE,
        element: <NotFoundPage/>,
        private: false,
        layout: false
    }
]