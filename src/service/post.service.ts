import axios from 'axios'

export const PostService = {
	async createPost(data: { message: string }) {
		try {
			const token = localStorage.getItem('token')
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			return axios.post(`http://localhost:4200/api/posts/posts`, data, config)
		} catch (err) {
			console.log(err)
			throw err
		}
	},
	async uploadFile(data: { media: string }) {
		try {
			const token = localStorage.getItem('token')
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			return axios.post(`http://localhost:4200/api/uploads`, data, config)
		} catch (err) {
			console.log(err)
			throw err
		}
	},
	async deletePost(data: { _id: string }) {
		try {
			const token = localStorage.getItem('token')
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: {
					_id: data,
				},
			}
			return axios.delete(`http://localhost:4200/api/posts/posts`, config)
		} catch (err) {
			console.log(err)
			throw err
		}
	},
	async getAllPosts(page: number, pageSize: number) {
		try {
			const response = await axios.get(
				`http://localhost:4200/api/posts/posts?page=${page}&pageSize=${pageSize}`
			)
			return response.data
		} catch (err) {
			console.log(err)
		}
	},
}
