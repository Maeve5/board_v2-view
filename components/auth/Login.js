import React, { useState, useEffect, useRef } from 'react';
import router from 'next/router';
import useAsync from '../../hook/useAsync';
import { Input, Button, Modal } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import spinnerState from '../../atom/spinner';
const { Password } = Input;

function Login() {

	// id, password
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	// spinner
	const setLoading = useSetRecoilState(spinnerState);
	// 로그인
	const [loginState, , login] = useAsync('/v2/auth/login', 'post');

	useEffect(() => {
		setLoading(true);
		if (loginState === 'success') {
			Modal.info({
				title: '로그인',
				content: '환영합니다.',
			});
			router.push('/');
		}		
		if (loginState === 'loading') {
			setLoading(true);
		}
		else {
			setLoading(false);
		}
	}, [loginState, setLoading]);

	// auto focus
	const idInput = useRef();
	useEffect(() => {
		idInput.current.focus();
	}, []);
	
	return (
		<>
			<div className='login'>
				<div className='container'>
					<div className='title'>ID</div>
					<Input
						name='id'
						type='text'
						placeholder=''
						style={{ width: 196 }}
						ref={idInput}
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
				</div>
				<div className='container'>
					<div className='title'>Password</div>
					<Password
						name='password'
						placeholder=''
						iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						style={{ width: 196 }}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
			</div>
			<div className='button'>
				<Button onClick={() => login({ id, password })}>로그인</Button>
			</div>
			
			<style jsx>{`
			.login { margin: 0 auto; width: 100%; min-width: 600px; text-align: center; padding-top: 60px; }
			.container { margin: 10px 0; }
			.title { display: inline-block; width: 80px; text-align: left; }

			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</>
	);
};

export default React.memo(Login);