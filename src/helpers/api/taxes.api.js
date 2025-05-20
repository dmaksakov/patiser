import axios from 'axios';
import {API_URL} from '../../config';

const TAX_CATEGORIES_URL = 'client/tax-categories';

export const getTaxCategories = (params) => {

	let url = API_URL + TAX_CATEGORIES_URL + '?page=' + params.page + '&per_page=' + params.pageSize + '&search=' + params.search + '&sort_dir=' + params.sortDir + '&sort_field=' + params.sortField;
	return axios.get(url);
}

export const createTaxCategory = (params) => {

	let url = API_URL + TAX_CATEGORIES_URL;
	return axios.post(url, params);
}

export const updateTaxCategory = (params) => {

	let url = API_URL + TAX_CATEGORIES_URL + '/' + params.sid;
	return axios.put(url, params);
}

export const deleteTaxCategory = (params) => {

	let url = API_URL + TAX_CATEGORIES_URL + '/' + params.sid;
	return axios.delete(url);
}
