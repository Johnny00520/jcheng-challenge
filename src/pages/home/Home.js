import React, { useState, useEffect } from 'react';
import HorizontalLine from "../../components/HorizontalLine";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import Spacer from "../../components/Spacer";
import NoResult from "../../components/NoResult";
import Optgroup from "../../components/Optgroup";
import Pagination from "../../components/Pagination";
import Checkbox from "../../components/Checkbox";
import Modal from "../../components/Modal";

const sortByDirectionAndKey = (arr, column, direction) => {
	if(direction === "ascending") {
		return arr.sort((a, b) => (a[column].toUpperCase() > b[column].toUpperCase()) ? 1 : -1)
	} else {
		return arr.sort((a, b) => (a[column].toUpperCase() > b[column].toUpperCase()) ? -1 : 1)
	}
}

const Home = ({ data }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [showFilter, setShowFilter] = useState(false);
	const [pageOfItems, setPageOfItems] = useState([]);
	const [modalToggle, setModalToggle] = useState(false);
	const [modalTable, setModalTable] = useState([]);

	const [searchResults, setSearchResults] = useState({
		data: [],
		searchPress: false,
	});

	const sortByChoice = (e) => {
		let selectElem = document.getElementById("choiceLabel");
		const optLabel = selectElem.options[selectElem.selectedIndex].parentNode.label;
		const { value } = e.target;

		if(value === "all") {
			return setSearchResults((prevState) => ({
				...prevState,
				data: sortByDirectionAndKey(searchResults.data, "name", "ascending"),
			}))
		}

		if(searchResults.searchPress) {
			return setSearchResults((prevState) => {
				return {
					...prevState,
					data: sortByDirectionAndKey(pageOfItems, optLabel, value),
				}
			})
		}

		// if(searchResults.column === optLabel) {
		// 	return setSearchResults((prevState) => {
		// 		return {
		// 			...prevState,
		// 			data: prevState.data.reverse(),
		// 			direction: prevState.direction === 'ascending' ? 'descending' : 'ascending',
		// 		}
		// 	})	
		// }
		return setSearchResults((prevState) => ({
			...prevState,
			data: sortByDirectionAndKey(searchResults.data, optLabel, value),
		}))
	}

	useEffect(() => {
		setSearchResults((prevState) => ({
			...prevState,
			data
		}))
		
		// setSearchResults(data)
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
		setSearchResults((prevState) => {
			return {
				...prevState,
				searchPress: false,
			}
		});
	}
	const keyDown = e => {
		if(e.keyCode === 13) {
			e.preventDefault();
			const results = searchResults.data.filter(d => {
				return (
					d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||	
					d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
					d.genre.toLowerCase().includes(searchTerm.toLowerCase())
				)
			})
			setSearchResults((prevState) => ({
				...prevState,
				data: results,
				searchPress: true
			}));
		}

	}
	const onSearchSubmit = (e) => {
		e.preventDefault();
		const results = searchResults.data.filter(d => (
			d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||	
			d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
			d.genre.toLowerCase().includes(searchTerm.toLowerCase())
		))
		setSearchResults((prevState) => ({
			...prevState,
			data: results,
			searchPress: true
		}));
	}

	const onChangePage = (pageOfItems) => {
		setPageOfItems(pageOfItems)
	}

	const onTableRowHandler = (item) => {
		setModalToggle((prevState) => !prevState);
		setModalTable((prevState) => [...prevState, item]);
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
				

				{searchResults.data.length !== 0 ?
					<>
						<Table
							titleRow={["name", "city", "state", "telephone", "genre"]}
							data={searchResults.searchPress ? pageOfItems : searchResults.data}
							onTableRowHandler={onTableRowHandler}
							customClassName={"table_row"}
						/>

						<Modal show={modalToggle} onTableRowHandler={onTableRowHandler}>
							<div style={{ color:'black' }}>
								<Table
									titleRow={["address1", "zip", "lat", "long", "tags", "website", "hours"]}
									data={modalTable}
								/>
							</div>
						</Modal>


						{ searchResults.searchPress &&
							<Pagination
								items={searchResults.data}
								initialPage={1}
								onChangePage={onChangePage}
							/>
						}
					</>
				: <NoResult text="No Result Were Found"/>}
			</div>
		</div>
	)
}

export default Home;

