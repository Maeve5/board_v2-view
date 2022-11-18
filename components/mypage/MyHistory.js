import React from 'react';

function MyHistory({ userKey }) {
	return (
		<div className='tab-container'>
			MyHistory

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 80%; }
			`}</style>
		</div>
	)
};

export default React.memo(MyHistory);