import React from 'react';
import Wrap from '../../components/global/Wrap';
import AddPost from '../../components/list/AddPost';
import { server } from '../../modules/server';

function InsertPage({ init }) {
	return (
		<Wrap isLogin={init.isLogin} userKey={init.userKey}>
			<AddPost />
		</Wrap>
	);
};

export default React.memo(InsertPage);

export const getServerSideProps = async ({ req }) => {
	let init = await server(req);

	if (init.isLogin) {
		return { props: { init } }
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