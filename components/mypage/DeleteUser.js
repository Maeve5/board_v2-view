import React from 'react';

function DeleteUser({ userKey }) {
	return (
		<div className='tab-container'>
			DeleteUser

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 80%; }
			`}</style>
		</div>
	)
};

export default React.memo(DeleteUser);