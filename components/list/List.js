import React from 'react';

function List() {
	return (
		<>
			<div className='list-container'>
				list
			</div>

			<style jsx>{`
			.list-container { margin: 100px auto; width: 100%; min-width: 600px; }
			`}</style>
		</>
	);
};

export default List;