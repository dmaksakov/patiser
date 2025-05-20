import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard";
import {ShoppingCart, User} from "react-feather";
import React from "react";

const chartOptions = {
	chart: {
		id: "orders_insights",
		toolbar: {
			show: false
		},
		sparkline: {
			enabled: true
		}
	},
	grid: {
		show: false
	},
	colors: ["#ff9f43"],
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: "smooth",
		width: 2.5
	},
	fill: {
		type: "gradient",
		gradient: {
			shadeIntensity: 0.9,
			opacityFrom: 0.7,
			opacityTo: 0.5,
			stops: [0, 80, 100]
		}
	},

	xaxis: {
		labels: {
			show: false
		},
		axisBorder: {
			show: false
		}
	},
	yaxis: {
		labels: {
			show: false
		}
	},
	tooltip: {
		x: {show: false}
	}
}

const OrderInsight = ({insight,}) => {


	return (
		<StatisticsCard
			icon={<ShoppingCart className="warning" size={22}/>}
			iconBg="warning"
			stat={insight.total}
			statTitle="Orders"
			series={[{
				name: "Orders",
				data: insight.series
			}]}
			options={chartOptions}
			type="area"
		/>

	);
};

export default OrderInsight;
