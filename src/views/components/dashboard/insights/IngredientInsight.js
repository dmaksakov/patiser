import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard";
import {Layers} from "react-feather";
import React from "react";

const chartOptions = {
	chart: {
		id: "ingredients_insights",
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
	colors: ["#28c76f"],
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
		x: { show: false }
	}
}

const IngredientInsight = ({insight, }) => {


	return (
		<StatisticsCard
			icon={<Layers className="success" size={22} />}
			iconBg="success"
			stat={insight.total}
			statTitle="Ingredients"
			series={[{
				name: "Ingredients",
				data: insight.series
			}]}
			options={chartOptions}
			type="area"
		/>

	);
};

export default IngredientInsight;
