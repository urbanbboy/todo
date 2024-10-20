import { Route, Routes } from "react-router-dom"
import { routeConfig } from "./routeConfig"
import { PrivateRoute } from "./PrivateRoute"
import { ReactNode, Suspense } from "react"
import { PageLoader } from "@/shared/ui/PageLoader"
import { Header } from "@/widgets/Header"
import { Layout } from "antd"
import { Sidebar } from "@/widgets/Sidebar"


export const Routing = () => {
    const routeElement = (element: ReactNode) => {
        return <Suspense fallback={<PageLoader />} >{element}</Suspense>
    }

    const withLayout = (element: ReactNode, layout: boolean | 'header' | 'sidebar') => {
        if (layout == 'header') {
            return (
                <Layout className="container">
                    <Header />
                    <Layout.Content>
                        {element}
                    </Layout.Content>
                </Layout>
            )
        }

        if (layout == true) {
            return (
                <Layout className="sidebarBackground">
                    <Sidebar />
                    <Layout className="container">
                        <Header />
                        <Layout.Content>
                            {element}
                        </Layout.Content>
                    </Layout>
                </Layout>
            )
        }

        return element
    }

    return (
        <Routes>
            {routeConfig.map(route =>
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        route.private ? (<PrivateRoute>
                            {withLayout(routeElement(route.element), route.layout)}
                        </PrivateRoute>)
                            : (route.element)
                    }
                />
            )}
        </Routes>
    )
}