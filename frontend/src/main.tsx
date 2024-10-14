import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './index.css'
import { RouterProvider } from './app/providers/RouterProvider'
import { StoreProvider } from './app/providers/StoreProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme='light'
        />
        <RouterProvider>
            <StoreProvider>
                <App />
            </StoreProvider>
        </RouterProvider>
    </StrictMode>,
)
