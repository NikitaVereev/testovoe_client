import { useState } from 'react'
import App from '../App'
import { AuthContext } from '../context/AuthContext'
import Layout from '../components/common/Layout'

const AppProvider = () => {
	const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<Layout>
				<App />
			</Layout>
		</AuthContext.Provider>
	)
}

export default AppProvider
