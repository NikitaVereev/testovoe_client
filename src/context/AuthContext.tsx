import { createContext } from 'react'

interface AuthContextType {
	isAuth: boolean
	setIsAuth: (auth: boolean) => void
}

export const AuthContext = createContext<AuthContextType>({
	isAuth: false,

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setIsAuth: () => {},
})
