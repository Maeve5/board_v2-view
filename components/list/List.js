import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

function List() {

	const [postArr, setPostArr] = useState([]);
	const [pageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const fetchData = useCallback(async () => {
		await axios.get(`/v2/list`, {
			baseURL: 'http://localhost:8083',
			params: {
				pageSize: pageSize,
				firstPost: pageSize*(currentPage-1)
			}
		}).then((response) => {
			console.log('response', response);
		});
	}, []);

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className='list-container'>
				list
			</div>

			<style jsx>{`
			.list-container { margin: 0 auto; width: 100%; min-width: 600px; text-align: center; }
			`}</style>
		</>
	);
};

export default List;