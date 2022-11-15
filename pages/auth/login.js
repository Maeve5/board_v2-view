import React from 'react';
import Wrap from '../../components/global/Wrap';
import Login from '../../components/auth/Login';

function login() {
	return (
		<>
			<Wrap>
				<Login />
			</Wrap>	
		</>
	);
};

export default React.memo(login);