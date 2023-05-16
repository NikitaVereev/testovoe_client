import Auth from './components/screens/auth/Auth'
import CreatePost from './components/screens/create-post/CreatePost'
import Home from './components/screens/home/Home'

export const routes = [
	{
		path: '/',
		exact: false,
		component: Home,
		auth: false,
	},
	{
		path: '/auth',
		exact: false,
		component: Auth,
		auth: false,
	},
	{
		path: '/create',
		exact: false,
		component: CreatePost,
		auth: true,
	},
]
