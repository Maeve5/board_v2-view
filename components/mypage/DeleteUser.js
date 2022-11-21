import React, { useState, useEffect, useRef, useMemo } from 'react';
import router from 'next/router';
import useAsync from '../../hook/useAsync';
import Password from '../global/InputPassword';
import Button from '../global/Btn';
import { Modal } from 'antd';

function DeleteUser({ userKey }) {

	// 비밀번호
	const [password, setPassword] = useState('');

	// auto focus
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	// 탈퇴 버튼 활성화
	const disabled = useMemo(() => {
		let isDisabled = false;
		if ( !password ) {
			return !isDisabled
		}
		return isDisabled;
	}, [password]);

	// 탈퇴 확인 모달
	const [isModalOpen, setIsModalOpen] = useState(false);

	// 탈퇴하기
	const [deleteState, , onDelete] = useAsync(`/v2/user/${userKey}`, 'delete');
	useEffect(() => {
		if (deleteState === 'success') {
			Modal.success({ title: '탈퇴 완료 '});
			router.replace('/');
		}
	}, [deleteState]);

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
				<Button onClick={() => setIsModalOpen(true)} value='탈퇴하기' disabled={disabled} />
			</div>

			{/* 탈퇴 확인 모달 */}
			<Modal title='알림' open={isModalOpen} onOk={() => onDelete({ password })} onCancel={() => setIsModalOpen(false)}>
				<p>정말로 탈퇴하시겠습니까?</p>
				<p>탈퇴 후 작성한 게시글이 모두 삭제됩니다.</p>
			</Modal>

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 80%; text-align: center; padding-top: 30px; }
			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</div>
	)
};

export default React.memo(DeleteUser);