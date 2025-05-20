import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import {Check} from "react-feather"
import React from "react"

const renderCheckBox = ({ input, label, meta: { touched, error, warning }, className }) => {
	return (
		<div className="redux-form">
			<Checkbox
				{...input}
				className={className}
				color="primary"
				icon={<Check className="vx-icon" size={16}/>}
				label={label}
				checked={input.value}
			/>
			{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
		</div>
	)
}

export default renderCheckBox
