import React from "react";
import {Card, CardBody, Input} from "reactstrap";
import "../../../../../assets/scss/pages/app-ecommerce-shop.scss"
import defaultCakeImg from "../../../../../assets/img/other/default-cake.jpg"
import NumericInput from "react-numeric-input"
import {mobileStyle} from "../../../../form/styles/InputStyles"


class SingleVariation extends React.Component {

	state = {
		amount: 1
	}

	changeAmount = (value) => {
		this.setState({amount: value})
	}

	addToOrder = (sid) => {

		const { toggleModal, createOrderItem } = this.props
		const props = {
			amount: String(this.state.amount),
			pid: this.props.selectedOrder.sid,
			variation: sid,
		}
		createOrderItem(props)
		toggleModal()
	}

	render() {
		const { item } = this.props

		return (
			<React.Fragment>
				<Card
					className="ecommerce-card select-order-item"
				>
					<div className="card-content">
						<div className="item-img text-center">
							<img className="img-fluid" src={item.featured_image ? item.featured_image + '?d=400x300' : defaultCakeImg} alt={item.name}/>
						</div>
						<CardBody>
							<div className="item-wrapper">
								<div className="item-rating quantity">
									<NumericInput
										onChange={this.changeAmount}
										min={1}
										value={this.state.amount}
										mobile
										style={mobileStyle}
									/>
								</div>
								<div className="product-price pl-5px">
									<h6 className="item-price">${item.price}/ea</h6>
								</div>
							</div>
							<div className="item-name">
								<span>{item.name}</span>
								<p className="item-company">
									By <span className="company-name">{item.by}</span>
								</p>
							</div>
							<div className="item-desc">
								<p className="item-description">{item.desc}</p>
							</div>
						</CardBody>
						<div className="item-options text-center">
							<div className="cart" onClick={() => this.addToOrder(item.sid)}>
								<span className="align-middle ml-50">Add to order</span>
							</div>
						</div>
					</div>
				</Card>
			</React.Fragment>
		)
	}
}

export default SingleVariation
