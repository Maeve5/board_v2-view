import React, { useState, useEffect, useRef } from 'react';
import router from 'next/router';
import useAsync from '../../hook/useAsync';
import Input from '../global/InputText';
import Password from '../global/InputPassword';
import Button from '../global/Btn';
import { Modal } from 'antd';

function Join() {

	// name, id, password
	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	// 회원가입
	const [joinState, , join] = useAsync(`/v2/user/join`, 'post');
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
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<div className='join'>
			<Input
				title='이름'
				type='text'
				placeholder='이름을 입력해 주세요.'
				titleStyle={{ display: 'inline-block', width: '80px', textAlign: 'left' }}
				style={{ width: 196 }}
				inputRef={inputRef}
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				title='ID'
				type='text'
				placeholder='아이디를 입력해 주세요.'
				titleStyle={{ display: 'inline-block', width: '80px', textAlign: 'left' }}
				style={{ width: 196 }}
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
			<div className='button'>
				<Button onClick={() => join({ name, id, password })} value='가입하기' />
			</div>

			<style jsx>{`
			.join { margin: 0 auto; width: 100%; min-width: 600px; text-align: center; padding-top: 60px; }
			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</div>
	);
};

export default React.memo(Join);