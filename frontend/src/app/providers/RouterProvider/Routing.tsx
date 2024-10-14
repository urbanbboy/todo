import { Route, Routes } from "react-router-dom"
import { routeConfig } from "./routeConfig"
import { PrivateRoute } from "./PrivateRoute"
import { ReactNode, Suspense } from "react"
import { PageLoader } from "@/shared/ui/PageLoader"
import { Header } from "@/widgets/Header"


export const Routing = () => {
    const routeElement = (element: ReactNode) => {
        return <Suspense fallback={<PageLoader />} >{element}</Suspense>
    }

    const withLayout = (element: ReactNode, layout: boolean | 'header' | 'footer') => {
        if(layout == 'header') {
            return (
                <>
                    <Header/>
                    {element}
                </>
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