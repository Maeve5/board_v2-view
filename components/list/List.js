import React from 'react';

function List() {
	return (
		<>
			<div className='list-container'>
				list
			</div>

			<style jsx>{`
			.list-container { margin: 0 auto; width: 100%; min-width: 600px; text-align: center; }
			`}</style>
		</>
	);
};

export default List;