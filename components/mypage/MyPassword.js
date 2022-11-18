import React from 'react';

function MyPassword({ userKey }) {
	return (
		<div className='tab-container'>
			MyPassword

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 80%; }
			`}</style>
		</div>
	)
};

export default React.memo(MyPassword);