import React from "react"
import {Card, CardBody, CardHeader, Col, Table} from "reactstrap"
import SingleTr from "./mobileTable/SingleTr";

const MobileTable = (props) => {

	const { data, columns } = props

	return (
		<React.Fragment>
			<Card>

				<CardHeader>
				</CardHeader>

				<CardBody>
					<Table hover responsive className="mobile-table">

						<thead>
							<tr>
								{columns.map(header => <th key={header}>{header}</th>)}
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>

							{data.map((unit, i) =>
								<SingleTr
									key={i}
									{...props}
									unit={unit}
								/>
							)}

						</tbody>
					</Table>
				</CardBody>

			</Card>

		</React.Fragment>
	)
}

export default MobileTable
