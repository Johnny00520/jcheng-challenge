import React from 'react';

const Selection = ({
	options,
	onFilterChange
}) => {
	return (
		<>
			<label>Filter by</label>
			<select onChange={onFilterChange}>
				{options.map((option, index) => <option key={index} value={option}>{option}</option>)}
			</select>
		</>
	)
}

export default Selection;