import React from 'react';
import { router } from 'next/router';
import { Layout, Menu, Button, Modal } from 'antd';
const { Header, Content } = Layout;

function Wrap({ children }) {

	// const [selectedKey, setSelectedKey] = useState(false);

	// useEffect(() => {
	// 	let path = router.pathname.slice(1);

	// }, []);

	return (
		<Layout style={{ position: 'sticky', zIndex: 98 }}>
			<Header
				style={{
					background: 'white',
					position: 'fixed',
					zIndex: 99,
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
						// selectedKeys={selectedKeys}
						onClick={(e) => router.push(`/${e.key}`)}
						items={[
							{
								key: '',
								label: '게시판'
							},
							// 로그인 했을 때만
							// login ?
							// 	{
							// 		key: 'mypage',
							// 		label: '마이페이지'
							// 	} : null,
						]}
					/>

					{/* 로그인 여부에 따라*/}
					{/* {login ?
						<>
							<div className='name'>{user ? user.name : ''} 님</div>
							<Button onClick={() => setIsModalOpen(true)}>로그아웃</Button>
						</>
						: <> */}
							<Button style={{ marginRight: '5px' }} onClick={() => router.push('/auth/login')}>로그인</Button>
							<Button onClick={() => router.push('/auth/join')}>회원가입</Button>
						{/* </>
					} */}

					{/* 로그아웃 확인 모달 */}
					{/* <Modal title='알림' open={isModalOpen} onOk={onLogout} onCancel={() => setIsModalOpen(false)}>
						<p>로그아웃하시겠습니까?</p>
					</Modal> */}
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

			.content-container { width: 1024px; margin: 64px auto 0; }
			`}</style>
		</Layout>
	);
};

export default Wrap;