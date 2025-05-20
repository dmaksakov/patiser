import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard";
import {BookOpen} from "react-feather";
import React from "react";

const chartOptions = {
	chart: {
		id: "secipes_insights",
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
	colors: ["#ea5455"],
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

const RecipeInsight = ({insight,}) => {


	return (
		<StatisticsCard
			icon={<BookOpen className="primary" size={22}/>}
			iconBg="primary"
			stat={insight.total}
			statTitle="Recipes"
			series={[{
				name: "Recipes",
				data: insight.series
			}]}
			options={chartOptions}
			type="area"
		/>

	);
};

export default RecipeInsight;
