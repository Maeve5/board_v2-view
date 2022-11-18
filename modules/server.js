import API from './api';

export const server = async (req) => {
	let data = { result: false };
	const token = req.cookies.board_cookie ? req.cookies.board_cookie : null;

	try {
		// header에 token 추가
		API.defaults.headers.common['Authorization'] = token;
		await API.post(`/v2/auth/token`)
		.then((response) => {
			console.log('response', response);
			data = { result: true, ...response.data };
		}).catch((error) => {
			console.log('error', error);
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
};