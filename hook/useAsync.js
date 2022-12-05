import React, { useState, useReducer, useCallback } from 'react';
import API from '../modules/api';
import { Modal } from 'antd';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				state: 'loading',
				data: action.data
			};
		case 'SUCCESS':
			return {
				state: 'success',
				data: action.data
			};
		case 'ERROR':
			return {
				state: 'error',
				data: action.data
			};
		default:
			return {
				state: 'default',
				data: null
			};
	}
};

export default function useAsync(url, method) {

	const [state, dispatch] = useReducer(reducer, {
		state: 'done',
		data: null
	});
	const [data, setData] = useState([]);

	const fetchData = useCallback(async (params) => {
		dispatch({ type: 'LOADING', data: data });
		try {
			// method가 get, delete일 때
			if (['get', 'delete'].includes(method)) {
				await API({
					url: url,
					method: method,
					params: params ? params : null
				}).then((response) => {
					setData(() => response.data);
					dispatch({ type: 'SUCCESS', data: response.data});
				}).catch((error) => {
					Modal.warning({
						title: '오류',
						content: error.response.data.message
					});
					dispatch({ type: 'ERROR', data: err.response });
				});
			}
			// method가 post, patch, put일 때
			else if (['post', 'patch', 'put'].includes(method)) {
				await API({
					url: url,
					method: method,
					data: params ? params : null
				}).then((response) => {
					setData(() => response.data);
					dispatch({ type: 'SUCCESS', data: response.data});
				}).catch((error) => {
					Modal.warning({
						title: '오류',
						content: error.response.data.message
					});
					dispatch({ type: 'ERROR', data: err.response });
				});
			}
			else if (method === 'formData') {
				console.log(req);
			}
		}
		catch (err) {
			dispatch({ type: 'ERROR', data: err.response });
		}

	}, [url, method]);

	return [state.state, state.data, fetchData];
};