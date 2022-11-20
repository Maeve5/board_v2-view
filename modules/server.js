import API from './api';

export const server = async (req) => {
	let data = { result: false };
	const token = req.cookies.board_cookie ? req.cookies.board_cookie : null;

	try {
		// header에 token 추가
		API.defaults.headers.common['Authorization'] = token;
		await API.post(`/v2/auth/token`)
		.then((response) => {
			data = { result: true, ...response.data };
		}).catch((error) => {
			throw new Error(error.response.data?.message);
		})
		return data;
	}
	catch (error) {
		console.log('12', error);
		data = { result: false, errorMessage: error.response.data?.message }
		return data;
	}
};