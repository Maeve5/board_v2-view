import React from 'react';

function MyInfo({ userKey }) {
	return (
		<div className='tab-container'>
			MyInfo

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 100%; text-align: center; }
			`}</style>
		</div>
	)
};

export default React.memo(MyInfo);