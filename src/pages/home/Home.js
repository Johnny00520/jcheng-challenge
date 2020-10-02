import React, { useState, useEffect } from 'react';
import HorizontalLine from "../../components/HorizontalLine";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import Spacer from "../../components/Spacer";
import NoResult from "../../components/NoResult";
import Optgroup from "../../components/Optgroup";
import Pagination from "../../components/Pagination";
import Checkbox from "../../components/Checkbox";

const Home = ({ data }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [showFilter, setShowFilter] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [pageOfItems, setPageOfItems] = useState([]);
	const [searchPress, setSearchPress] = useState(false);

	const sortByChoice = (e) => {
		let selectElem = document.getElementById("choiceLabel");
		let optLabel = selectElem.options[selectElem.selectedIndex].parentNode.label;
		const { value } = e.target;

		switch(optLabel) {
			case "state":
				if(value === "ascending") {
					if(searchPress) {
						let localData = pageOfItems.sort((a, b) => (a.state > b.state) ? 1 : -1);
						return setSearchResults(prevState => [...prevState, localData]);
					} else {
						let localData = searchResults.sort((a, b) => (a.state > b.state) ? 1 : -1);
						return setSearchResults(prevState => [...prevState, localData]);
					}
				} else {
					if(searchPress) {
						let localData = pageOfItems.sort((a, b) => (b.state < a.state) ? -1 : 1);
						return setSearchResults(prevState => [...prevState, localData]);
					} else {
						let localData = searchResults.sort((a, b) => (b.state < a.state) ? -1 : 1);
						return setSearchResults(prevState => [...prevState, localData]);
					}

				}
			case "genre":
				if(value === "ascending") {
					if(searchPress){
						let localData = pageOfItems.sort((a, b) => (a.genre > b.genre) ? 1 : -1);
						return setSearchResults(prevState => [...prevState, localData]);
					} else {
						let localData = searchResults.sort((a, b) => (a.genre > b.genre) ? 1 : -1);
						return setSearchResults(prevState => [...prevState, localData]);
					}
				} else {
					if(searchPress) {
						let localData = pageOfItems.sort((a, b) => (b.genre < a.genre) ? -1 : 1);
						return setSearchResults(prevState => [...prevState, localData]);	
					} else {
						let localData = searchResults.sort((a, b) => (b.genre < a.genre) ? -1 : 1);
						return setSearchResults(prevState => [...prevState, localData]);
					}
				}

			default:
				if(searchPress) {
					let localData = pageOfItems.sort((a, b) => (a.name > b.name) ? 1 : -1);
					return setSearchResults(prevState => [...prevState, localData]);
				} else {
					let localData = searchResults.sort((a, b) => (a.name > b.name) ? 1 : -1);
					return setSearchResults(prevState => [...prevState, localData]);
				}
		}
	}

	useEffect(() => {
		setSearchResults(data)

		// const results = data.filter(d => {
		// 	return (
		// 		d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		// 		d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
		// 		d.genre.toLowerCase().includes(searchTerm.toLowerCase())
		// 	)
		// });
		// return setSearchResults(results);
	}, [searchTerm, data]);

	const handleCheckBoxChange = () => setShowFilter((prevState) => !prevState);
	const onHandleSearchChange = e => setSearchTerm(e.target.value);
	const onClearSearch = () => {
		setSearchTerm("");
		setSearchPress(false);
	}
	const keyDown = e => {
		if(e.keyCode === 13) {
			e.preventDefault();
			const results = searchResults.filter(d => {
				return (
					d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||	
					d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
					d.genre.toLowerCase().includes(searchTerm.toLowerCase())
				)
			})
			setSearchResults(results);
			setSearchPress(true);
		}

	}
	const onSearchSubmit = (e) => {
		e.preventDefault();
		const results = searchResults.filter(d => (
			d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||	
			d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
			d.genre.toLowerCase().includes(searchTerm.toLowerCase())
		))
		setSearchResults(results);
		setSearchPress(true);
	}

	const onChangePage = (pageOfItems) => {
		setPageOfItems(pageOfItems)
		// setSearchResults(pageOfItems);
	}

	return (
		<div className="homepage_wrapper">
			<div className="title_wrapper">
				<header className="title">Charter Restaurent</header>
			</div>
			<HorizontalLine color={"red"}/>

			<div className="homepage_body">
				<div className="fxn_options">
					<Checkbox
						label={"Show filter"}
						checked={showFilter}
						handleCheckBoxChange={handleCheckBoxChange}
					/>
					{showFilter &&
						<div className="togglebox">
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
						</div>
					}

					<Spacer />
					<div className="search_box">
						<SearchBar
							searchTerm={searchTerm}
							type={"text"}
							placeholder={"Search by name, city, or genre..."}
							onHandleSearchChange={onHandleSearchChange}
							keyDown={keyDown}
							onSearchSubmit={onSearchSubmit}
						/>
						<button onClick={onSearchSubmit}>Search</button>
						<button onClick={onClearSearch}>Clear</button>
					</div>
				</div>
				

				{searchResults.length !== 0 ?
					<>
						<Table
							titleRow={["name", "city", "state", "telephone", "genre"]}
							data={searchPress ? pageOfItems : searchResults}
						/>

						{ searchPress &&
							<Pagination
								items={searchResults}
								initialPage={1}
								onChangePage={onChangePage}
							/>
						}

						{/* <Pagination
							items={searchResults}
							// items={pageOfItems}

							initialPage={1}
							onChangePage={onChangePage}
						/> */}
					</>
				: <NoResult text="No Result Were Found"/>}
			</div>
		</div>
	)
}

export default Home;

