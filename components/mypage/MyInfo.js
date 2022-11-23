import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import userNameState from '../../atom/userName';
import spinnerState from '../../atom/spinner';
import useAsync from '../../hook/useAsync';
import Input from '../global/InputText';
import Button from '../global/Btn';
import { Modal } from 'antd';

function MyInfo({ userKey }) {

	// id, name
	const [id, setId] = useState('');
	const [name, setName] = useState('')
	const [userName, setUserName] = useRecoilState(userNameState);

	// spinner
	const setLoading = useSetRecoilState(spinnerState);

	// 회원 정보 조회
	const [userState, userRes, getUser] = useAsync(`/v2/user/${userKey}`, 'get');
	useEffect(() => {
		setLoading(true);
		if (userState === 'done') {
			getUser();
		}
		if (userState === 'success') {
			setId(userRes.id);
			setName(userRes.name);
			setLoading(false);
		}
		else {
			setLoading(false);
		}
	}, [userState]);

	// auto focus
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	// 이름 변경 버튼 활성화
	const disabled = useMemo(() => {
		let isDisabled = false;
		if ( !name || name === userName ) {
			return !isDisabled
		}
		return isDisabled;
	}, [name, userName]);

	// 이름 변경
	const [editState, , edit] = useAsync(`/v2/user/${userKey}`, 'patch');
	useEffect(() => {
		if (editState === 'success') {
			setUserName(name);
			Modal.success({ title : '수정되었습니다.' });
		}
	}, [editState]);

	return (
		<div className='tab-container'>
			<Input
				title='ID'
				type='text'
				titleStyle={{ display: 'inline-block', width: '80px', textAlign: 'left' }}
				style={{ width: 196 }}
				value={id}
				readOnly={true}
				bordered={false}
			/>
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

			<div className='button'>
				<Button onClick={() => edit({ name })} disabled={disabled} value='수정하기' />
			</div>

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 80%; text-align: center; padding-top: 30px; }
			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</div>
	)
};

export default React.memo(MyInfo);