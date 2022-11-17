import React from 'react';
import Wrap from '../../components/global/Wrap';
import { server } from '../../modules/server';

function Mypage({ init }) {
	return (
		<Wrap isLogin={init.isLogin} userKey={init.userKey}>
			mypage
		</Wrap>
	);
};

export default React.memo(Mypage);

export const getServerSideProps = async ({ req }) => {
	let init = await server(req);
	// init {
	// 	result: true,
	// 	isLogin: true,
	// 	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwidXNlcktleSI6MSwiaWQiOiJhIiwiaWF0IjoxNjY4NjE4NDE0LCJleHAiOjE2Njg3MDQ4MTQsImlzcyI6IuuwnOq4ieyekCJ9.3QRaB7z5pRHGNFXYkIXHSWK-JwAoA0CLMqUm82TaUOg',
	// 	userKey: 1
	// }

	if (init.isLogin) {
		return { props: { init }}
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