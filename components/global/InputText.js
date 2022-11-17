import React from 'react';
import { Input } from 'antd';

export default function InputText({ title, type, placeholder, style, value, onChange, readOnly, bordered }) {

	return (
		<div className='item'>
			<div className='title'>{title}</div>
			<div className='input'>
				<Input
					type={type}
					placeholder={placeholder ? placeholder : ''}
					style={style ? {...style} : {}}
					value={value}
					onChange={onChange ? onChange : null}
					readOnly={readOnly ? readOnly : false}
					bordered={bordered ? bordered : false}
				/>
			</div>

			<style jsx>{`			
			.item { margin: 10px 0; display: flex; align-items: center; justify-content: center; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa; }
			.title { flex: 1; text-align: center; }
			.input { flex: 8; }
			`}</style>
		</div>
	)
};