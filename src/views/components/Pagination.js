import React from "react"
import {Pagination, PaginationItem, PaginationLink} from "reactstrap"

class SleekPagination extends React.Component {

	state = {
		currentPage: 0,
	}

	handleClick(e, index) {

		e.preventDefault();
		this.setState({
			currentPage: index
		});
		this.props.changePage(index)

	}


	render() {

		const { currentPage, pageSize, total } = this.props
		const pagesCount = Math.ceil(total / pageSize)

		return (

			<React.Fragment>

				<div className="text-align-center">

					<div className="pagination-wrapper display-inline-block">

						<Pagination aria-label="Page navigation">

							<PaginationItem disabled={currentPage <= 1}>

								<PaginationLink
									onClick={e => this.handleClick(e, currentPage - 1)}
									previous
									href="#"
								/>

							</PaginationItem>

							{[...Array(pagesCount + 1)].map((page, i) => {
								if (i > 0) {
									return (
										<PaginationItem active={i === currentPage} key={i}>
											<PaginationLink onClick={e => this.handleClick(e, i)} href="#">
												{i}
											</PaginationLink>
										</PaginationItem>
									)
								}
							}

							)}

							<PaginationItem disabled={currentPage >= pagesCount}>

								<PaginationLink
									onClick={e => this.handleClick(e, currentPage + 1)}
									next
									href="#"
								/>

							</PaginationItem>

						</Pagination>

					</div>

				</div>

			</React.Fragment>

		);

	}

}

export default SleekPagination
