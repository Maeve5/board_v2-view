import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import useAsync from '../../hook/useAsync';
import Password from '../global/InputPassword';
import Button from '../global/Btn';
import { Modal } from 'antd';

function MyPassword({ userKey }) {

	const [newPassword1, setNewPassword1] = useState('');
	const [newPassword2, setNewPassword2] = useState('');

	// 비밀번호 변경 버튼 활성화
	const disabled = useMemo(() => {
		let isDisabled = false;
		if ( !newPassword1 || !newPassword2 ) {
			return !isDisabled
		}
		return isDisabled;
	}, [newPassword1, newPassword2]);

	// 비밀번호 변경 버튼
	const onChangePW = useCallback(() => {
		if ( newPassword1 !== newPassword2 ) {
			Modal.warning({ content: '새 비밀번호가 서로 일치하지 않습니다. 다시 확인해 주세요.'});
			return false;
		}
		else {
			edit({ newPassword: newPassword1 });
		}
	}, [newPassword1, newPassword2]);

	// 비밀번호 변경
	const [editState, , edit] = useAsync(`/v2/user/${userKey}`, 'patch');
	useEffect(() => {
		if (editState === 'success')  {
			Modal.success({ title: '변경되었습니다.' });
			setNewPassword1('');
			setNewPassword2('');
		}
	}, [editState]);

	// auto focus
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<div className='tab-container'>
			<Password
				title='새로운 비밀번호'
				placeholder='비밀번호를 입력해 주세요.'
				titleStyle={{ display: 'inline-block', width: '130px', textAlign: 'left' }}
				style={{ width: 196 }}
				inputRef={inputRef}
				value={newPassword1}
				onChange={(e) => setNewPassword1(e.target.value)}
			/>
			<Password
				title='새로운 비밀번호 확인'
				placeholder='비밀번호를 입력해 주세요.'
				titleStyle={{ display: 'inline-block', width: '130px', textAlign: 'left' }}
				style={{ width: 196 }}
				value={newPassword2}
				onChange={(e) => setNewPassword2(e.target.value)}
			/>

			<div className='button'>
				<Button onClick={onChangePW} disabled={disabled} value='변경하기' />
			</div>

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 80%; text-align: center; padding-top: 30px; }
			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</div>
	)
};

export default React.memo(MyPassword);