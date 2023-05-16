import { FC, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { PostService } from '../../../service/post.service'
import Button from '../../ui/button/Button'
import Search from '../../ui/search/Search'

const CreatePost: FC = () => {
	const [isMessage, setIsMessage] = useState('')
	const history = useNavigate()

	const { mutate: createPost } = useMutation({
		mutationFn: (data: { message: string }) => PostService.createPost(data),
		onSuccess() {
			history('/')
		},
	})

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		createPost({ message: isMessage })
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Search
					placeholder='Пост...'
					value={isMessage}
					onChange={e => setIsMessage(e.target.value)}
					required
				/>
				<Button text='Добавить' style='purple' />
			</form>
		</div>
	)
}

export default CreatePost
