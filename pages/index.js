import React from 'react';
import router from 'next/router';
import Wrap from '../components/global/Wrap';
import Button from '../components/global/Btn';
import List from '../components/list/List';
import { server } from '../modules/server';

function Home({ init, resolvedUrl }) {

	return (
		<Wrap path={resolvedUrl} isLogin={init?.isLogin} userKey={init?.userKey} name={init?.userName}>
			<div className='list-container'>
				<div className='button'>
					<Button value='글쓰기' onClick={() => router.push('/list/insert')} />
				</div>
				<List pageSize={10} />
			</div>

			<style jsx>{`
			.list-container { margin: 0 auto; max-width: 800px; min-width: 600px; width: 80%; }
			.button { float: right; margin: 0 20px 10px 0; }
			`}</style>
		</Wrap>
	)
};

export default React.memo(Home);

export const getServerSideProps = async ({ req, resolvedUrl }) => {

	let init = await server(req, resolvedUrl);
	// init {
	// 	result: true,
	// 	isLogin: true,
	// 	token: '',
	// 	userKey: init,
	//  userName: ''
	// }

	if (init.result) {
		return { props: { init, resolvedUrl } }
	}
	else {
		return {
			redirect: {
				permanent: false,
				destination: '/auth/login',
				errorMessage: init.errorMessage ? init.errorMessage : null
			}
		}
	}
};