import { FC, useState } from 'react'
import styles from './Home.module.scss'
import { PostService } from '../../../service/post.service'
import { useQuery } from '@tanstack/react-query'
import PostItem from './post/PostItem'
import ReactPaginate from 'react-paginate'

const Home: FC = () => {
	const [currentPage, setCurrentPage] = useState(0)
	const [pageSize] = useState(10)

	const { data, isLoading } = useQuery(
		['posts', currentPage, pageSize],
		() => PostService.getAllPosts(currentPage, pageSize),
		{}
	)
	console.log(data)

	const handlePageChange = (selectedPage: { selected: number }) => {
		setCurrentPage(selectedPage.selected + 1)
	}

	return (
		<>
			{isLoading ? (
				<div>Загрузка...</div>
			) : (
				<div className={styles.wrapper}>
					{data.posts.map((item: any, index: number) => (
						<PostItem
							key={index}
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							posts={item}
						/>
					))}
					<ReactPaginate
						previousLabel={'Предыдущая'}
						nextLabel={'Следующая'}
						breakLabel={'...'}
						breakClassName={'break-me'}
						pageCount={data.totalPages}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={handlePageChange}
						containerClassName={'pagination'}
						activeClassName={'active'}
					/>
				</div>
			)}
		</>
	)
}

export default Home
