import React, {Component} from "react"
import {Button} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import ordersActions from "../../../../redux/orders/actions"
import {connect} from "react-redux"
import OrderItemForm from "./OrderItemForm"

const {
	getOrderDetails,
	createOrderItem,
	updateOrderItem,
} = ordersActions

class OrderItemSidebar extends Component {

	addItem = values => {

		const props = {
			...values,
			pid: this.props.selectedOrder.sid
		}
		this.props.createOrderItem(props)
		this.props.handleSidebar(false, true)
	}

	updateItem = values => {
		const props = {
			...values,
			pid: this.props.selectedOrder.sid
		}
		this.props.updateOrderItem(props)
		this.props.handleSidebar(false, true)
	}

	render() {

		let {show, handleSidebar, action} = this.props

		return (
			<div
				className={classnames("data-list-sidebar", {
					show: show
				})}
			>
				<div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
					<h4>{action === 'edit' ? "Update order item" : "Add new item"}</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<OrderItemForm
						{...this.props}
						onSubmit={action === 'add' ? this.addItem : this.updateItem}
					/>
				</PerfectScrollbar>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.orders.toJS().loading,
		selectedOrder: state.orders.toJS().selectedOrder
	}
}

export default connect(mapStateToProps, {
	getOrderDetails,
	createOrderItem,
	updateOrderItem,
})(OrderItemSidebar)
