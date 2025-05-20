import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard";
import {Users} from "react-feather";
import React from "react";

const chartOptions = {
	chart: {
		id: "customers_insights",
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
	colors: ["#00cfe8"],
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

const ProductInsight = ({insight,}) => {


	return (
		<StatisticsCard
			icon={<Users className="info" size={22}/>}
			iconBg="info"
			stat={insight.total}
			statTitle="Products"
			series={[{
				name: "Products",
				data: insight.series
			}]}
			options={chartOptions}
			type="area"
		/>

	);
};

export default ProductInsight;
