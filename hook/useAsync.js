import React, { useState, useReducer, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import spinnerState from '../atom/spinner';
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

export default function useAsync(url, method, token) {

	const [state, dispatch] = useReducer(reducer, {
		state: 'done',
		data: null
	});
	const [data, setData] = useState([]);
	// spinner
	const setLoading = useSetRecoilState(spinnerState);

	const fetchData = useCallback(async (params) => {
		dispatch({ type: 'LOADING', data: data });
		setLoading(true);
		try {
			// header에 token 추가
			API.defaults.headers.common['Authorization'] = token;

			if (['get', 'delete'].includes(method)) {
				await API({
					url: url,
					method: method,
					params: params ? params : null
				}).then((response) => {
					setData(() => response.data);
					dispatch({ type: 'SUCCESS', data: response.data});
					setLoading(false);
				}).catch((error) => {
					Modal.warning({
						title: '오류',
						content: error.response.data.message
					});
					dispatch({ type: 'ERROR', data: err.response });
					setLoading(false);
				});
			}

			else if (['post', 'patch', 'put'].includes(method)) {
				await API({
					url: url,
					method: method,
					data: params ? params : null
				}).then((response) => {
					setData(() => response.data);
					dispatch({ type: 'SUCCESS', data: response.data});
					setLoading(false);
				}).catch((error) => {
					Modal.warning({
						title: '오류',
						content: error.response.data.message
					});
					dispatch({ type: 'ERROR', data: err.response });
					setLoading(false);
				});
			}
		}
		catch (err) {
			dispatch({ type: 'ERROR', data: err.response });
			setLoading(false);
		}

	}, [url, method, token]);

	return [state.state, state.data, fetchData];
};