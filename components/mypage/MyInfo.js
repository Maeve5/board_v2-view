import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import userNameState from '../../atom/userName';
import spinnerState from '../../atom/spinner';
import useAsync from '../../hook/useAsync';
import Input from '../global/InputText';
import Button from '../global/Btn';
import { Modal } from 'antd';

function MyInfo({ userKey }) {

	// 회원 정보 조회
	const [userState, userRes, getUser] = useAsync(`/v2/user/${userKey}`, 'get');
	// spinner
	const setLoading = useSetRecoilState(spinnerState);

	// id, name
	const [id, setId] = useState('');
	const [name, setName] = useState('')
	const setUserName = useSetRecoilState(userNameState);

	// 이름 변경 버튼 활성화
	const disabled = useMemo(() => {
		let isDisabled = false;
		if ( !name || JSON.parse(localStorage.getItem('data')).name === name ) {
			return !isDisabled
		}
		return isDisabled;
	}, [name]);

	// 이름 변경
	const [editState, , edit] = useAsync(`/v2/user/${userKey}`, 'patch');
	useEffect(() => {
		if (userState === 'done') {
			getUser();
			setLoading(true);
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

	useEffect(() => {
		if (editState === 'success') {
			setUserName(name);
			let data = JSON.parse(localStorage.getItem('data'));
			data = { ...data, name: name };
			localStorage.setItem('data', JSON.stringify(data));
			Modal.success({ title : '수정되었습니다.' });
		}
	}, [editState]);

	// auto focus
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

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