import React from "react";
import {Button, Col, FormGroup, Input, Row} from "reactstrap";
import {Plus, Search} from "react-feather";
import Select from "react-select"
import "../../assets/scss/plugins/forms/react-select/_react-select.scss"

const SearchBar = props => {

	const {
		setPageParams,
		pageParams,
		sortOptions,
		handleSidebar,
		defaultValue,
		showAddButton = true,
		setTour,
		tour = {run: false, stepIndex: 0},
	} = props

	const { run, stepIndex } = tour

	const onSearch = (e) => {
		setPageParams({
			search: e.target.value,
			page: 1,
		})
		props.getResultsDebounce(pageParams)
	}

	const setParams = (sortDir, sortField) => {
		setPageParams({
			sortDir: sortDir,
			sortField: sortField
		})
	}

	const onSort = (value) => {
		switch (value.value) {
			case 'az':
				setParams('asc', 'name')
				break;
			case 'za':
				setParams('desc', 'name')
				break;
			case 'hp':
				setParams('desc', 'price')
				break;
			case 'lp':
				setParams('asc', 'price')
				break;
			default:
				setParams(value.value, '')
				break;
		}
		props.getResultsDebounce(pageParams)
	}

	return (
		<React.Fragment>
			<Row>
				<Col xs={12} md={4} lg={6} xl={8}>
					<div className="ecommerce-searchbar mt-1">
						<FormGroup className="position-relative">
							<Input
								className="search-product"
								placeholder="Search Here..."
								onChange={onSearch}
								value={pageParams ? pageParams.search : ''}
							/>
							<div className="form-control-position">
								<Search size={22}/>
							</div>
						</FormGroup>
					</div>
				</Col>
				{sortOptions && <Col xs={12} md={4} lg={3} xl={showAddButton ? 2 : 4}>
					<Select
						className="mt-1 React-Select"
						classNamePrefix="select"
						defaultValue={defaultValue}
						name="sort"
						onChange={onSort}
						options={sortOptions}
					/>
				</Col>}
				{showAddButton && <Col xs={12} md={4} lg={3} xl={2}>
					<Button
						className="add-new-btn mt-1 full-width line-height-normal mb-1 add-new"
						color="success"
						onClick={() => {
							setTour && setTour({
								run: stepIndex === 0 ? false : run,
								stepIndex: stepIndex === 0 ? 1 : stepIndex,
							})
							handleSidebar(true, 'add')
						}}

					>
						<Plus size={15}/>
						<span className="align-middle">Add New</span>
					</Button>
				</Col>}
			</Row>
		</React.Fragment>
	)
}

export default SearchBar

