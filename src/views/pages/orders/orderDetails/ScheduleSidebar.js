import React, {Component} from "react"
import {Button, Spinner} from "reactstrap"
import {X} from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import ordersActions from "../../../../redux/orders/actions"
import {connect} from "react-redux"
import ScheduleForm from "./ScheduleForm"
import moment from "moment";
import errorActions from "../../../../redux/errors/actions";

const {
	scheduleOrder,
} = ordersActions

const {
	setShowErrors,
	removeAllErrors,
} = errorActions

class ScheduleSidebar extends Component {

	scheduleOrder = values => {
		this.props.setShowErrors(false)
		this.props.removeAllErrors()
		const props = {
			startsAt: values.starts_at ? moment(values.starts_at[0]).format() : moment().format(),
			endsAt: values.ends_at ? moment(values.ends_at[0]).format() : moment().format(),
			sid: this.props.selectedOrder.sid
		}
		this.props.scheduleOrder({...props, form: 'ScheduleForm'})
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
					<h4>Schedule the order</h4>
					<X size={20} onClick={() => handleSidebar(false, true)}/>
				</div>
				<PerfectScrollbar
					className="data-list-fields px-2 mt-3"
					options={{wheelPropagation: false}}
				>
					<ScheduleForm
						{...this.props}
						onSubmit={this.scheduleOrder}
					/>
				</PerfectScrollbar>

				<div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">

				</div>
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
	scheduleOrder,
	setShowErrors,
	removeAllErrors,
})(ScheduleSidebar)
