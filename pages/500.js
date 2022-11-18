import React from "react";
import router from 'next/router';
import Button from "../components/global/Btn";
import { Result } from 'antd';

function Custom500() {
	return (
		<Result
			status="500"
			title="500"
			subTitle="Sorry, something went wrong."
			style={{ margin: '15vh auto'}}
			extra={<Button onClick={() => router.push('/')} value='Back Home' />}
		/>
	)
};

export default React.memo(Custom500);