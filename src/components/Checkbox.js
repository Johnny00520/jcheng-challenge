import React from 'react';

const Checkbox = ({
	label,
	checked,
	handleCheckBoxChange
}) => (
	<span>
		<label>{label}</label>
		<input
			type="checkbox"
			defaultChecked={checked}
			onChange={handleCheckBoxChange}
		/>
	</span>
)


export default Checkbox;