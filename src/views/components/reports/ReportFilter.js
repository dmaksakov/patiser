import React, {useState} from "react";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

const ReportFilter = ({ranges, selectedRange, selectedOption, onChange}) => {
	let [date, setDate] = useState(new Date());

	return (
		<Row>
			<Col md={3} sm={12} className="mb-1">
				{selectedOption && <Select
					className="React"
					classNamePrefix="select"
					onChange={(sel) => {
						onChange({range_type: sel.value});
					}}
					options={ranges}
					value={selectedOption}
				/>}
			</Col>
			<Col md={6} sm={12} className="mb-1">
				{selectedRange.value === "custom" &&
				<Flatpickr
					value={date}
					options={{mode: "range"}}
					onChange={dt => {
						setDate(dt)
					}}
					className="form-control"
				/>
				}
			</Col>
		</Row>
	);

};

export default ReportFilter;
