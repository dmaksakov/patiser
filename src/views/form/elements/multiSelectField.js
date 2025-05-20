import {Label} from "reactstrap"
import React from "react"
import Select from "react-select"

class renderMultiSelectField extends React.Component {

	constructor(props) {
		super(props)
		this.state = {tags: []}
	}

	handleChange = (tags) => {
		this.setState({tags})
		this.props.input.onChange(tags)
	}

	render () {
		const { input, label, type, meta: { touched, error, warning } } = this.props

		const options = [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'strawberry', label: 'Strawberry' },
			{ value: 'vanilla', label: 'Vanilla' }
		]

		return (
			<div>
				<Label>{label}</Label>
				<Select
					closeMenuOnSelect={false}
					// defaultValue={[colourOptions[4], colourOptions[5]]}
					isMulti
					options={options}
				/>
				{/*<TagsInput*/}
				{/*	{...input}*/}
				{/*	value={this.state.tags}*/}
				{/*	onChange={this.handleChange}*/}
				{/*	inputProps={{*/}
				{/*		placeholder: 'Add values'*/}
				{/*	}}*/}
				{/*/>*/}
				{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
		)
	}
}

export default renderMultiSelectField
