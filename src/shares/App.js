import React, { Component } from 'react';
import { handleResponse } from "../utils/http";

import Home from "../pages/home/Home";


class App extends Component {
	state = {
		error: null,
		isLoading: false,
		data: [],
	}

	componentDidMount() {
		this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
		return fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
			headers: { Authorization: "Api-Key q3MNxtfep8Gt"}
		})
		.then(handleResponse)
		.then((dataFetched) => {
			this.setState((prevState) => ({
				// data: dataFetched,
				data: dataFetched.sort((a, b) => (a.name > b.name) ? 1 : -1),
				isLoading: !prevState.isLoading				
			}))
		})
		.catch(error => {
			this.setState({ error: error });
		})
	}


	
	render() {
		// console.log("this.state: ", this.state)

		return (
			<div className="app_wrapper">
				<Home
					data={this.state.data}
				/>
			</div>
		)
	}
}


export default App;