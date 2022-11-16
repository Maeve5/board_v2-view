import React, { useState, useCallback } from 'react';
import router from 'next/router';
import API from '../../modules/api';
import { Input, Button, Modal } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
const { Password } = Input;

function Login() {

	// id, password state
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	// 로그인
	const onLogin = useCallback(async () => {
		try {
			await API.post(`/v2/auth/login`, {
				id: id,
				password: password
			}).then((response) => {
				console.log('response', response);
				Modal.info({
					title: '로그인',
					content: '환영합니다.',
				});
				router.push('/');
			}).catch((error) => {
				// console.log('1', error);
				Modal.warning({
					title: '로그인 오류',
					content: error.response.data.message,
				});
			})
		}
		catch (error) {
			console.log('2', error);
		}
	}, [id, password]);
	
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
				<Button onClick={onLogin}>로그인</Button>
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