import {Label} from "reactstrap"
import React from "react"
import Flatpickr from "react-flatpickr"

const renderDateField = ({ input, label, meta: { touched, error, warning } }) => {

	const options = {
		enableTime: true,
		dateFormat: 'm/d/Y h:i K'
	}

	return (
		<div className="redux-form">
			<Label>{label}</Label>
			<Flatpickr
				className="form-control"
				value={input.value}
				options={options}
				onChange={(value) => {
					input.onChange(value)
				}}
			/>
			{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
		</div>
	)
}

export default renderDateField
