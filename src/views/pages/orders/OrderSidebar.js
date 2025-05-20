import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import ordersActions from "../../../redux/orders/actions"
import {connect} from "react-redux"
import OrderForm from "./OrderForm"
import errorActions from "../../../redux/errors/actions"

const {
	createOrder,
	updateOrder,
} = ordersActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class OrderSidebar extends Component {

	addOrder = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.createOrder({...values, form: 'OrderForm'})
	}

	updateOrder = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		this.props.updateOrder({...values, form: 'OrderForm'})
	}

	render() {

		let {show, handleSidebar, action, loading} = this.props

		return (
			<div
				className={classnames(" data-list-sidebar", {
					show: show
				})}
			>
				<div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
					<h4>{action === 'edit' ? "Update order" : "Add new order"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<OrderForm
						{...this.props}
						onSubmit={action === 'add' ? this.addOrder : this.updateOrder}
					/>
				</PerfectScrollbar>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.orders.toJS().loading,
		orderCategories: state.orders.toJS().orderCategories
	}
}

export default connect(mapStateToProps, {
	createOrder,
	updateOrder,
	setShowErrors,
	removeAllErrors,
})(OrderSidebar)
