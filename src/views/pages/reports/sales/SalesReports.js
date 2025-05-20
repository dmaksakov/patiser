import React, {useEffect} from "react";
import {connect} from "react-redux";
import salesReportsActions from "../../../../redux/reports/sales/actions";
import SalesChart from "../../../components/reports/sales/SalesChart";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import ReportFilter from "../../../components/reports/ReportFilter";
import {getCurrentOption, getRangeOptions, getSelectedRange} from "../../../../redux/reports/sales/selectors"
import ChartGroup from "../../../components/reports/ChartGroup";

const {
	getSalesOptionsRequest,
	getSalesChartRequest,
	getSalesParamsChange,
	getSalesGroupByChange,
} = salesReportsActions

const SalesReports = (
	{
		getSalesOptionsRequest,
		getSalesChartRequest,
		getSalesParamsChange,
		getSalesGroupByChange,
		items,
		params,
		selectedRange,
		rangeOptions,
		selectedOption
	}
) => {
	let {name, series, categories, group_by} = items;
	useEffect(() => {
		getSalesOptionsRequest();
		getSalesChartRequest();
	}, []);

	const onParamsChange = (newParams) =>{
		getSalesParamsChange({...params, ...newParams});
	}

	const onGroupByChange = (newParams) => {
		getSalesGroupByChange({...params, ...newParams})
	}

	return (
		<div>
			<Card>
				<CardHeader>
					<h1>Sales</h1>
				</CardHeader>
				<CardBody>
					<ReportFilter
						ranges={rangeOptions}
						selectedRange={selectedRange}
						selectedOption={selectedOption}
						onChange={onParamsChange}
					/>
					<hr/>
					<Row>
						<Col>
							<h5 className="mt-2">{name}</h5>
						</Col>
						<Col className="text-right">
							<ChartGroup
								groups={selectedRange.groups}
								params={params}
								selectedOption={group_by}
								onChange={onGroupByChange}
							/>
						</Col>
					</Row>

					<SalesChart series={series} categories={categories}/>
				</CardBody>
			</Card>

		</div>
	);
}

function mapStateToProps(state) {
	const {
		loading,
		items
	} = state.reports.sales.chart.toJS()

	const {
		quick_ranges,
		currentRange,
		rangeDateMin,
		params,
	} = state.reports.sales.options.toJS();
	return {
		loading,
		items,
		params,
		quick_ranges,
		currentRange,
		rangeDateMin,
		selectedRange: getSelectedRange(state.reports.sales.options.toJS()),
		rangeOptions: getRangeOptions(state.reports.sales.options.toJS()),
		selectedOption: getCurrentOption(state.reports.sales.options.toJS()),
	}
}

export default connect(mapStateToProps, {
	getSalesOptionsRequest,
	getSalesChartRequest,
	getSalesParamsChange,
	getSalesGroupByChange,
})(SalesReports)
