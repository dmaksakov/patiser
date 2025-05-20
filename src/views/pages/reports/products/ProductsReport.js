import React from "react";
import {connect} from "react-redux";
import {Card, CardBody, CardHeader} from "reactstrap";


const ProductsReports = (
	{}
) => {


	return (
		<div>
			<Card>
				<CardHeader>
					<h1>Products</h1>
				</CardHeader>
				<CardBody>
					<h5>Coming Soon!</h5>
				</CardBody>
			</Card>

		</div>
	);
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps, {})(ProductsReports)
