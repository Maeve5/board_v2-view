import React, { useState, useEffect, useRef } from 'react';
import router from 'next/router';
import useAsync from '../../hook/useAsync';
import { Button, Input, Modal } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
const { Password } = Input;

function Join() {

	// name, id, password
	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	// 회원가입
	const [joinState, , join] = useAsync(`/v2/user`, 'post');
	useEffect(() => {
		if (joinState === 'success') {
			Modal.info({
				title: '환영합니다',
				content: '가입되었습니다.'
			});
			router.push('/auth/login');
		}
	}, [joinState]);

	// auto focus
	const nameInput = useRef();
	useEffect(() => {
		nameInput.current.focus();
	}, []);

	return (
		<div className='join'>
			<div className='container'>
				<div className='title'>이름</div>
				<Input
					type='text'
					placeholder="이름을 입력해 주세요."
					style={{ width: 196 }}
					ref={nameInput}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='container'>
				<div className='title'>ID</div>
				<Input
					type='text'
					placeholder="아이디를 입력해 주세요."
					style={{ width: 196 }}
					value={id}
					onChange={(e) => setId(e.target.value)}
				/>
			</div>
			<div className='container'>
				<div className='title'>비밀번호</div>
				<Password
					placeholder="비밀번호를 입력해 주세요."
					iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					style={{ width: 196 }}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div className='button'>
				<Button onClick={() => join({ name, id, password })}>가입하기</Button>
			</div>

			<style jsx>{`
			.join { margin: 0 auto; width: 100%; min-width: 600px; text-align: center; padding-top: 60px; }
			.container { margin: 10px 0; }
			.title { display: inline-block; width: 80px; text-align: left; }

			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</div>
	);
};

export default React.memo(Join);