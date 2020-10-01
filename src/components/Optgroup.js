import React from 'react'

const Outgroup = ({
	label,
	optionValues,
	sortByChoice,
}) => {
	return (
		<div>
			<label>{label}</label>
			<select onChange={sortByChoice} id="choiceLabel">
			{/* <select onChange={sortByChoice(this)} id="choiceLabel"> */}
				{optionValues.map((option, index) => {
					return (
						<optgroup label={option.label} key={index} value={option.label}>
							{option.choices.map((choice, idx) => <option key={idx} value={choice}>{choice}</option>)}
						</optgroup>
					)
				})}
			</select>	
		</div>
	)
}

export default Outgroup
