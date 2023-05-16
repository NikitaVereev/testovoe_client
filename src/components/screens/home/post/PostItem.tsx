import { FC } from 'react'
import styles from './PostItem.module.scss'
import { PostService } from '../../../../service/post.service'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import Button from '../../../ui/button/Button'
import { UserService } from '../../../../service/user.service'

const PostItem: FC = ({ posts }: any) => {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery(['only user'], () =>
		UserService.getUser()
	)

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
			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<div className={styles.wrapper}>
					{posts._id}

					{data.email === posts.user.email && (
						<Button callback={handleClick} text='X' style='purple' />
					)}
					<h2 className={styles.user}>{posts.user.name}</h2>
					<div className={styles.content}>{posts.message}</div>
					<p className={styles.date}>{formattedTime}</p>
				</div>
			)}
		</>
	)
}

export default PostItem
