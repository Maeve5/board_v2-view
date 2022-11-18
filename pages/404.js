import React from "react";
import router from 'next/router';
import Button from "../components/global/Btn";
import { Result } from 'antd';

function Custom404() {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			style={{ margin: '15vh auto'}}
			extra={<Button onClick={() => router.push('/')} value='Back Home' />}
		/>
	)
};

export default React.memo(Custom404);