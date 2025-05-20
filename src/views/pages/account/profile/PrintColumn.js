import {Col, Row} from "reactstrap";
import React from "react";

const PrintColumn = ({ label, value, labelCol = {xs: 6, sm: 4}, valueCol = {xs: 6, sm: 8} }) => {
	return (
		<>
			{label && value &&
			<Col xs={12} lg={6} className={'mb-1'}>
				<Row>
					<Col xs={labelCol.xs} sm={labelCol.sm}>
						<div className="user-info-title font-weight-bold">
							{label}
						</div>
					</Col>
					<Col xs={valueCol.xs} sm={valueCol.sm}>
						{value}
					</Col>
				</Row>
			</Col>
			}
		</>
	)
}

export default PrintColumn
