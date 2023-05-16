import { FC, ChangeEvent } from 'react'
import styles from './Search.module.scss'

interface ISearchProps {
	value: string
	placeholder: string
	type?: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	required?: boolean
}

const Search: FC<ISearchProps> = ({
	value,
	placeholder,
	type = 'text',
	onChange,
	required,
}) => {
	return (
		<input
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			className={styles.input}
			required={required}
		/>
	)
}

export default Search
