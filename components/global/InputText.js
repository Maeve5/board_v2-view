import React from 'react';
import { Input } from 'antd';

export default function InputText({ title, type, placeholder, containerStyle, titleStyle, inputStyle, style, value, onChange, readOnly, bordered, inputRef }) {

	return (
		<div className='container' style={containerStyle ? {...containerStyle} : {}}>
			<div className='title' style={titleStyle ? {...titleStyle} : {}}>{title}</div>
			<div className='input' style={inputStyle ? {...inputStyle} : {}}>
				<Input
						type={type}
						placeholder={placeholder ? placeholder : ''}
						style={style ? {...style} : {}}
						value={value}
						onChange={onChange ? onChange : null}
						readOnly={readOnly ? readOnly : false}
						bordered={bordered ? true : bordered}
						ref={inputRef ? inputRef : null}
					/>
			</div>

			<style jsx>{`			
			.container { margin: 10px 0; display: flex; align-items: center; justify-content: center; }
			`}</style>
		</div>
	)
};