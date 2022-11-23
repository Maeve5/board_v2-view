import API from './api';

export const server = async (req) => {
	let data = { result: false };
	let accToken = req.cookies.board_accCookie ? req.cookies.board_accCookie : null;
	let refToken = req.cookies.board_refCookie ? req.cookies.board_refCookie : null;

	try {
		// header에 access token 추가
		API.defaults.headers.common['Authorization'] = accToken;
		await API.post(`/v2/auth/token`, {refToken: refToken})
		.then((response) => {
			data = { result: true, ...response.data };
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