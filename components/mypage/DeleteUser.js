import React, { useState, useEffect, useRef } from 'react';
import useAsync from '../../hook/useAsync';
import Password from '../global/InputPassword';
import Button from '../global/Btn';

function DeleteUser({ userKey }) {

	// 비밀번호
	const [password, setPassword] = useState('');
	// 탈퇴하기
	const [deleteState, , onDelete] = useAsync(`/v2/user/${userKey}`, 'delete');

	// auto focus
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<div className='tab-container'>
			<Password
				title='Password'
				placeholder='비밀번호를 입력해 주세요.'
				titleStyle={{ display: 'inline-block', width: '80px', textAlign: 'left' }}
				style={{ width: 196 }}
				inputRef={inputRef}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<div className='button'>
				<Button onClick={() => onDelete({ password })} value='확인' />
			</div>

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 80%; text-align: center; padding-top: 30px; }
			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</div>
	)
};

export default React.memo(DeleteUser);