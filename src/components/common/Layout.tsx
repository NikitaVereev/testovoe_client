import React, { FC } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'

type IChildren = {
	children: React.ReactNode
}

const Layout: FC<IChildren> = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
