import React from "react"
import {
	Col,
	Row,
	Card,
	CardBody,
} from "reactstrap"
import SingleOrder from "../../components/order/SingleOrder";
import RecipeInsight from "../../components/dashboard/insights/RecipeInsight";
import SalesInsight from "../../components/dashboard/insights/SalesInsight";
import ProductInsight from "../../components/dashboard/insights/ProductInsight";
import OrderInsight from "../../components/dashboard/insights/OrderInsight";
import {IFrameAd} from "../IFrameAd";

const Dashboard = ({insights, upcoming, history, loaded, ads}) => {

	const iframe = '<iframe id="iframe" />'

	return (
		<React.Fragment>
			<Row className="match-height">
				{
					insights.recipes && (
						<Col lg="3" md="4" sm="6" className="recipe-insight">
							<RecipeInsight insight={insights.recipes}/>
						</Col>
					)
				}
				{
					insights.products && (
						<Col lg="3" md="4" sm="6" className="product-insight">
							<ProductInsight insight={insights.products}/>
						</Col>
					)
				}
				{
					insights.orders && (
						<Col lg="3" md="4" sm="6" className="order-insight">
							<OrderInsight insight={insights.orders}/>
						</Col>
					)
				}
				{
					insights.sales && (
						<Col lg="3" md="4" sm="6" className="sales-insight">
							<SalesInsight insight={insights.sales}/>
						</Col>
					)
				}
			</Row>
			{loaded && <Row>
				<Col sm={12} className="mb-1">
					<h4>Upcoming Orders</h4>
				</Col>
				<Col sm={12}>
					<Card>
						<CardBody>
							{
								upcoming.items.length > 0
									?
										upcoming.items.map(order => (
											<SingleOrder
												history={history}
												order={order}
												key={order.sid}
											/>
										))
									:
										<h5>You have no upcoming orders yet.</h5>
							}
						</CardBody>
					</Card>
				</Col>
			</Row>}

			<Row>
				<Col xs={12}>
					<IFrameAd
						iframe={iframe}
						adCode={ads.highTier}
					/>
				</Col>
			</Row>


		</React.Fragment>
	)
}

export default Dashboard
