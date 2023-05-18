import { FC, useState, useRef, FormEvent } from 'react'
import styles from './UpdatePost.module.scss'
import Button from '../../../../ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import { IoMdClose } from 'react-icons/io'
import Search from '../../../../ui/search/Search'
import { PostService } from '../../../../../service/post.service'

interface IData {
	message: string
	_id: string
	media: string
	close: () => void
}

const UpdatePost: FC<IData> = ({ message, _id, close, media }) => {
	const [isMessage, setIsMessage] = useState(message)
	const [isMedia, setIsMedia] = useState(media)
	const inputFileRef = useRef<HTMLInputElement | null>(null)

	const { mutate: updatePost } = useMutation({
		mutationFn: (data: { message: string; _id: string; media: string }) =>
			PostService.updatePost(data),
		onSuccess() {
			close()
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
			setIsMedia(data)
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
				setIsMedia(file.name)
			}
		} catch (err) {
			alert('Ошибка при загрузке файла')
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		updatePost({
			message: isMessage,
			_id: _id,
			media: `https://testovoeserver-production.up.railway.app/api${isMedia}`,
		})
	}

	const handleButtonClick = () => {
		if (inputFileRef.current) {
			inputFileRef.current.click()
		}
	}

	return (
		<div className={styles.overlay}>
			<div className={styles.wrapper}>
				<div className={styles.close}>
					<Button text={<IoMdClose />} callback={close} />
				</div>

				<form onSubmit={e => e.preventDefault()}>
					<div>
						<h2>Текст</h2>
						<Search
							placeholder='Изменить сообщение'
							value={isMessage}
							required
							onChange={e => setIsMessage(e.target.value)}
						/>
					</div>
					<div>
						<h2>Медиафайл</h2>
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

						{media &&
							(media.endsWith('.mp4') ? (
								<video src={`/uploads/${media}`} controls />
							) : (
								<img src={`/uploads/${media}`} alt={media} />
							))}
					</div>
					<Button callback={handleSubmit} text='Изменить' />
				</form>
			</div>
		</div>
	)
}

export default UpdatePost
