import React, { useEffect } from 'react';
import router from 'next/router';
import Wrap from '../components/global/Wrap';
import Button from '../components/global/Btn';
import List from '../components/list/List';
import useAsync from '../hook/useAsync';
import { server } from '../modules/server';
import { Modal } from 'antd';

function Home({ init, errorMessage }) {
	useEffect(() => {
		if (errorMessage) {
			Modal.warning({
				title: '경고',
				content: errorMessage
			});
		}
	}, []);

	// 게시글 목록 조회
	const [postState, postRes, fetchData] = useAsync('/v2/list', 'get');

	return (
		<Wrap isLogin={init.isLogin} userKey={init.userKey}>
			<div className='list-container'>
				<div className='button'>
					<Button value='글쓰기' onClick={() => router.push('/list/insert')} />
				</div>
				<List state={postState} res={postRes} fetchData={fetchData} pageSize={10} />
			</div>

			<style jsx>{`
			.list-container { margin: 0 auto; max-width: 800px; min-width: 600px; width: 80%; }
			.button { float: right; margin: 0 20px 10px 0; }
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