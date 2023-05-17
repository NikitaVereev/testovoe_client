import { FC, useState } from 'react'
import styles from './Home.module.scss'
import { PostService } from '../../../service/post.service'
import { useQuery } from '@tanstack/react-query'
import PostItem from './post/PostItem'
import ReactPaginate from 'react-paginate'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'

const Home: FC = () => {
	const [currentPage, setCurrentPage] = useState(0)
	const [pageSize] = useState(20)

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
				<div className='wrapper'>
					<div className={styles.wrapper}>
						{data.posts.map((item: any, index: number) => (
							<PostItem
								key={index}
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-ignore
								posts={item}
							/>
						))}
					</div>
					<div>
						<ReactPaginate
							previousLabel={
								<IconContext.Provider
									value={{ color: '#B8C1CC', size: '36px' }}
								>
									<AiFillLeftCircle />
								</IconContext.Provider>
							}
							nextLabel={
								<IconContext.Provider
									value={{ color: '#B8C1CC', size: '36px' }}
								>
									<AiFillRightCircle />
								</IconContext.Provider>
							}
							containerClassName={'pagination'}
							pageClassName={'page-item'}
							activeClassName={'active'}
							breakLabel={'...'}
							breakClassName={'break-me'}
							pageCount={data.totalPages}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default Home
