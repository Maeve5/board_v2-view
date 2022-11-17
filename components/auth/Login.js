import React, { useState, useEffect, useRef } from 'react';
import router from 'next/router';
import { useSetRecoilState } from 'recoil';
import spinnerState from '../../atom/spinner';
import useAsync from '../../hook/useAsync';
import Input from '../global/InputText';
import Button from '../global/Btn';
import { Modal } from 'antd';

function Login() {
	// spinner
	const setLoading = useSetRecoilState(spinnerState);
	// id, password
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
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
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);
	
	return (
		<>
			<div className='login'>
				<Input
					title='ID'
					type='text'
					placeholder='아이디를 입력해 주세요.'
					titleStyle={{ display: 'inline-block', width: '80px', textAlign: 'left' }}
					style={{ width: 196 }}
					inputRef={inputRef}
					value={id}
					onChange={(e) => setId(e.target.value)}
				/>
				<Input
					title='Password'
					type='password'
					placeholder='비밀번호를 입력해 주세요.'
					titleStyle={{ display: 'inline-block', width: '80px', textAlign: 'left' }}
					style={{ width: 196 }}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className='button'>
				<Button onClick={() => login({ id, password })} value='로그인' />
			</div>
			
			<style jsx>{`
			.login { margin: 0 auto; width: 100%; min-width: 600px; text-align: center; padding-top: 60px; }
			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</>
	);
};

export default React.memo(Login);