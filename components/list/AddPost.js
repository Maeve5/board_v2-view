import React, { useState, useRef, useEffect } from 'react';
import router from 'next/router';
import useAsync from '../../hook/useAsync';
import Input from '../global/InputText';
import TextArea from '../global/InputTextArea';
import Button from '../global/Btn';

function AddPost() {

	// 제목, 내용
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	// 게시글 등록
	const [insertState, , insert] = useAsync('/v2/list', 'post');

	useEffect(() => {
		if (insertState === 'success') {
			router.push('/');
		}
	}, [insertState]);

	// auto focus
	const titleInput = useRef();
	useEffect(() => {
		titleInput.current.focus();
	}, []);

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
			<div className='button'>
				<Button value='게시하기' onClick={() => insert({ title, description })} />
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