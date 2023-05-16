import { FC } from 'react'
import styles from './Alert.module.scss'
import cn from 'classnames'

interface IAlert {
	type: string
	text: string
}

const Alert: FC<IAlert> = ({ type = 'success', text }) => {
	return (
		<div
			className={cn(styles.alert, {
				[styles.error]: type === 'error',
				[styles.warning]: type === 'warning',
				[styles.info]: type === 'info',
			})}
		>
			{text}
		</div>
	)
}

export default Alert
