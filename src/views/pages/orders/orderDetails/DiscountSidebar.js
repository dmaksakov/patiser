import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import ordersActions from "../../../../redux/orders/actions"
import {connect} from "react-redux"
import DiscountForm from "./DiscountForm"
import errorActions from "../../../../redux/errors/actions";

const {
	setOrderDiscount,
} = ordersActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class DiscountSidebar extends Component {

	setDiscount = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		const props = {
			type: values.type ? values.type.value : '',
			value: values.value ? values.value : 0,
			id: this.props.selectedOrder.sid
		}
		this.props.setOrderDiscount({...props, form: 'DiscountForm'})
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
					<h4>Apply order discount</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<DiscountForm
						{...this.props}
						onSubmit={this.setDiscount}
					/>
				</PerfectScrollbar>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		selectedOrder: state.orders.toJS().selectedOrder,
		loading: state.orders.toJS().loading,
	}
}

export default connect(mapStateToProps, {
	setOrderDiscount,
	setShowErrors,
	removeAllErrors,
})(DiscountSidebar)
