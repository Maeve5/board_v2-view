import React, { useEffect } from 'react';
import { server } from '../../modules/server';
import Wrap from '../../components/global/Wrap';
import Login from '../../components/auth/Login';
import { Modal } from 'antd';

function LoginPage({ errorMessage }) {

	return (
		<Wrap>
			<Login />
		</Wrap>	
	);
};

export default React.memo(LoginPage);

export const getServerSideProps = async ({ req }) => {
	let init = await server(req);

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