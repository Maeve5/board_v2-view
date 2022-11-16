import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import router from 'next/router';
import spinnerState from '../../atom/spinner';
import { Spin } from 'antd';

function Spinner() {
	const [isSpinner, setIsSpinner] = useRecoilState(spinnerState);

	useEffect(() => {
		// 페이지 변경 시작
        router.events.on('routeChangeStart', () => setIsSpinner(true));
		// 페이지 변경 완료
        router.events.on('routeChangeComplete', () => setIsSpinner(false));
		// 페이지 에러
        router.events.on('routeChangeError', () => setIsSpinner(false));
	}, [isSpinner]);

	return (
		<>
			{isSpinner ?
				<div
				className='spinner'
				style={{
					position: 'sticky',
					width: '100%',
					height: '100vh',
					textAlign: 'center',
					zIndex: 400,
					background: 'rgba(255, 255, 255, 0.5)'
				}}
			>
				<Spin style={{ margin: '50vh auto' }} tip='Loading...' />
			</div>
			: <></>}
		</>
	);
};

export default React.memo(Spinner);

// spinner div에 position fixed 설정 (sticky는 문서의 흐름을 따르기 때문에 덮히지 않고 본문 요소들이 밑으로 밀려남)