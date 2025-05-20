import React from "react"
import {X, Tag} from "react-feather"
import {
	UncontrolledDropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	FormGroup,
	Input,
	Label,
	Button,
	Badge,
} from "reactstrap"
import Flatpickr from "react-flatpickr";
import moment from "moment";

import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

const eventColors = {
	'New': "info",
	'In Progress': "warning",
	'Fulfilled': "success",
	'Canceled': "danger"
}

class AddEvent extends React.Component {
	state = {
		startDate: new Date(),
		endDate: new Date(),
		title: "",
		label: null,
		allDay: true,
		selectable: true
	}
	handleDateChange = date => {
		this.setState({
			startDate: date
		})
	}

	handleEndDateChange = date => {
		this.setState({
			endDate: date
		})
	}

	handleLabelChange = label => {
		this.setState({
			label
		})
	}

	handleAddEvent = id => {
		this.props.handleSidebar(false)
		this.props.addEvent({
			id: id,
			title: this.state.title,
			start: this.state.startDate,
			end: this.state.endDate,
			label: this.state.label === null ? "others" : this.state.label,
			allDay: this.state.allDay,
			selectable: this.state.selectable
		})
		this.setState({
			startDate: new Date(),
			endDate: new Date(),
			title: "",
			label: null,
			allDay: true,
			selectable: true
		})
	}

	UNSAFE_componentWillReceiveProps(nextProps) {

		this.setState({
			title: nextProps.eventInfo === null ? "" : nextProps.eventInfo.title,
			url: nextProps.eventInfo === null ? "" : nextProps.eventInfo.url,
			startDate:
				nextProps.eventInfo === null
					? new Date()
					: new Date(nextProps.eventInfo.start),
			endDate:
				nextProps.eventInfo === null
					? new Date()
					: new Date(nextProps.eventInfo.end),
			label: nextProps.eventInfo === null ? null : nextProps.eventInfo.label,
			allDay: nextProps.eventInfo === null ? true : nextProps.eventInfo.allDay,
			selectable:
				nextProps.eventInfo === null ? true : nextProps.eventInfo.selectable
		})
	}

	render() {

		let events = this.props.events.map(i => i.id)
		let lastId = events.pop()
		let newEventId = lastId + 1
		const options = {
			enableTime: true,
			dateFormat: 'm/d/Y h:i K'
		}

		return (
			<div
				className={`add-event-sidebar ${
					this.props.sidebar ? "show" : "hidden"
				}`}
			>
				<div className="header d-flex justify-content-between">
					<h3 className="text-bold-600 mb-0">
						{this.props.eventInfo !== null &&
						this.props.eventInfo.title.length > 0
							? "Update Order"
							: "Add Order"}
					</h3>
					<div
						className="close-icon cursor-pointer"
						onClick={() => this.props.handleSidebar(false)}
					>
						<X size={20}/>
					</div>
				</div>
				<div className="add-event-body">
					<div className="add-event-fields mt-2">
						<FormGroup className="form-label-group">
							<span
								onClick={() => {this.props.history.push(`/orders/${this.props.eventInfo.order_sid}`)}}
							>
								<a href="#">
									{this.props.eventInfo && this.props.eventInfo.order_status &&
										<Badge
											color={ eventColors[this.props.eventInfo.order_status.name] }
											className="badge-md"
										>
											{this.state.title}
										</Badge>}
								</a>
							</span>
						</FormGroup>
						<FormGroup>
							<Label for="startDate">Start Date</Label>
							<Flatpickr
								id="startDate"
								className="form-control"
								value={this.state.startDate}
								onChange={date => this.handleDateChange(date)}
								options={options}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="endDate">End Date</Label>
							<Flatpickr
								id="endDate"
								className="form-control"
								value={this.state.endDate}
								onChange={date => this.handleEndDateChange(date)}
								options={options}
							/>
						</FormGroup>
					</div>
					<hr className="my-2"/>
					<div className="add-event-actions text-right">
						<Button.Ripple
							disabled={this.state.title.length > 0 ? false : true}
							color="primary"
							onClick={() => {
								this.props.handleSidebar(false)
								if (
									this.props.eventInfo === null ||
									this.props.eventInfo.title.length <= 0
								)
									this.handleAddEvent(newEventId)
								else
									this.props.updateEvent({
										id: this.props.eventInfo.id,
										start_time: this.state.startDate && this.state.startDate.length ? moment(this.state.startDate[0]).format() : this.props.eventInfo.starts_at,
										end_time: this.state.endDate && this.state.endDate.length ? moment(this.state.endDate[0]).format() : this.props.eventInfo.ends_at,
									})
							}}
						>
							{this.props.eventInfo !== null &&
							this.props.eventInfo.title.length > 0
								? "Update Schedule"
								: "Add Schedule"}
						</Button.Ripple>
						<Button.Ripple
							className="ml-1"
							color="flat-danger"
							onClick={() => {
								this.props.handleSidebar(false)
								if (this.props.handleSelectedEvent)
									this.props.handleSelectedEvent(null)
								else return null
							}}
						>
							Cancel
						</Button.Ripple>
					</div>
				</div>
			</div>
		)
	}
}

export default AddEvent
