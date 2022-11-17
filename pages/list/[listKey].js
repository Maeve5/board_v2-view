import React, { useEffect, useState, useCallback, useRef } from 'react';
import router from 'next/router';
import { useSetRecoilState } from 'recoil';
import spinnerState from '../../atom/spinner';
import Wrap from '../../components/global/Wrap';
import InputText from '../../components/global/InputText';
import Button from '../../components/global/Btn';
import { server } from '../../modules/server';
import useAsync from '../../hook/useAsync';
import { Modal } from 'antd';

function PostPage({ init, listKey }) {
	// spinner
	const setLoading = useSetRecoilState(spinnerState);
	// 게시글 조회
	const [getPostState, getPostRes, getPost] = useAsync(`/v2/list/${listKey}`, 'get');
	
	useEffect(() => {
		getPost();
	}, []);
	
	// 제목, 작성자, 내용
	const [title, setTitle] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	// 수정 여부
	const [edit, setEdit] = useState(false);
	
	useEffect(() => {
		setLoading(true);
		if (getPostState === 'success') {
			setTitle(() => getPostRes.title);
			setName(() => getPostRes.name);
			setDescription(() => getPostRes.description);
			setLoading(false);
		}
		if (getPostState === 'loading') {
			setLoading(true);
		}
		if (getPostState === 'error') {
			router.push('/404');
		}
		else {
			setLoading(false);
		}
	}, [getPostState]);

	// 게시글 수정
	const [updateState, , update] = useAsync(`/v2/list/${listKey}`, 'patch');

	const onChangeEdit = useCallback(() => {
		if (edit) {
			update({ title, description });
		}
		else {
			setEdit(true);
		}
	}, [title, description, setEdit]);

	useEffect(() => {
		setLoading(true);
		if (updateState === 'success') {
			setEdit(false);
			setLoading(false);
		}
	}, [updateState]);

	// 게시글 삭제
	const [removeState, , remove] = useAsync(`/v2/list/${listKey}`, 'delete');
	// 삭제 확인 모달
	const [isModalOpen, setIsModalOpen] = useState(false);
	const onDelete = useCallback(() => {
		remove();
	}, []);
	useEffect(() => {
		setLoading(true);
		if (removeState === 'success') {
			Modal.info({ title: '삭제완료' });
			router.push('/');
		}
	}, [removeState]);

	return (
		<Wrap isLogin={init.isLogin} userKey={init.userKey}>
			<div className='container'>
				<InputText
					title='제목'
					type='text'
					placeholder='제목을 입력하세요.'
					style={{ display: 'block' }}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					readOnly={edit ? false : true}
					bordered={edit ? true : false}
				/>
				{edit ?
					<></> :
					<InputText
						title='작성자'
						type='text'
						style={{ display: 'block' }}
						value={name}
						readOnly={true}
						bordered={false}
					/>
				}
				<InputText
					title='내용'
					type='textarea'
					placeholder='내용을 입력하세요.'
					style={{ minHeight: 285, resize: 'none' }}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					readOnly={edit ? false : true}
					bordered={edit ? true : false}
				/>
			</div>

			<div className='button'>
				<Button value='수정하기' onClick={onChangeEdit} />
				{ edit ? <></> : <Button value='삭제하기' onClick={() => setIsModalOpen(true)} style={{ margin: '0 5px' }} /> }
			</div>

			{/* 삭제 확인 모달 */}
			<Modal title='알림' open={isModalOpen} onOk={onDelete} onCancel={() => setIsModalOpen(false)}>
				<p>삭제하시겠습니까?</p>
			</Modal>

			<style jsx>{`
			.container { margin: 100px auto 0; max-width: 800px; min-width: 600px; width: 80%; }

			.item-container { display: inline-flex; justify-content: space-between; max-width: 800px; width: 100%; }
			.item1 { flex: 1; max-width: 800px; margin: 10px 0; display: flex; align-items: center; justify-content: center; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa; }
			.title1 { flex: 1; text-align: center; }
			.input1 { flex: 8; }

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
				errorMessage: init.errorMessage ? init.errorMessage : ''
			}
		}
	}
};