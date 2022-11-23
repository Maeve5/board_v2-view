import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import spinnerState from '../../atom/spinner';
import useAsync from '../../hook/useAsync';
import { Pagination } from 'antd';

function List({ pageSize, userKey }) {
	
	// 게시글 목록 조회
	const [state, res, fetchData] = useAsync('/v2/list', 'get');

	// 페이지네이션
	const [postArr, setPostArr] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	// spinner
	const [loading, setLoading] = useRecoilState(spinnerState);

	// userKey 있으면 해당 사용자가 쓴 글만 조회
	useEffect(() => {
		fetchData({	pageSize, currentPage, userKey });
	}, [currentPage]);

	useEffect(() => {
		setLoading(true);
		if (state === 'success') {
			setPostArr(() => res.list);
			setLoading(false);
		}
		else {
			setLoading(false);
		}
		console.log('state', state);
		console.log('res', res);
	}, [state]);

	return (
		<>
			{loading ? <></> :
				<>
					<div className='list'>
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
						</table>
					</div>

					<div className='pagination'>
						<Pagination onChange={(e) => setCurrentPage(e)} defaultCurrent={currentPage} current={currentPage} pageSize={pageSize} total={res ? res.length : 0} />
					</div>
				</>
			}

			<style jsx>{`
			.list { display: block; margin: 0 auto; width: 100%; min-width: 600px; text-align: center; }
			.container { margin: 10px auto 20px; max-width: 800px; min-width: 600px; width: 100%; }
			thead, tbody { border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
			.no-list { text-align: center; }
			.td { text-align: center; }

			.pagination { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(List);