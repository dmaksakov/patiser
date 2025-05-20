import {Input, Label} from "reactstrap"
import React from "react"

const renderTextField = ({
							input,
							label,
							type,
							meta: { touched, error, warning },
							...custom
}) => (
	<div className="redux-form">
		<Label>{label}</Label>
		<Input
			{...input}
			{...custom}
			type={type}
			placeholder={label}
		/>
		{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
	</div>
)

export default renderTextField
