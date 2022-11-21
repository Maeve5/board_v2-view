import React, { useState, useEffect, useRef, useMemo } from 'react';
import router from 'next/router';
import useAsync from '../../hook/useAsync';
import Input from '../global/InputText';
import Password from '../global/InputPassword';
import Button from '../global/Btn';
import { Modal } from 'antd';

function Login() {
	// id, password
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	// auto focus
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	// 로그인 버튼 활성화
	const disabled = useMemo(() => {
		let isDisabled = false;
		if ( !id || !password ) {
			return !isDisabled
		}
		return isDisabled;
	}, [id, password]);

	// 로그인
	const [loginState, loginRes, login] = useAsync('/v2/auth/login', 'post');
	useEffect(() => {
		if (loginState === 'success') {
			Modal.info({
				title: '로그인',
				content: '환영합니다.',
			});
			router.push('/');
		}
	}, [loginState]);

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
				<Password
					title='Password'
					placeholder='비밀번호를 입력해 주세요.'
					titleStyle={{ display: 'inline-block', width: '80px', textAlign: 'left' }}
					style={{ width: 196 }}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className='button'>
				<Button onClick={() => login({ id, password })} value='로그인' disabled={disabled} />
			</div>
			
			<style jsx>{`
			.login { margin: 0 auto; width: 100%; min-width: 600px; text-align: center; padding-top: 60px; }
			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</>
	);
};

export default React.memo(Login);