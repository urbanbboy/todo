import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Layout } from 'antd';
import { AppDispatch } from '@/app/providers/StoreProvider';
import { getCurrentUser } from '@/entities/User/model/selectors/getCurrentUser'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { getSidebarCollapsed } from '../model/selectors/getSidebarCollapsed';
import { headerActions } from '../model/slice/headerSlice';
import cls from './Header.module.scss'


export const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(getCurrentUser)
    const collapsed = useSelector(getSidebarCollapsed)

    const setCollapsed = useCallback(() => {
        dispatch(headerActions.setCollapsed(!collapsed))
    }, [collapsed, dispatch])


    return (
        <Layout.Header className={cls.header}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined className={cls.menuCollapse} /> : <MenuFoldOutlined className={cls.menuCollapse} />}
                onClick={setCollapsed}
                className={cls.collapseButton}
            />
            <div className={cls.userInfo}>
                <span className={cls.username}>{user?.username}</span>
                <Avatar
                    className={cls.avatar}
                    icon={<UserOutlined />}
                />
            </div>

        </Layout.Header>
    )
}
