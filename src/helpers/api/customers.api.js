import axios from 'axios';
import {API_URL} from '../../config';

const CUSTOMER_URL = 'client/customer';

export const getCustomers = (params) => {

    let url = API_URL + CUSTOMER_URL + '?page=' + params.page + '&per_page=' + params.pageSize + '&search=' + params.search + '&sort_dir=' + params.sortDir + '&sort_field=' + params.sortField;
    return axios.get(url);
}

export const getAllCustomers = () => {

    let url = API_URL + CUSTOMER_URL + '?page=1&per_page=99999';
    return axios.get(url);
}

export const createCustomer = (params) => {

    let url = API_URL + CUSTOMER_URL;
    return axios.post(url, params);
}

export const updateCustomer = (params) => {

    let url = API_URL + CUSTOMER_URL + '/' + params.sid;
    return axios.put(url, params);
}

export const getCustomerDetails = (params) => {

	let url = API_URL + CUSTOMER_URL + '/' + params.sid;
	return axios.get(url);
}

export const deleteCustomer = (params) => {

	let url = API_URL + CUSTOMER_URL + '/' + params.sid;
	return axios.delete(url);
}

