import React from 'react';
import List from '../list/List';

function MyHistory({ userKey }) {

	return (
		<div className='tab-container'>
			<div style={{ paddingBottom: '10px' }}>
				<h2>내가 쓴 글</h2>
			</div>
			<List pageSize={10} userKey={userKey} />

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 80%; }
			`}</style>
		</div>
	)
};

export default React.memo(MyHistory);