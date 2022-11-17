import React from "react";

function Custom404() {
	return (
		<div style={{ display: 'block', margin: '300px', textAlign: 'center' }}>
			[404] 존재하지 않는 페이지입니다.
		</div>
	)
};

export default React.memo(Custom404);