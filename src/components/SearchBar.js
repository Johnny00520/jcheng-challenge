import React from 'react';

const SearchBar = ({
	position,
	searchTerm,
	type,
	placeholder,

	onHandleSearchChange,
	onSearchSubmit,
	keyDown,
}) => {	

	return (
		<div className="search_bar_wrapper">
			<span style={{ margin: position === "center" ? "auto": "" }}>
				<input
					type={type}
					placeholder={placeholder}
					value={searchTerm}

					// onChange={React.useCallback(onHandleSearchChange)}
					// onKeyDown={React.useCallback(onSearchSubmit)}

					onChange={onHandleSearchChange}
					onKeyDown={keyDown}
				/>
			</span>
		</div>
	)
}

export default SearchBar;