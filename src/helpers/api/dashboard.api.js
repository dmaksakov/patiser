import axios from 'axios';
import {API_URL} from '../../config';

const DASHBOARD_URL = 'client/dashboard';
const INSIGHTS_URL = API_URL + DASHBOARD_URL + "/insights";
const UPCOMING_URL = API_URL + DASHBOARD_URL + "/upcoming";


export const getInsights = () => {
	return axios.get(INSIGHTS_URL);
}

export const getUpcomingOrders = (params) => {

	const page = params.page ? params.page : 1
	const pageSize = params.pageSize ? params.pageSize : 10

	let url = UPCOMING_URL + '?page=' + page + '&per_page=' + pageSize;
	return axios.get(url);
}
