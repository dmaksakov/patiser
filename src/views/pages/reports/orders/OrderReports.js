import React, {useEffect} from "react";
import {connect} from "react-redux";
import orderReportsActions from "../../../../redux/reports/orders/actions";
import OrdersChart from "../../../components/reports/orders/OrdersChart";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import ReportFilter from "../../../components/reports/ReportFilter";
import {getCurrentOption, getRangeOptions, getSelectedRange} from "../../../../redux/reports/orders/selectors"
import ChartGroup from "../../../components/reports/ChartGroup";

const {
	getOrdersOptionsRequest,
	getOrdersChartRequest,
	getOrdersParamsChange,
	getOrdersGroupByChange,
} = orderReportsActions

const OrderReports = (
	{
		getOrdersOptionsRequest,
		getOrdersChartRequest,
		getOrdersParamsChange,
		getOrdersGroupByChange,
		items,
		params,
		selectedRange,
		rangeOptions,
		selectedOption
	}
) => {
	let {name, series, categories, group_by} = items;
	useEffect(() => {
		getOrdersOptionsRequest();
		getOrdersChartRequest();
	}, []);

	const onParamsChange = (newParams) => {
		getOrdersParamsChange({...params, ...newParams});
	}

	const onGroupByChange = (newParams) => {
		getOrdersGroupByChange({...params, ...newParams})
	}

	return (
		<div>
			<Card>
				<CardHeader>
					<h1>Orders</h1>
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
					<OrdersChart series={series} categories={categories}/>
				</CardBody>
			</Card>


		</div>
	);
}

function mapStateToProps(state) {
	const {
		loading,
		items
	} = state.reports.orders.chart.toJS()

	const {
		quick_ranges,
		currentRange,
		rangeDateMin,
		params,
	} = state.reports.orders.options.toJS();
	return {
		loading,
		items,
		params,
		quick_ranges,
		currentRange,
		rangeDateMin,
		selectedRange: getSelectedRange(state.reports.orders.options.toJS()),
		rangeOptions: getRangeOptions(state.reports.orders.options.toJS()),
		selectedOption: getCurrentOption(state.reports.orders.options.toJS()),
	}
}

export default connect(mapStateToProps, {
	getOrdersChartRequest,
	getOrdersOptionsRequest,
	getOrdersParamsChange,
	getOrdersGroupByChange,
})(OrderReports)
