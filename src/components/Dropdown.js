import React from 'react';

const Dropdown = ({
	label,
	values,
	sortByChoice,
}) => {
	return (
		<div>
			<label>{label}</label>
			<select onChange={sortByChoice}>
				{values.map((value, index) => <option key={index} value={value}>{value}</option>)}
			</select>
		</div>
	)
}

export default Dropdown;