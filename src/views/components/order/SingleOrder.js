import React from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Edit, Trash} from "react-feather";
import PopConfirm from "../PopConfirm";
import Moment from "react-moment";
import {setTourState} from "../../../helpers/utility";

class SingleOrder extends React.Component {

	deleteItem = () => {
		this.props.deleteOrder({sid: this.props.order.sid})
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {

		const {order, handleSidebar, getOrderDetails, history, isMobile, setTour} = this.props

		const showActions =
			 handleSidebar
				 ?
					<>
						<Edit
							className="cursor-pointer mr-1"
							size={20}
							onClick={() => {
								getOrderDetails({
									...order
								})
								handleSidebar(true, 'edit')
							}}
						/>
						<Trash
							id={order.sid}
							className="cursor-pointer mr-1"
							size={20}
							onClick={() => {
								this.triggerPopover()
							}}
						/>
						<PopConfirm
							ref={popconfirm => this.popconfirm = popconfirm}
							targetId={order.sid}
							deleteAction={this.deleteItem}
							showPopover={this.showPopover}
						/>
					</>
				:
				 	<div/>

		return (
			<Row className={'pt-1 pb-1'}>
				<Col xs={8} md={2} className="order-number">
					<span
						onClick={() => {
							setTour({run: false, stepIndex: 0})
							setTourState({orders2: 1})
							history.push(`/orders/${order.sid}`
						)}}
						className={'ingredient-name'}
					>
						<a href='' onClick={e => e.preventDefault()}>#{order.order_number}</a>
					</span>
				</Col>
				{isMobile && <Col xs={4} className="d-block d-md-none text-align-right mb-1">
					{showActions}
				</Col>}

				<Col xs={6} className={'d-block d-md-none'}>
					Customer name:
				</Col>
				<Col xs={6} md={2}>
					{order.customer.first_name} {order.customer.last_name}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					Status:
				</Col>
				<Col xs={6} md={2}>
					{order.status.name}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					Total:
				</Col>
				<Col xs={6} md={2}>
					{order.formatted.grand_total}
				</Col>

				<Col xs={6} className={'d-block d-md-none'}>
					Scheduled at:
				</Col>
				<Col xs={6} md={2}>
					{order.scheduled_at
						?
						<Moment
							format="MM/DD/YYYY H:mm a"
							date={order.scheduled_at}
						/>
						:
						<p>Not scheduled yet</p>
					}
				</Col>

				<Col md={2} className={'d-none d-md-block'}>
					{showActions}
				</Col>

			</Row>
		)
	}
}

export default SingleOrder;
