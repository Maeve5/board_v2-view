import React, { useEffect } from 'react';
import { server } from '../../modules/server';
import Wrap from '../../components/global/Wrap';
import MyPageNav from "../../components/mypage/MyPageNav";
import DeleteUser from "../../components/mypage/DeleteUser";

function DeletePage({ init, resolvedUrl }) {

	return (
		<>
			<Wrap userkey={init?.userKey} isLogin={init?.isLogin} url='/mypage'>
			<div className='mypage-container'>
				<div className='nav-container'>
					<MyPageNav url={resolvedUrl} />
				</div>
				<div className='item-container'>
					<DeleteUser userKey={init.userKey} />
				</div>
			</div>
			</Wrap>

			<style jsx>{`
			.mypage-container { display: flex; margin: 0 auto; max-width: 1024px; min-width: 600px; width: 100%; }
			.nav-container { flex: 1; margin: 0 auto; max-width: 130px; width: 100%; }
			.item-container { flex: 9; margin: 0 auto; max-width: 800px; padding-top: 30px; }
			`}</style>
		</>
	)
};

export default React.memo(DeletePage);

export const getServerSideProps = async ({ req, resolvedUrl }) => {
	let init = await server(req);

	if (init.result) {
		return { props: { init, resolvedUrl }}
	}
	else {
		return {
			props: {
				errorMessage: init.errorMessage ? init.errorMessage : null
			}
		}
	}
};