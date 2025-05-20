import {Label} from "reactstrap"
import React from "react"
import Radio from "../../../components/@vuexy/radio/RadioVuexy"

const renderRadioField = ({ input, label, type, meta: { touched, error, warning }, options }) => (
	<div>
		<Label>{label}</Label>
		<div className="d-inline-block mr-1">
			{options.map(option => {
				return (
					<Radio
						checked={input.value === option.value}
						key={option.value}
						name={input.name}
						value={option.value}
						label={option.label}
						onClick={() => {
							input.onChange(option.value)
						}}
						onChange={() => {
							//needed for checked field for some reason
						}}
					/>
				)
			})}

		</div>
		{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
	</div>
)

export default renderRadioField
