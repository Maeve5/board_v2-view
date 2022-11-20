import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { router } from 'next/router';
import { useSetRecoilState } from 'recoil';
import spinnerState from '../../atom/spinner';
import Wrap from '../../components/global/Wrap';
import Password from '../../components/global/InputPassword';
import Button from '../../components/global/Btn';
import MyInfo from '../../components/mypage/MyInfo';
import MyPassword from '../../components/mypage/MyPassword';
import MyHistory from '../../components/mypage/MyHistory';
import DeleteUser from '../../components/mypage/DeleteUser';
import useAsync from '../../hook/useAsync';
import { server } from '../../modules/server';
import MyPageNav from '../../components/mypage/MyPageNav';

function Mypage({ init, resolvedUrl, errorMessage }) {

	// 비밀번호
	const [password, setPassword] = useState('');
	// 비밀번호 확인
	const [checkState, , check] = useAsync(`/v2/auth/password`, 'post');

	// 확인 버튼 활성화
	const disabled = useMemo(() => {
		let isDisabled = false;
		if ( !password ) {
			return !isDisabled
		}
		return isDisabled;
	}, [password]);

	// 비밀번호 확인
	useEffect(() => {
		if (checkState === 'success') {
			router.push('/mypage/myinfo');
		}
	}, [checkState]);

	// auto focus
	const inputRef = useRef();
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<Wrap url={resolvedUrl} isLogin={init.isLogin} userKey={init.userKey}>
			<div className='mypage-container'>
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
					<Button onClick={() => check({ password })} disabled={disabled} value='확인' />
				</div>
			</div>

			<style jsx>{`
			.mypage-container { margin: 0 auto; max-width: 923.46px; min-width: 600px; width: 100%; padding-top: 30px; }
			.tab-container { margin: 10px auto; width: 80%; text-align: center; padding-top: 30px; }
			.button { margin-top: 30px; text-align: center; }
			`}</style>
		</Wrap>
	);
};

export default React.memo(Mypage);

export const getServerSideProps = async ({ req, resolvedUrl }) => {
	let init = await server(req);

	if (init.isLogin) {
		return { props: { init, resolvedUrl }}
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