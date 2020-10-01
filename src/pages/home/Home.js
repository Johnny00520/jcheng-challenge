import React, { useState, useEffect } from 'react';
import HorizontalLine from "../../components/HorizontalLine";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
// import Selection from "../../components/Selection";
import Spacer from "../../components/Spacer";
import NoResult from "../../components/NoResult";
// import Dropdown from "../../components/Dropdown";
import Optgroup from "../../components/Optgroup";
import Pagination from "../../components/Pagination";

const Home = ({
	data,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	// const [direction, setDirection] = useState("");
	// const [pageOfItems, setPageOfItems] = useState([]);
	const [tableControl, setTableControl] = useState({
		rowsPerPage: 10,
		page: 0,		
	})

	const sortByChoice = (e) => {
		let selectElem = document.getElementById("choiceLabel");
		let optLabel = selectElem.options[selectElem.selectedIndex].parentNode.label;
		const { value } = e.target;

		switch(optLabel) {
			case "state":
				if(value === "ascending") {
					let localData = data.sort((a, b) => (a.state > b.state) ? 1 : -1);
					console.log("localData: ", localData)
					return setSearchResults(localData)

					// return setSearchResults(prevState => {
					// 	console.log("prevState: ", prevState)
					// 	return localData
					// });
				} else {
					let localData = data.sort((a, b) => (b.state < a.state) ? -1 : 1);
					return setSearchResults(prevState => [...prevState, localData]);

				}
			case "genre":
				if(value === "ascending") {
					let localData = data.sort((a, b) => (a.genre > b.genre) ? 1 : -1);
					return setSearchResults(localData);
				} else {
					let localData = data.sort((a, b) => (b.genre < a.genre) ? -1 : 1);
					return setSearchResults(prevState => [...prevState, localData]);	
				}

			default:
				let localData = data.sort((a, b) => (a.name > b.name) ? 1 : -1);
				return setSearchResults(prevState => [...prevState, localData]);
		}
	}

// ////////////////////////////////////////////////////////////////////////////////////

	useEffect(() => {
		setSearchResults(data)

		// const results = data.filter(d => {
		// 	return (
		// 		d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		// 		d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
		// 		d.genre.toLowerCase().includes(searchTerm.toLowerCase())
		// 	)
		// });
		// setSearchResults(results);
	}, [searchTerm, data]);

	const onHandleSearchChange = e => setSearchTerm(e.target.value);
	const onClearSearch = () => setSearchTerm("");
	const keyDown = e => {
		if(e.keyCode === 13) {
			e.preventDefault();
			const results = data.filter(d => {
				return (
					d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||	
					d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
					d.genre.toLowerCase().includes(searchTerm.toLowerCase())
				)
			})
			setSearchResults(results);
		}
	}
	const onSearchSubmit = (e) => {
		e.preventDefault();
		const results = data.filter(d => {
			return (
				d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||	
				d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
				d.genre.toLowerCase().includes(searchTerm.toLowerCase())
			)
		})
		setSearchResults(results);
	}
	

	const onChangePage = (pageOfItems) => {
		console.log("pageOfItems: ", pageOfItems)
        // update state with new page of items
        // setPageOfItems({ pageOfItems: pageOfItems });
        setSearchResults({ searchResults: pageOfItems });
	}

	return (
		<div className="homepage_wrapper">

			<div className="title_wrapper">
				<header className="title">Charter Restaurent</header>
			</div>

			<HorizontalLine color={"red"}/>

			<div className="homepage_body">
				<div className="fxn_options">

					<Optgroup
						label="Sort By"
						sortByChoice={sortByChoice}
						optionValues={[
							{
								label: "all",
								choices: ["all"]
							},
							{
								label: "state",
								choices: ["ascending", "descending"]
							},
							{
								label: "genre",
								choices: ["ascending", "descending"]
							},
						]}
					/>
					
					<Spacer />

					<SearchBar
						searchTerm={searchTerm}
						type={"text"}
						placeholder={"Search keyword..."}
						onHandleSearchChange={onHandleSearchChange}

						keyDown={keyDown}
						onSearchSubmit={onSearchSubmit}
					/>
					<button onClick={onSearchSubmit}>Search</button>
					<button onClick={onClearSearch}>Clear</button>
				</div>

				{searchResults.length !== 0 ?
					<>
						<Table
							data={searchResults}
							// keyFilter={["state", "genre"]}
							titleRow={["name", "city", "state", "telephone", "genre"]}

							rowsPerPage={tableControl.rowsPerPage}
							page={tableControl.page}
						/>
						<Pagination
							items={searchResults}

							initialPage={1}
							rowsPerPage={tableControl.rowsPerPage}
							page={tableControl.page}
							onChangePage={onChangePage}
						/>
					</>
				: <NoResult text="No Result Were Found"/>}
			</div>
		</div>
	)
}

export default Home;