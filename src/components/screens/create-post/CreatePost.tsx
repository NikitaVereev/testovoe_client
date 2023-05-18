import { FC, useState, useRef, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { PostService } from '../../../service/post.service'
import Button from '../../ui/button/Button'
import Search from '../../ui/search/Search'
import cn from 'classnames'
import styles from './CreatePost.module.scss'

const CreatePost: FC = () => {
	const [isMessage, setIsMessage] = useState('')
	const [media, setMedia] = useState('')
	const inputFileRef = useRef<HTMLInputElement | null>(null)
	const history = useNavigate()

	const { mutate: createPost } = useMutation({
		mutationFn: (data: { message: string; media: string | null }) =>
			PostService.createPost(data),
		onSuccess() {
			history('/')
		},
	})
	const { mutate: uploadFile } = useMutation({
		mutationFn: async (data: { media: File }) => {
			try {
				const formData = new FormData()
				formData.append('file', data.media)
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				const response = await PostService.uploadFile(formData)
				return response.data.url
			} catch (error) {
				throw new Error('Ошибка при загрузке файла')
			}
		},
		onSuccess: data => {
			setMedia(data)
			console.log('Файл успешно загружен')
		},
		onError: () => {
			alert('Ошибка при загрузке файла')
		},
	})

	const handleChangeFile = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			const file = event.target.files?.[0]
			if (file) {
				uploadFile({ media: file })
				setMedia(file.name)
			}
		} catch (err) {
			alert('Ошибка при загрузке файла')
		}
	}

	const onClickRemoveImage = () => {
		setMedia('')
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		const formData = new FormData()
		console.log(formData)
		formData.append('message', isMessage)
		if (media) {
			formData.append('media', media)
		}

		createPost({
			message: isMessage,
			media: media
				? `https://testovoeserver-production.up.railway.app/api${media}`
				: '',
			// `http://localhost:4200/api/uploads/${media}`,
		})
	}

	const handleButtonClick = () => {
		if (inputFileRef.current) {
			inputFileRef.current.click()
		}
	}

	return (
		<div className={cn(styles.wrapper, 'wrapper')}>
			<form onSubmit={e => e.preventDefault()} encType='multipart/form-data'>
				<Button
					text='Загрузить медиафайл'
					style='purple'
					callback={handleButtonClick}
				/>
				<input
					type='file'
					onChange={handleChangeFile}
					ref={inputFileRef}
					hidden
				/>
				{media && (
					<>
						<Button
							style='purple'
							callback={onClickRemoveImage}
							text='Удалить файл'
						/>{' '}
						<div>
							<img src={`${media}`} alt='Uploaded' />
						</div>
					</>
				)}

				<Search
					placeholder='Пост...'
					value={isMessage}
					onChange={e => setIsMessage(e.target.value)}
					required
				/>

				<Button callback={handleSubmit} text='Добавить' style='purple' />
			</form>
		</div>
	)
}

export default CreatePost
