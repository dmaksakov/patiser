import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import customersActions from "../../../redux/customers/actions"
import {connect} from "react-redux"
import CustomerForm from "./CustomerForm"
import errorActions from "../../../redux/errors/actions"

const {
	createCustomersRequest,
	updateCustomersRequest,
} = customersActions


const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class CustomerSidebar extends Component {

	addCustomer = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.createCustomersRequest({...values, form: 'CustomerForm'})
	}

	updateCustomer = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.updateCustomersRequest({...values, form: 'CustomerForm'})
	}

	render() {

		let {show, handleSidebar, action, loading} = this.props

		return (
			<div
				className={classnames("data-list-sidebar", {
					show: show
				})}
			>
				<div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
					<h4>{action === 'edit' ? "Update customer" : "Add new customer"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<CustomerForm
						{...this.props}
						onSubmit={action === 'add' ? this.addCustomer : this.updateCustomer}
					/>
				</PerfectScrollbar>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.customers.toJS().loading,
	}
}

export default connect(mapStateToProps, {
	createCustomersRequest,
	updateCustomersRequest,
	setShowErrors,
	removeAllErrors,
})(CustomerSidebar)
