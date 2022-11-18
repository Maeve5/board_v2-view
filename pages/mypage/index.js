import React, { useState, useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import spinnerState from '../../atom/spinner';
import Wrap from '../../components/global/Wrap';
import MyInfo from '../../components/mypage/MyInfo';
import MyPassword from '../../components/mypage/MyPassword';
import MyHistory from '../../components/mypage/MyHistory';
import DeleteUser from '../../components/mypage/DeleteUser';
import { server } from '../../modules/server';
import { Tabs, Modal } from 'antd';

function Mypage({ init, resolvedUrl, errorMessage }) {

	// spinner
	const setLoading = useSetRecoilState(spinnerState);
	// 최근 탭
	const [currentKey, setCurrentKey] = useState('');

	const onSaveKey = useCallback((e) => {
		let data = JSON.parse(localStorage.getItem('data'));
		data = { ...data, tabKey: e };
		localStorage.setItem('data', JSON.stringify(data));
	}, []);

	
	useEffect(() => {
		if (errorMessage) {
			Modal.warning({
				title: '경고',
				content: errorMessage
			});
		}
	}, []);

	// 탭 아이템
	const items = [
		{
			label: '내 정보',
			key: 'myinfo',
			children: <MyInfo userKey={init.userKey} />
		},
		{
			label: '비밀번호 변경',
			key: 'password',
			children: <MyPassword userKey={init.userKey} />
		},
		{
			label: '내가 쓴 글',
			key: 'history',
			children: <MyHistory userKey={init.userKey} />
		},
		{
			label: '탈퇴하기',
			key: 'delete',
			children: <DeleteUser userKey={init.userKey} />
		}
	];

	return (
		<Wrap url={resolvedUrl} isLogin={init.isLogin} userKey={init.userKey}>
			<div className='mypage-container'>
				<Tabs
					tabPosition='left'
					defaultActiveKey={[currentKey]}
					onTabClick={(e) => onSaveKey(e)}
					items={items} />
			</div>

			<style jsx>{`
			.mypage-container { margin: 0 auto; max-width: 923.46px; min-width: 600px; width: 100%; }
			`}</style>
		</Wrap>
	);
};

export default React.memo(Mypage);

export const getServerSideProps = async ({ req, resolvedUrl }) => {
	let init = await server(req);
	// init {
	// 	result: true,
	// 	isLogin: true,
	// 	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwidXNlcktleSI6MSwiaWQiOiJhIiwiaWF0IjoxNjY4NjE4NDE0LCJleHAiOjE2Njg3MDQ4MTQsImlzcyI6IuuwnOq4ieyekCJ9.3QRaB7z5pRHGNFXYkIXHSWK-JwAoA0CLMqUm82TaUOg',
	// 	userKey: 1
	// }

	if (init.isLogin) {
		return { props: { init, resolvedUrl }}
	}
	else {
		return {
			redirect: {
				permanent: false,
				destination: '/auth/login',
				errorMessage: init.errorMessage ? init.errorMessage : null
			}
		}
	}
};