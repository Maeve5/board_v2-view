import React from 'react';
import { server } from '../../modules/server';
import Wrap from '../../components/global/Wrap';
import Join from '../../components/auth/Join';

function JoinPage({ errorMessage }) {
	return (
		<Wrap>
			<Join />
		</Wrap>
	);
};

export default React.memo(JoinPage);

export const getServerSideProps = async ({ req }) => {
	let init = await server(req);

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