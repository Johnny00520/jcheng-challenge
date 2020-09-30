import React, { useState } from 'react';
import HorizontalLine from "../../components/HorizontalLine";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import Selection from "../../components/Selection";
import Spacer from "../../components/Spacer";
import NoResult from "../../components/NoResult";
import Pagination from "../../components/Pagination";

const Home = ({
	data,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	// const [pageOfItems, setPageOfItems] = useState([]);
	const [tableControl, setTableControl] = useState({
		rowsPerPage: 10,
		page: 0,		
	})


	const [filter, setFilter] = useState({
		show: false,
		filterKey: "",
	})
	const [filterTerm, setFilterTerm] = useState({
		from: "",
		to: "",
	});
	

	React.useEffect(() => {
		setSearchResults(data)

		const results = data.filter(d => {
			return (
				d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
				d.genre.toLowerCase().includes(searchTerm.toLowerCase())
			)
		});
		setSearchResults(results);
	}, [searchTerm, data]);

	const sortByClick = (sortTitle) => {

	}

	const onFilterChange = e => {
		const { value } = e.target;
		if(value === "state" || value === "genre") {
			setFilter({ filterKey: value, show: true });
		} else {
			setFilter({ filterKey: "all", show: false });
		}
	}
	const onFilterInputFromChange = e => setFilterTerm({ ...filterTerm, from: e.target.value });
	const onFilterInputToChange = e => setFilterTerm({ ...filterTerm,  to: e.target.value });
	
	const onFilterSubmit = (e) => {
		e.preventDefault();
		console.log("filterTerm: ", filterTerm)
		const { from, to } = filterTerm;
		console.log("filter: ", filter)
		if(filter.filterKey === "state") {
			const dataFiltered = searchResults.filter(data => {
				if(from > data.state.toLowerCase() && to < data.state.toLowerCase()) {

				}
			})

			console.log("dataFiltered: ", dataFiltered)
		} else {

		}
	}

	const onHandleSearchChange = e => {
		setSearchTerm(e.target.value);
	}
	const onSearchSubmit = (e) => {
		e.preventDefault();
	}
	const onClearSearch = () => setSearchTerm("");

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
					<Selection
						options={["all", "state", "genre"]}
						onFilterChange={onFilterChange}
					/>
					{filter.show && 
						<span>
							<input
								type="text"
								placeholder="From..."
								onChange={onFilterInputFromChange}
							/>
							<input
								type="text"
								placeholder="To..."
								onChange={onFilterInputToChange}
							/>
							<button
								onClick={onFilterSubmit}
							>Filter</button>
						</span>
					}
					<button
						onClick={sortByClick("state")}
					>Sort</button>
					

					<Spacer />

					<SearchBar
						searchTerm={searchTerm}
						onHandleSearchChange={onHandleSearchChange}
					/>
					<button
						onClick={onSearchSubmit}
					>Search</button>
					<button
						onClick={onClearSearch}
					>Clear</button>
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