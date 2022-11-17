import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
const { Password, TextArea } = Input;

export default function InputText({ title, type, placeholder, containerStyle, titleStyle, inputStyle, style, value, onChange, readOnly, bordered, inputRef }) {

	const [visiblePW, setVisiblePW] = useState(false);
	// auto focus
	// const idInput = useRef();
	// useEffect(() => {
	// 	idInput.current.focus();
	// }, []);

	return (
		<div className='container' style={containerStyle ? {...containerStyle} : {}}>
			<div className='title' style={titleStyle ? {...titleStyle} : {}}>{title}</div>
			<div className='input' style={inputStyle ? {...inputStyle} : {}}>
				{type === 'password' ?
					<Password
						placeholder={placeholder ? placeholder : ''}
						style={style ? {...style} : {}}
						iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						value={value}
						onChange={onChange ? onChange : null}
						readOnly={readOnly ? readOnly : false}
						bordered={bordered ? bordered : true}
						ref={inputRef ? inputRef : null}
					/>
					: type === 'textarea' ?
						<TextArea
							placeholder={placeholder ? placeholder : ''}
							style={style ? {...style} : {}}
							value={value}
							onChange={onChange ? onChange : null}
							readOnly={readOnly ? readOnly : false}
							bordered={bordered ? true : bordered}
							ref={inputRef ? inputRef : null}
						/>
						: <Input
						type={type}
						placeholder={placeholder ? placeholder : ''}
						style={style ? {...style} : {}}
						value={value}
						onChange={onChange ? onChange : null}
						readOnly={readOnly ? readOnly : false}
						bordered={bordered ? true : bordered}
						ref={inputRef ? inputRef : null}
					/>
				}
			</div>

			<style jsx>{`			
			.container { margin: 10px 0; display: flex; align-items: center; justify-content: center; }
			`}</style>
		</div>
	)
};