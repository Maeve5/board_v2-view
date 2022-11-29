import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import router from 'next/router';
import useAsync from '../../hook/useAsync';
import Input from '../global/InputText';
import TextArea from '../global/InputTextArea';
import Button from '../global/Btn';
import axios from 'axios';

function AddPost() {

	// 제목, 내용
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	// auto focus
	const titleInput = useRef();
	useEffect(() => {
		titleInput.current.focus();
	}, []);

	// 이름 변경 버튼 활성화
	const disabled = useMemo(() => {
		let isDisabled = false;
		if (!title || !description) {
			return !isDisabled
		}
		return isDisabled;
	}, [title, description]);

	// 게시글 등록
	const [insertState, , insert] = useAsync('/v2/list', 'post');
	useEffect(() => {
		if (insertState === 'success') {
			router.push('/');
		}
	}, [insertState]);

	const [file, setFile] = useState(null);

	const handleInputImg = useCallback(async (e) => {
		setFile(e.target.files[0]);
	}, []);

	const handleFormData = useCallback(async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('img', file);
		console.log(formData.getAll('img'));

		try {
			await axios.post('/v2/list', formData, {
				baseURL: 'http://localhost:8083',
				headers: {
					'Accept': 'Application/json',
					'Content-Type': 'multipart/form-data',
				},
				withCredentials: true,
			}).then((res) => {
				console.log(res);
			}).error((e) => {
				console.log(e);
			});
		}
				catch (error) {
			console.log('catch', error);
		}

	}, [file]);

	

return (
	<div className='insert-container'>
		<Input
			title='제목'
			type='text'
			placeholder='제목을 입력해 주세요.'
			titleStyle={{ flex: 1, textAlign: 'center' }}
			inputStyle={{ flex: 8 }}
			style={{ display: 'block' }}
			inputRef={titleInput}
			value={title}
			onChange={(e) => setTitle(e.target.value)}
		/>
		<TextArea
			title='내용'
			placeholder='내용을 입력해 주세요.'
			titleStyle={{ flex: 1, textAlign: 'center' }}
			inputStyle={{ flex: 8 }}
			style={{ minHeight: 285, resize: 'none' }}
			value={description}
			onChange={(e) => setDescription(e.target.value)}
		/>
		{/* <form action='./AddPost' method='post' encType='multipart/form-data'> */}
			<input type='file' name='file' onChange={(e) => handleInputImg(e)} accept='image/png, image/jpeg' />

			<button type='submit' onClick={(e) => handleFormData(e)}>업로드</button>
		{/* </form> */}

		<div className='button'>
			<Button value='게시하기' onClick={() => insert({ title, description })} disabled={disabled} />
		</div>

		<style jsx>{`
			.insert-container { margin: 100px auto; max-width: 800px; min-width: 600px; width: 80%; }
			.item { margin: 10px 0; display: flex; align-items: center; }
			.title { flex: 1; text-align: center; }
			.input { flex: 8; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
	</div>
);
};

export default React.memo(AddPost);