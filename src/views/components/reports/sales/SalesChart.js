import React from "react"
import Chart from "react-apexcharts"

const $primary = "#7367F0",
	$success = "#28C76F",
	$danger = "#EA5455",
	$warning = "#FF9F43",
	$label_color = "#1E1E1E";

const themeColors = [$primary, $success, $danger, $warning, $label_color]




const  SalesChart = ({series, categories}) => {

	let options = {
		colors: themeColors,
		plotOptions: {
			bar: {
				horizontal: false
			}
		},
		dataLabels: {
			enabled: false
		},
		xaxis: {
			categories: categories,
			tickAmount: 5
		}
	}

		return (
			<Chart
					options={options}
					series={series}
					type="line"
					height={350}
				/>
		);
}
export default SalesChart;
