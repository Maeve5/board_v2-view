import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import router from 'next/router';
import Wrap from '../components/global/Wrap';
import List from '../components/list/List';
import userNameState from '../atom/userName';
import useAsync from '../hook/useAsync';
import { server } from '../modules/server';
import { Modal, Button, Pagination } from 'antd';

function Home({ init, errorMessage }) {

	// 사용자 이름 조회
	const [nameState, nameRes, name] = useAsync(`/v2/user/${init.userKey}`, 'get');
	// 사용자 이름 atom
	const setUserName = useSetRecoilState(userNameState);

	useEffect(() => {
		name({ userName: init.userKey });

		if (errorMessage) {
			Modal.warning({
				title: '경고',
				content: errorMessage
			});
		}
	}, []);

	useEffect(() => {
		if (nameState === 'success') {
			setUserName(() => nameRes.name);
		}
	}, [nameState]);

	// 페이지네이션
	const [postArr, setPostArr] = useState([]);
	const [pageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [postState, postRes, fetchData] = useAsync('/v2/list', 'get');

	useEffect(() => {
		fetchData({	pageSize, currentPage });
	}, [currentPage]);

	useEffect(() => {
		if (postState === 'success') {
			setPostArr(() => postRes.list);
		}
	}, [postState]);

	return (
		<Wrap isLogin={init.isLogin} userKey={init.userKey}>
			<div className='list-container'>
				<div className='button'>
					<Button onClick={() => router.push('/list/insert')}>글쓰기</Button>
				</div>
				<div className='list'>
					<List postArr={postArr} />
				</div>
				<div className='pagination'>
					<Pagination onChange={(e) => setCurrentPage(e)} defaultCurrent={currentPage} current={currentPage} pageSize={pageSize} total={postRes ? postRes.length : 0} />
				</div>
			</div>

			<style jsx>{`
			.list-container { margin: 0 auto; max-width: 800px; min-width: 600px; width: 80%; }
			.button { float: right; margin: 0 20px 10px 0; }
			.list { display: block; margin: 0 auto; width: 100%; min-width: 600px; text-align: center; }
			.pagination { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</Wrap>
	)
};

export default React.memo(Home);

export const getServerSideProps = async ({ req }) => {
	// console.log(req.cookies);
	let init = await server(req);
	// init {
	// 	result: true,
	// 	isLogin: true,
	// 	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwidXNlcktleSI6MSwiaWQiOiJhIiwiaWF0IjoxNjY4NjE4NDE0LCJleHAiOjE2Njg3MDQ4MTQsImlzcyI6IuuwnOq4ieyekCJ9.3QRaB7z5pRHGNFXYkIXHSWK-JwAoA0CLMqUm82TaUOg',
	// 	userKey: 1
	// }

	if (init.result) {
		return { props: { init }}
	}
	else {
		return {
			props: {
				errorMessage: init.errorMessage ? init.errorMessage : null
			}
		}
	}
};