import React from 'react';

const Table = ({
	data,
	// keyFilter,
	titleRow,
}) => {
	// console.log("data: ", data)
	return (
		<div className="table_wrapper">
			<table>
				<thead>
					<tr>
						{titleRow.map((title, index) => <th key={index}>{title.toUpperCase()}</th> )}
					</tr>
				</thead>
				
				<tbody>
					{/* {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((item, index) => {
						// console.log("item: ", item)
						return (
							<tr key={index}>
								{Object.keys(item).map((i, idx) => titleRow.includes(i) && <th key={idx}>{item[i]}</th>)}
							</tr>
						)
					})} */}

					{data.map((item, index) => {
						return (
							<tr key={index}>
								{Object.keys(item).map((i, idx) => titleRow.includes(i) && <th key={idx}>{item[i]}</th>)}
							</tr>
						)
					})}

					
				</tbody>
			</table>			
		</div>
	)
}

export default Table;
