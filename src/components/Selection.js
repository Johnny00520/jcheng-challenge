import React from 'react';

const Selection = ({
	label,
	options,
	onFilterChange
}) => {
	return (
		<>
			<label>{label}</label>
			<select onChange={onFilterChange}>
				{options.map((option, index) => <option key={index} value={option}>{option}</option>)}
			</select>
		</>
	)
}

export default Selection;