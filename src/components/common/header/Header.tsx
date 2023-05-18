import { FC, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { useAuth } from '../../../hooks/useAuth'
import { useOutsideAlerter } from '../../../hooks/useOutsideAlerter'

const Header: FC = ({ backCallback }: any) => {
	const { ref, isComponentVisible, setIsComponentVisible } =
		useOutsideAlerter(false)
	const { setIsAuth } = useAuth()
	const { isAuth } = useAuth()
	console.log(isAuth)
	const handleLogout = () => {
		localStorage.removeItem('token')
		setIsAuth(false)
		setIsComponentVisible(false)
	}

	const hamburgerArr = [
		{ name: 'Главная', link: '/' },
		{ name: 'Создать пост', link: '/create' },
		{ name: 'Профиль', link: '/profile' },
	]
	const [hamburger, setHamburger] = useState(0)

	const location = useLocation()
	const authPage = useNavigate()
	backCallback = () => authPage(-1)

	return (
		<header className={styles.header}>
			<div ref={ref}>
				{!isComponentVisible && (
					<ul className={styles.nav}>
						<li>
							{location.pathname !== '/' && (
								<button onClick={backCallback}>Назад</button>
							)}
						</li>
						{hamburgerArr.map((obj, index) => (
							<li key={index}>
								<Link
									onClick={() => setHamburger(index)}
									className={hamburger === index ? 'active' : ''}
									to={obj.link}
								>
									{obj.name}
								</Link>
							</li>
						))}
						<li>
							<button
								type='button'
								onClick={() => authPage(isAuth ? '/profile' : '/auth')}
							>
								{isAuth ? null : 'Войти'}
							</button>
						</li>
						{isAuth && (
							<li>
								<button onClick={handleLogout}>Выйти</button>
							</li>
						)}
					</ul>
				)}
			</div>
		</header>
	)
}

export default Header
