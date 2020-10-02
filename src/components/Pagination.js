import React, { Component } from 'react';
import PropTypes from "prop-types";

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state ={
			pager: {}
		}
	}
	componentDidMount() {
		this.setPage(this.props.initialPage);
	}
	setPage(page) {
		const {
			items,
			onChangePage,
		} = this.props;

		let pager = this.state.pager;

		if(page < 1 || page > pager.totalPages) return;

		pager = this.getPager(items.length, page);
		// console.log("pager: ", pager)

		var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
		// console.log("pageOfItems in pagination: ", pageOfItems)
		this.setState({ pager: pager });

		// debugger

		onChangePage(pageOfItems)
	}

	getPager(totalItems, currentPage, pageSize) {
		currentPage = currentPage || 1;

		// default page size is 3
		pageSize = pageSize || 10;
		
		// calculate total pages
		let totalPages = Math.ceil(totalItems / pageSize);
		// console.log("totalPages: ", totalPages)
		// console.log("currentPage: ", currentPage)
		// console.log("pageSize: ", pageSize)

		var startPage;
		var endPage;
		if(totalPages <= 3) {
			startPage = 1;
			endPage = totalPages - 1;
		} else {
			// more than 10 total pages so calculate start and end pages
			if(currentPage <= 3) {
				startPage = 1;
				endPage = 3;
			} else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 2;
				endPage = totalPages;
            } else {
				console.log("there")
                // startPage = currentPage - 2;
				// endPage = currentPage;
            }
		}
		// calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
		var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1); // min(9, 37)
		// console.log("startIndex: ", startIndex)
		// console.log("endIndex: ", endIndex)
		// create an array of pages to ng-repeat in the pager control
		var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
		return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
	}
	render() {
		var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
		return (
			<ul className="pagination">

                <li>
                    <button
						className={pager.currentPage === 1 ? 'disabled' : ''}
						onClick={() => this.setPage(1)}
					>First</button>
                </li>
                <li>
					<button 
						className={pager.currentPage === 1 ? 'disabled' : ''}
						onClick={() => this.setPage(pager.currentPage - 1)}
					>Last</button>
                </li>
                {pager.pages.map((page, index) =>
					<button
						key={index}
						className={pager.currentPage === page ? 'active' : ''}
						onClick={() => this.setPage(page)}
					>{page}
                    </button>
                )}
                <li >
                    <button
						className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
						onClick={() => this.setPage(pager.currentPage + 1)}
					>Next</button>
                </li>
                <li>
                    <button
						className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
						onClick={() => this.setPage(pager.totalPages)}
					>Last</button>
                </li>
            </ul>
		)
	}
}

Pagination.propTypes = {
	items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
};
export default Pagination;