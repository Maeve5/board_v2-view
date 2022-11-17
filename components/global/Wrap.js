import React, { useState, useCallback, useEffect } from 'react';
import router from 'next/router';
import { useRecoilValue } from 'recoil';
import userNameState from '../../atom/userName';
import { Layout, Menu, Button, Modal } from 'antd';
import useAsync from '../../hook/useAsync';
const { Header, Content } = Layout;

function Wrap({ children, isLogin, userKey }) {
	
	// 사용자 이름
	const userName = useRecoilValue(userNameState);
	// 로그인 여부
	const [login, setLogin] = useState(false);
	// 메뉴 활성화
	const [selectedKeys, setSelectedKeys] = useState('');
	// 로그인 여부, 메뉴 활성화
	useEffect(() => {
		let path = router.pathname.slice(1);
		if (isLogin) {
			setLogin(true);
			setSelectedKeys(path);
		}
	}, []);

	// 로그아웃
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [logoutState, , logout] = useAsync('/v2/auth/logout', 'post');

	useEffect(() => {
		if (logoutState === 'success') {
			setIsModalOpen(false);
			setLogin(false);
			router.push('/');
		}
	}, [logoutState]);

	return (
		<Layout>
			<Header
				style={{
					background: 'white',
					zIndex: 500,
					width: '100%',
					minWidth: 600,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
			}}>
				<div className='header-container'>
					<div className="logo">
						<p>BOARD</p>
					</div>

					<Menu
						style={{ flex: 1 }}
						theme="light"
						mode="horizontal"
						defaultSelectedKeys={['']}
						selectedKeys={selectedKeys}
						onClick={(e) => router.push(`/${e.key}`)}
						items={[
							{
								key: '',
								label: '게시판'
							},
							// 로그인 했을 때만
							login ?
								{
									key: 'mypage',
									label: '마이페이지'
								} : null,
						]}
					/>

					{/* 로그인 여부에 따라*/}
					{login ?
						<>
							<div className='name'>{userName} 님</div>
							<Button onClick={() => setIsModalOpen(true)}>로그아웃</Button>
						</>
						: <>
							<Button style={{ marginRight: '5px' }} onClick={() => router.push('/auth/login')}>로그인</Button>
							<Button onClick={() => router.push('/auth/join')}>회원가입</Button>
						</>
					}

					{/* 로그아웃 확인 모달 */}
					<Modal title='알림' open={isModalOpen} onOk={() => logout({ userKey })} onCancel={() => setIsModalOpen(false)}>
						<p>로그아웃하시겠습니까?</p>
					</Modal>
				</div>
			</Header>

			<Content style={{ background: 'white' }}>
				<div className='content-container'>
					{children}
				</div>
			</Content>

			<style jsx>{`
			.header-container { width: 1024px; display: flex; align-items: center; }
			.logo { margin-right: 40px; }
            .logo p { margin: 0; font-size: 16px; }
			.name { margin-right: 10px; }

			.content-container { width: 1024px; margin: 64px auto 0; }
			`}</style>
		</Layout>
	);
};

export default React.memo(Wrap);