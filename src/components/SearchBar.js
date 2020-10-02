import React from 'react';

const SearchBar = ({
	position,
	searchTerm,
	type,
	placeholder,
	onHandleSearchChange,
	keyDown,
}) => {	

	return (
		<div className="search_bar_wrapper">
			<span style={{ margin: position === "center" ? "auto": "" }}>
				<input
					type={type}
					placeholder={placeholder}
					value={searchTerm}
					onChange={onHandleSearchChange}
					onKeyDown={keyDown}
				/>
			</span>
		</div>
	)
}

export default SearchBar;