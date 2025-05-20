import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
	Row,
	Col,
	FormGroup, Button, Spinner,
} from "reactstrap"
import {connect} from "react-redux"
import renderDateField from "../../../form/elements/datePickerField"

let ScheduleForm = props => {

	const { handleSubmit, loading, handleSidebar } = props

	return (
		<Row>
			<Col sm={12}>
				<form id='scheduleForm' onSubmit={handleSubmit}>
					<Row>
						<Col sm={12}>
							<FormGroup>
								<Field
									name="starts_at"
									component={renderDateField}
									label="Starts at"
								/>
								<Field
									name="ends_at"
									component={renderDateField}
									label="Ends at"
								/>
							</FormGroup>
						</Col>
						<Col xs={12}>
							<hr className={'my-2'}/>
							<Button disabled={loading} form="scheduleForm" type="submit" color="primary">
								{loading && <Spinner color="white" size="sm" />}
								<span className="ml-50">{"Schedule"}</span>
							</Button>
							<Button
								className="ml-1"
								color="danger"
								outline
								onClick={() => handleSidebar(false, true)}>
								Cancel
							</Button>
						</Col>
					</Row>
				</form>
			</Col>
		</Row>
	)
};

ScheduleForm = reduxForm({
	form: 'ScheduleForm',
	enableReinitialize: true
})(ScheduleForm)

ScheduleForm = connect(
	state => ({
		initialValues: state.orders.toJS().selectedOrder
	}),
	{}
)(ScheduleForm)

export default ScheduleForm
