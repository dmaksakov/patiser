import {Label, Row, Col, Input} from "reactstrap"
import React from "react"

const renderTextField = ({
							 input,
							 label,
							 type,
							 meta: { touched, error, warning },
							 ...custom
						 }) => (
		<div className="redux-form">
			<Row>
				<Col xs={12}>
					<Label>{label}</Label>
				</Col>
				<Col xs={12}>
					<Input
						type="textarea"
						{...input}
						{...custom}
					/>
				</Col>
			</Row>
			{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
		</div>
)

export default renderTextField
