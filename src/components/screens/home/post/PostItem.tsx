import { FC } from 'react'
import styles from './PostItem.module.scss'
import { PostService } from '../../../../service/post.service'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import Button from '../../../ui/button/Button'
import { UserService } from '../../../../service/user.service'
import { useAuth } from '../../../../hooks/useAuth'

const PostItem: FC = ({ posts }: any) => {
	const queryClient = useQueryClient()
	const { isAuth } = useAuth()

	const { data, isLoading } = useQuery(['only user'], () => {
		if (isAuth) {
			return UserService.getUser()
		} else {
			return {}
		}
	})

	const { mutate: deletePost } = useMutation({
		mutationFn: (data: { _id: string }) => PostService.deletePost(data),
		onSuccess() {
			queryClient.invalidateQueries()
		},
	})

	const handleClick = () => {
		deletePost(posts._id)
	}

	const date = new Date(posts.createdAt)

	const year = date.getFullYear()
	const month = ('0' + (date.getMonth() + 1)).slice(-2)
	const day = ('0' + date.getDate()).slice(-2)
	const hours = ('0' + date.getHours()).slice(-2)
	const minutes = ('0' + date.getMinutes()).slice(-2)
	const seconds = ('0' + date.getSeconds()).slice(-2)

	const formattedTime = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`

	return (
		<>
			<div className={styles.wrapper}>
				{isLoading ? (
					<div>Загрузка...</div>
				) : (
					<div className={styles.button}>
						{
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							data?.email === posts.user.email ? (
								<Button callback={handleClick} text='X' style='close' />
							) : null
						}
					</div>
				)}
				<h2 className={styles.user}>{posts.user.name}</h2>
				<div className={styles.content}>
					<h1>{posts.message}</h1>
					{posts.media &&
						(posts.media.endsWith('.mp4') ? (
							<video src={`${posts.media}`} controls />
						) : (
							<img src={`${posts.media}`} alt={posts.media} />
						))}
				</div>
				<p className={styles.date}>{formattedTime}</p>
			</div>
		</>
	)
}

export default PostItem
