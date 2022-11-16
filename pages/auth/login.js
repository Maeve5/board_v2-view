import React, { useEffect } from 'react';
import Wrap from '../../components/global/Wrap';
import Login from '../../components/auth/Login';
import { server } from '../../modules/server';
import { Modal } from 'antd';

function login({ errorMessage }) {

	// useEffect(() => {
	// 	if (errorMessage) {
	// 		Modal.warning({
	// 			title: '경고',
	// 			content: errorMessage
	// 		});
	// 	}
	// }, []);

	return (
		<>
			<Wrap>
				<Login />
			</Wrap>	
		</>
	);
};

export default React.memo(login);

export const getServerSideProps = async ({ req }) => {
	// console.log(req.cookies);
	let init = await server(req);
	console.log('init', init);

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