import React, { useState, useEffect } from 'react';
import { router } from 'next/router';
import { useRecoilState } from 'recoil';
import userNameState from '../../atom/userName';
import useAsync from '../../hook/useAsync';
import Button from './Btn';
import { Layout, Menu, Modal } from 'antd';
const { Header, Content } = Layout;

function Wrap({ children, url, isLogin, userKey, name }) {

	// 메뉴 활성화
	const path = url?.slice(1);
	// 사용자 이름
	const [userName, setUserName] = useRecoilState(userNameState);
	
	// 로그인 여부, 이름 가져오기
	useEffect(() => {
		if (isLogin) {
			setUserName(name);
		}
	}, [isLogin, name, setUserName]);

	// 로그아웃
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [logoutState, , logout] = useAsync('/v2/auth/logout', 'post');

	useEffect(() => {
		if (logoutState === 'success') {
			Modal.success({ title: '로그아웃되었습니다.' });
			setIsModalOpen(false);
			router.replace('/');
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
						defaultSelectedKeys={[path ? path : '']}
						onClick={(e) => router.push(`/${e.key}`)}
						items={[
							{
								key: '',
								label: '게시판'
							},
							// 로그인 했을 때만
							isLogin ?
								{
									key: 'mypage',
									label: '마이페이지'
								} : null,
						]}
					/>

					{/* 로그인 여부에 따라*/}
					{isLogin ?
						<>
							<div className='name'>{userName} 님</div>
							<Button onClick={() => setIsModalOpen(true)} value='로그아웃' />
						</>
						: <>
							<Button type='primary' style={{ marginRight: '5px' }} onClick={() => router.push('/auth/login')} value='로그인' />
							<Button onClick={() => router.push('/auth/join')} value='회원가입' />
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

			.content-container { width: 1024px; margin: 30px auto 0; }
			`}</style>
		</Layout>
	);
};

export default React.memo(Wrap);