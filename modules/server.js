import API from './api';

export const server = async (req) => {
	let data = { result: false };
	const token = req.cookies.board_accCookie ? req.cookies.board_accCookie : null;

	try {
		// header에 access token 추가
		API.defaults.headers.common['Authorization'] = token;
		await API.post(`/v2/auth/token`)
		.then((response) => {
			data = { result: true, ...response.data };
			console.log(response.data);
		}).catch(async (error) => {
			console.log('acc', error.response.data);
			throw new Error(error.response.data?.message);
		})
		return data;
	}
	catch (error) {
		console.log('12', error);
		// data = { result: false, errorMessage: error.response.data?.message };
		return data;
	}
};