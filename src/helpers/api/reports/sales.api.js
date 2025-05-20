import axios from 'axios';
import {API_URL} from '../../../config';

const SALES_REPORTS_URL = 'client/reports/sales';
const OPTIONS_URL = API_URL + SALES_REPORTS_URL + "/options";
const CHART_URL = API_URL + SALES_REPORTS_URL + "/chart";


export const getOptions = () =>{
	return axios.get(OPTIONS_URL);
}

export const getChart = (params) => {
	let url = CHART_URL;
	if(params){
		url += "?range_type=" + params.range_type + "&range_group=" + params.range_group;
	}
	return axios.get(url);
}
