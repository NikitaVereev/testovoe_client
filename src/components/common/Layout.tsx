import React, { FC } from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import styles from './Layout.module.scss'

type IChildren = {
	children: React.ReactNode
}

const Layout: FC<IChildren> = ({ children }) => {
	return (
		<div className={styles.main}>
			<Header />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
