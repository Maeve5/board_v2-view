import axios from 'axios';

export const server = async (req) => {
	let data = { result: false };

	const token = req.cookies.board_cookie ? req.cookies.board_cookie : null;

	try {
		await axios.post(
			`/v2/auth/token`,
			null,
			{
			baseURL: 'http://localhost:8083',
			headers: {
				'Authorization': token ? token : '',
				'Accept': 'Application/json',
				'Content-Type': 'Application/json',
			},
			withCredentials: true,
		}).then((response) => {
			// console.log(response.data);
			data = { result: true, ...response.data };
		}).catch((error) => {
			console.log('11', error);
			data = {
				result: false,
				errorMessage: error.response.data?.message
			}
			throw new Error(error.response.data?.message);
		})

		return data;
	}
	catch (error) {
		console.log('12', error);
		// error 11을 거쳐서 고대로 12로 에러메세지가 전달됨.
		// return data = { result: false, errorMessage: error.response.data?.message }
		return data;
	}
}