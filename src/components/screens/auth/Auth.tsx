import { FC, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../../hooks/useAuth'
import { UserService } from '../../../service/user.service'
import Button from '../../ui/button/Button'
import Search from '../../ui/search/Search'
import cn from 'classnames'

import styles from './Auth.module.scss'

const Auth: FC = () => {
	const { setIsAuth } = useAuth()
	const history = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [isType, setIsType] = useState<'auth' | 'reg'>('auth')

	const successLogin = (token: string) => {
		localStorage.setItem('token', token)

		setIsAuth(true)
		setPassword('')
		setEmail('')
		history('/')
		setName('')
	}

	const { mutate: register } = useMutation({
		mutationFn: (data: { email: string; password: string; name: string }) =>
			UserService.regUser(data),
		onSuccess(data) {
			successLogin(data?.data.token)
		},
	})

	const { mutate: auth } = useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			UserService.loginUser(data),
		onSuccess(data) {
			successLogin(data?.data.token)
		},
	})

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (isType === 'auth') {
			auth({ email, password })
		} else {
			register({ email, password, name })
		}
	}

	return (
		<div className={cn('wrapper', styles.wrapper)}>
			<form onSubmit={handleSubmit}>
				<Search
					placeholder='Имя'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<Search
					placeholder='Введите e-mail'
					value={email}
					type='email'
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<Search
					placeholder='Введите пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
					type='password'
				/>

				<div className={styles.buttonWrapper}>
					<Button
						text='Войти'
						style='purple'
						callback={() => setIsType('auth')}
					/>
					<Button
						text='Зарегистрироваться'
						style='purple'
						callback={() => setIsType('reg')}
					/>
				</div>
			</form>
		</div>
	)
}

export default Auth
