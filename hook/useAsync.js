import React, { useCallback } from 'react';

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

export default function useAsync(initialForm) {

	const [state, dispatch] = useReducer(reducer, initialForm);

	const fetchData = useCallback(() => {

		dispatch({ type: 'LOADING' });

		try {

		}
		catch (err) {
			dispatch({ type: 'ERROR' });
		}

	}, []);

	return [state, fetchData];
};