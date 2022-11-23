import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import router from 'next/router';
import { server } from '../../modules/server';
import { useSetRecoilState } from 'recoil';
import spinnerState from '../../atom/spinner';
import useAsync from '../../hook/useAsync';
import Wrap from '../../components/global/Wrap';
import Input from '../../components/global/InputText';
import TextArea from '../../components/global/InputTextArea';
import Button from '../../components/global/Btn';
import { Modal } from 'antd';

function PostPage({ init, listKey }) {

	// 제목, 작성자, 내용
	const [title, setTitle] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	// spinner
	const setLoading = useSetRecoilState(spinnerState);

	// 게시글 조회
	const [getPostState, getPostRes, getPost] = useAsync(`/v2/list/${listKey}`, 'get');

	useEffect(() => {
		setLoading(true);
		if (getPostState === 'done') {
			getPost();
		}
		if (getPostState === 'success') {
			setTitle(() => getPostRes.title);
			setName(() => getPostRes.name);
			setDescription(() => getPostRes.description);
			setLoading(false);
		}
		if (getPostState === 'error') {
			router.push('/404');
		}
	}, [getPostState, getPostRes]);

	// 수정 여부
	const [isEdit, setIsEdit] = useState(false);

	// 게시글 수정
	const [updateState, , update] = useAsync(`/v2/list/${listKey}`, 'patch');

	// 수정 버튼 활성화
	const disabled = useMemo(() => {
		let isDisabled = false;
		if (!title || !description) {
			return !isDisabled
		}
		return isDisabled;
	}, [title, description]);

	// 수정하기
	const onChangeEdit = useCallback(() => {
		if (isEdit) {
			update({ title, description });
		}
		else {
			setIsEdit(true);
		}
	}, [isEdit, update, title, description]);

	useEffect(() => {
		setLoading(true);
		if (updateState === 'success') {
			setIsEdit(false);
			getPost();
			setLoading(false);
		}
		else {
			setLoading(false);
		}
	}, [updateState]);

	// 삭제 확인 모달
	const [isModalOpen, setIsModalOpen] = useState(false);

	// 게시글 삭제
	const [removeState, , remove] = useAsync(`/v2/list/${listKey}`, 'delete');
	useEffect(() => {
		if (removeState === 'success') {
			Modal.success({ title: '삭제완료' });
			router.replace('/');
		}
	}, [removeState]);

	return (
		<Wrap isLogin={init.isLogin} userKey={init.userKey} name={init?.userName}>
			<div className='container'>
				<Input
					title='제목'
					type='text'
					placeholder='제목을 입력해 주세요.'
					containerStyle={isEdit ? {} : { borderTop: '1px solid #aaa', borderBottom: '1px solid #aaa' }}
					titleStyle={{ flex: 1, textAlign: 'center' }}
					inputStyle={{ flex: 8 }}
					style={{ display: 'block' }}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					readOnly={isEdit ? false : true}
					bordered={isEdit}
				/>
				{isEdit ?
					<></> :
					<Input
						title='작성자'
						type='text'
						containerStyle={{ borderTop: '1px solid #aaa', borderBottom: '1px solid #aaa' }}
						titleStyle={{ flex: 1, textAlign: 'center' }}
						inputStyle={{ flex: 8 }}
						style={{ display: 'block' }}
						value={name}
						readOnly={true}
						bordered={false}
					/>
				}
				<TextArea
					title='내용'
					placeholder='내용을 입력해 주세요.'
					containerStyle={isEdit ? {} : { borderTop: '1px solid #aaa', borderBottom: '1px solid #aaa' }}
					titleStyle={{ flex: 1, textAlign: 'center' }}
					inputStyle={{ flex: 8 }}
					style={{ minHeight: 285, resize: 'none' }}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					readOnly={isEdit ? false : true}
					bordered={isEdit}
				/>
			</div>

			<div className='button'>
				<Button value='목록으로' type='primary' onClick={() => router.back()} style={{ margin: '0 5px' }} />
				{getPostRes?.userKey === init?.userKey ?
					<>
						<Button value='수정하기' onClick={onChangeEdit} disabled={disabled} />
						{isEdit ? <></> : <Button value='삭제하기' onClick={() => setIsModalOpen(true)} style={{ margin: '0 5px' }} />}
					</>
					: <></>}
			</div>

			{/* 삭제 확인 모달 */}
			<Modal title='알림' open={isModalOpen} onOk={() => remove()} onCancel={() => setIsModalOpen(false)}>
				<p>삭제하시겠습니까?</p>
			</Modal>

			<style jsx>{`
			.container { margin: 100px auto 0; max-width: 800px; min-width: 600px; width: 80%; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</Wrap>
	);
};

export default React.memo(PostPage);

export const getServerSideProps = async ({ req, params }) => {
	let init = await server(req);
	let listKey = params.listKey;

	if (init.isLogin) {
		return { props: { init, listKey } }
	}
	else {
		return {
			redirect: {
				permanent: false,
				destination: '/auth/login',
				errorMessage: init.errorMessage ? init.errorMessage : null
			}
		}
	}
};