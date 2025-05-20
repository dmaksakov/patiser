import {Label} from "reactstrap"
import Select from "react-select"
import React from "react"

const renderSelectField = ({ input, label, meta: { touched, error, warning }, options, isSearchable = true }) => {
	return (
		<div className="redux-form">
			<Label>{label}</Label>
			<Select
				className="React"
				classNamePrefix="select"
				value={
					{
						value: input.value.value,
						label: input.value.label
					}
				}
				isSearchable={isSearchable}
				onChange={(value) => {
					input.onChange(value)
				}}
				options={options}
			/>
			{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
		</div>
	)
}

export default renderSelectField
