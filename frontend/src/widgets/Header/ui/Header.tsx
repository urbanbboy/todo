import { useSelector } from 'react-redux'
import './Header.css'
import { getCurrentUser } from '@/entities/User/model/selectors/getCurrentUser'

export const Header = () => {
    const user = useSelector(getCurrentUser)

    return (
        <header className="header">
            <div className='header_container'>
                <div className='header_user'>
                    {user?.username}
                    <div className='avatar'></div>
                </div>
            </div>
        </header>
    )
}
