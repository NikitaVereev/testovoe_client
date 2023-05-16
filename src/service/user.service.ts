import axios, { AxiosResponse } from 'axios'

interface LoginData {
	email: string
	password: string
}

interface RegistrationData extends LoginData {
	name: string
}

interface TokenResponse {
	token: string
}

export const UserService = {
	async loginUser(data: LoginData): Promise<AxiosResponse<TokenResponse>> {
		try {
			return axios.post<TokenResponse>(
				`http://localhost:4200/api/users/login`,
				data
			)
		} catch (err) {
			console.log(err)
			throw err
		}
	},

	async regUser(data: RegistrationData): Promise<AxiosResponse<TokenResponse>> {
		try {
			return axios.post<TokenResponse>(`http://localhost:4200/api/users`, data)
		} catch (err) {
			console.log(err)
			throw err
		}
	},
	async getUser() {
		try {
			const token = localStorage.getItem('token')
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			const response = await axios.get(
				`http://localhost:4200/api/users/profile`,
				config
			)
			return response.data // Возвращает данные из ответа сервера
		} catch (err) {
			console.log(err)
			throw err // Выбрасывает ошибку, чтобы обработать ее выше
		}
	},
}
