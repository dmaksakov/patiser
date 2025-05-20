import {FormGroup, Input, Label} from "reactstrap"
import React from "react"
import TagsInput from "react-tagsinput"
import 'react-tagsinput/react-tagsinput.css'

class renderTagsInputField extends React.Component {

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

		return (
			<div>
				<Label>{label}</Label>
				<TagsInput
					{...input}
					value={this.state.tags}
					onChange={this.handleChange}
					inputProps={{
						placeholder: 'Add values'
					}}
				/>
				{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
		)
	}
}

export default renderTagsInputField
