import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { router } from 'next/router';
import useAsync from '../../hook/useAsync';
import Password from '../../components/global/InputPassword';
import Button from '../../components/global/Btn';
import { Menu, Tabs, Modal } from 'antd';

function MyPageNav({ url }) {
	// 메뉴 활성화
	const path = url?.slice(8);

	return (
		<>
			<Menu
				theme='light'
				defaultSelectedKeys={[path]}
				onClick={(e) => router.push(`/mypage/${e.key}`)}
				items = {[
					{
						key: 'myinfo',
						label: '내 정보',
					},
					{
						key: 'password',
						label: '비밀번호 변경',
					},
					{
						key: 'history',
						label: '내가 쓴 글',
					},
					{
						key: 'deleteUser',
						label: '탈퇴하기',
					}
				]}
			/>

			<style jsx>{`
			.tab-container { margin: 10px auto; width: 80%; text-align: center; padding-top: 30px; }
			`}</style>
		</>
	)
};

export default React.memo(MyPageNav);