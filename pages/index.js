import React, { useEffect } from 'react';
import Wrap from '../components/global/Wrap';
import List from '../components/list/List';
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

	return (
		<>
			<Wrap init={init}>
				<div>
					<List />
				</div>
			</Wrap>
		</>
	)
};

export default React.memo(Home);

export const getServerSideProps = async ({ req }) => {
	// console.log(req.cookies);
	let init = await server(req);
	// console.log('init', init);
	// init = { result, token, userKey }

	if (init.result) {
		return { props: { init }}
	}
	else {
		return {
			props: {
				errorMessage: init.errorMessage
			}
		}
	}
};