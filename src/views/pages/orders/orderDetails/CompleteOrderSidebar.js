import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import ordersActions from "../../../../redux/orders/actions"
import {connect} from "react-redux"
import CompleteOrderForm from "./CompleteOrderForm";
import errorActions from "../../../../redux/errors/actions";
import moment from "moment";

const {
	completeOrder,
} = ordersActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class ScheduleSidebar extends Component {

	completeOrder = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		const props = {
			completedAt: values.completed_at ? moment(values.completed_at[0]).format() : moment().format(),
			paymentAmount: values.payment_amount,
			sid: this.props.selectedOrder.sid
		}
		this.props.completeOrder({...props, form: 'CompleteOrderForm'})
	}

	render() {

		let {show, handleSidebar, loading} = this.props

		return (
			<div
				className={classnames("data-list-sidebar", {
					show: show
				})}
			>
				<div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
					<h4>Complete the order</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<CompleteOrderForm
						{...this.props}
						onSubmit={this.completeOrder}
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
	completeOrder,
	setShowErrors,
	removeAllErrors,
})(ScheduleSidebar)
