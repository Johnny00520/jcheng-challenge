import React from 'react';

const SearchBar = ({
	position,
	searchTerm,
	onHandleSearchChange,
}) => {	

	return (
		<div className="search_bar_wrapper">
			<span style={{ margin: position === "center" ? "auto": "" }}>
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={onHandleSearchChange}
				/>
			</span>
		</div>
	)
}

export default SearchBar;