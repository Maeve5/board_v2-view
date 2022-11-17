import React from 'react';
import Link from 'next/link';

function List({ postArr }) {

	return (
		<table className='container'>
			<thead>
				<tr className='th'>
					<th width='8%'>번호</th>
					<th width='55%'>제목</th>
					<th width='17%'>작성자</th>
					<th width='20%'>작성일</th>
				</tr>
			</thead>
			<tbody>
				{postArr.length === 0 ?
					// 게시글 없을 때
					<tr>
						<td colSpan='4' height='100' className='no-list'>등록된 게시글이 없습니다.</td>
					</tr> :
					// 게시글 있을 때
					postArr.map((row) => {
						return (
							<tr key={row.rowKey} className='td'>
								<td width='8%'>{row.rowKey}</td>
								<td width='55%'>
									<Link href={`/list/${row.rowKey}`}>
										<div style={{ color: 'black' }}>{row.title}</div>
									</Link>
								</td>
								<td width='17%'>{row.name}</td>
								<td width='20%'>{row.createdTime}</td>
							</tr>
						)
					})
				}
			</tbody>

			<style jsx>{`
			.container { margin: 10px auto 20px; max-width: 800px; min-width: 600px; width: 100%; }
			thead, tbody { border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
			.no-list { text-align: center; }
			.td { text-align: center; }
			`}</style>
		</table>
	);
};

export default React.memo(List);