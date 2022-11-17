import React from 'react';
import { Button } from 'antd';

export default function Btn({ type, style, value, onClick, block, size, disabled }) {

	return (
		<Button
			type={type ? type : 'default'}
			style={style ? {...style} : {}}
			onClick={onClick ? onClick : null}
			block={block ? block : false}
			size={size ? size : 'middle'}
			disabled={disabled ? disabled : false}
		>{value}</Button>
	)
};