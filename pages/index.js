import React from 'react';
import Wrap from '../components/global/Wrap';
import List from '../components/list/List';

function Home() {
	return (
		<>
			<Wrap>
				<div>
					<List />
				</div>
			</Wrap>
		</>
	)
};

export default React.memo(Home);

export const getServerSideProps = async ({ req }) => {
	try {
		
	}
	catch (err) {
		
	}
};