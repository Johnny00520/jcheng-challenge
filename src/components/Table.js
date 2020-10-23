import React from 'react';

const Table = ({
	data,
	titleRow,
	onTableRowHandler,
	customClassName,
}) => {
	return (
		<div className="table_wrapper">
			<table>
				<thead>
					<tr>
						{titleRow.map((title, index) => <th key={index}>{title.toUpperCase()}</th> )}
					</tr>
				</thead>
				
				<tbody>
					{data.map((item, index) => {
						if(customClassName) {
							return (
								<tr
									key={index}
									className={customClassName}
									onClick={() => onTableRowHandler(item)}
								>
									{Object.keys(item).map((i, idx) => titleRow.includes(i) && <th key={idx}>{item[i]}</th>)}
								</tr>
							)
						} else {
							return (
								<tr key={index}>
									{Object.keys(item).map((i, idx) => titleRow.includes(i) && <th key={idx}>{item[i]}</th>)}
								</tr>
							)	
						}
					})}
				</tbody>
			</table>			
		</div>
	)
}

export default Table;
