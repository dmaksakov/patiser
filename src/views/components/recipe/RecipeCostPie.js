import React from "react"
import Chart from "react-apexcharts"

const $primary = "#7367F0",
	$success = "#28C76F",
	$danger = "#EA5455",
	$warning = "#FF9F43",
	$label_color = "#1E1E1E";

const themeColors = [$primary, $success, $danger, $warning, $label_color]


const RecipeCostPie = ({labels, series}) => {

	let options = {
		labels: labels,
		colors: themeColors,
		responsive:[
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 300
					},
					legend: {
						position: "bottom"
					}
				}
			}
		]

	};

	return (
		<Chart
			options={options}
			series={series}
			type="pie"
			height={200}
		/>
	);
}
export default RecipeCostPie;
