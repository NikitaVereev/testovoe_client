import { Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { routes } from './routes'
import { FC } from 'react'

const App: FC = () => {
	const { isAuth } = useAuth()

	return (
		<Routes>
			{routes.map(route => {
				if (route.auth && !isAuth) {
					return false
				}
				return (
					<Route
						path={route.path}
						element={<route.component />}
						{...(route.exact && { exact: true })}
						key={`route ${route.path}`}
					/>
				)
			})}
		</Routes>
	)
}

export default App
