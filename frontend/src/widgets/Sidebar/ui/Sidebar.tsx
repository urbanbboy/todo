import { getSidebarCollapsed } from '@/widgets/Header/model/selectors/getSidebarCollapsed'
import { Avatar, Button, Layout, Menu } from 'antd'
import { useSelector } from 'react-redux'
import {
    ProjectOutlined,
    UnorderedListOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import cls from './Sidebar.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useLogoutMutation } from '@/entities/User';
import { USER } from '@/shared/consts/userConst';
import { UserLogoutData } from '@/entities/User/model/types/UserType';
import { toast } from 'react-toastify';
import { RouteNames } from '@/app/providers/RouterProvider';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { memo, useCallback } from 'react';


export const Sidebar = () => {
    const navigate = useNavigate()
    const collapsed = useSelector(getSidebarCollapsed)
    const [logoutUser] = useLogoutMutation()
    const { logout } = useAuth()


    const AppLogo = memo(() => {
        return (
            <Avatar
                src={'/logo.png'}
            />
        )
    })

    const handleLogout = useCallback(async () => {
        const refreshToken = localStorage.getItem(USER.REFRESH_TOKEN);
        if (refreshToken) {
            const parsedToken = JSON.parse(refreshToken);

            await logoutUser({ refreshToken: parsedToken })
                .then((data) => {
                    logout();
                    navigate(RouteNames.LOGIN_PAGE)
                    toast(data.data?.message)
                })
                .catch((error: FetchBaseQueryError) => {
                    const data = error.data as UserLogoutData
                    toast.error(data.message)
                })
            console.error("Refresh token не найден в localStorage");
        }
    }, [])


    return (
        <Layout.Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className={cls.sidebar}
        >
            <div className={cls.sidebarContainer}>
                <div>
                    <div className={cls.logo}>
                        <AppLogo />
                    </div>
                    <Menu
                        className={cls.sidebarMenu}
                        theme='dark'
                        mode='inline'
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                            <Link to="/todos">Todo</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ProjectOutlined />}>
                            <Link to="/board">Board</Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <Button onClick={handleLogout} color='default' className={cls.logout}>
                    <PoweroffOutlined className={cls.logoutIcon} />
                </Button>
            </div>

        </Layout.Sider>
    )
}
