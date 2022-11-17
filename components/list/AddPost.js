import React, { useState, useRef, useEffect } from 'react';
import router from 'next/router';
import useAsync from '../../hook/useAsync';
import { Input, Button } from 'antd';
const { TextArea } = Input;

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
	const nameInput = useRef();
	useEffect(() => {
		nameInput.current.focus();
	}, []);

	return (
		<div className='insert-container'>
			<div className='item'>
					<div className='title'>제목</div>
					<div className='input'>
						<Input
							type='text'
							placeholder='제목을 입력해 주세요.'
							style={{ display: 'block' }}
							ref={nameInput}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>
				<div className='item'>
					<div className='title'>내용</div>
					<div className='input'>
						<TextArea
							rows={4}
							placeholder='내용을 입력해 주세요.'
							style={{ resize: 'none' }}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
			<div className='button'>
				<Button onClick={() => insert({ title, description })}>게시하기</Button>
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