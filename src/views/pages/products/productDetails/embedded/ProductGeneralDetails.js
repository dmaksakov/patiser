import React from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import {Edit, Trash} from "react-feather";
import PopConfirm from "../../../../components/PopConfirm";
import defaultCakeImg from "../../../../../assets/img/other/default-cake.jpg";

export default class ProductGeneralDetails extends React.Component {

	deleteItem = () => {
		this.props.deleteProduct({sid: this.props.selectedProduct.sid})
	}

	triggerPopover = () => {
		this.popconfirm.togglePopover()
	}

	render() {
		const { handleSidebar, selectedProduct, productImages, loading, imagesRequestDone, getProductDetails } = this.props

		return (
			<Card className="product-general">
				<CardHeader>
					<CardTitle>
						<Row>
							<Col sm={12}>
								General information
							</Col>
						</Row>
					</CardTitle>
					<Row>
						<Col sm={12}>
							<Edit
								className="cursor-pointer mr-1"
								size={20}
								onClick={ () => {
									getProductDetails({
										...selectedProduct
									})
									handleSidebar(true, 'edit')
								}}
							/>
							<Trash
								id={selectedProduct.hasOwnProperty('sid') ? selectedProduct.sid : 'nothing'}
								className="cursor-pointer mr-1"
								size={20}
								onClick={() => {
									this.triggerPopover()
								}}
							/>
							<PopConfirm
								ref={popconfirm => this.popconfirm = popconfirm}
								targetId={selectedProduct.hasOwnProperty('sid') ? selectedProduct.sid : 'nothing'}
								deleteAction={this.deleteItem}
								showPopover={this.showPopover}
							/>
						</Col>
					</Row>
				</CardHeader>
				<CardBody>
					<Row>
						{!selectedProduct.is_variable && <Col xs={12} md={5} lg={4} className="mb-1">
							{!loading && productImages.length && productImages.filter(image => image.featured).length
								?
								loading ? <Skeleton width={300} height={300} /> : <img src={productImages.filter(image => image.featured)[0].url + '?d=300x300'} alt="featured image"/>
								:
								imagesRequestDone ? <img src={defaultCakeImg} width={300} height={'auto'} alt="featured image"/> : <Skeleton width={300} height={300} />
							}
						</Col>}
						<Col xs={12} md={7} lg={8}>
							<Row>
								<Col xs={6}>
									<p>{loading ? <Skeleton /> : 'Category:'}</p>
								</Col>
								<Col xs={6}>
									<p>{selectedProduct.category && selectedProduct.category.label || <Skeleton />}</p>
								</Col>
							</Row>
							{selectedProduct.description && <Row>
								<Col xs={6}>
									<p>{loading ? <Skeleton /> : 'Description:'}</p>
								</Col>
								<Col xs={6}>
									<p>{loading ? <Skeleton/> : selectedProduct.description}</p>
								</Col>
							</Row>}
							<Row>
								<Col xs={6}>
									<p>{loading ? <Skeleton /> :'Based on recipe:'}</p>
								</Col>
								<Col xs={6}>
									<p>{loading ? <Skeleton /> : selectedProduct.recipe_based === 'yes' ? 'Yes' : 'No'}</p>
								</Col>
							</Row>
							{selectedProduct.is_recipe_based !== 'yes' && selectedProduct.price_formatted && <Row>
								<Col xs={6}>
									<p>{loading ? <Skeleton /> : 'Price:'}</p>
								</Col>
								<Col xs={6}>
									<p>{loading ? <Skeleton /> : selectedProduct.price_formatted}</p>
								</Col>
							</Row>}
						</Col>
					</Row>
				</CardBody>
			</Card>
		)
	}
}
