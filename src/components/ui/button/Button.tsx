import { FC, MouseEventHandler } from 'react'
import styles from './Button.module.scss'

interface IButtonProps {
	callback?: MouseEventHandler<HTMLButtonElement>
	text?: string | React.ReactNode
	style?: string
}

const Button: FC<IButtonProps> = ({ callback, text, style }) => {
	return (
		<button
			type='submit'
			onClick={callback}
			className={`${styles.button} ${styles[style || '']}`}
		>
			{text}
		</button>
	)
}

export default Button
