import axios from 'axios';
import {API_URL} from '../../config';

const PRODUCT_CATEGORIES_URL = 'client/products/categories';

export const getProductCategories = (params) => {

	let url = API_URL + PRODUCT_CATEGORIES_URL + '?page=' + params.page + '&per_page=' + params.pageSize + '&search=' + params.search + '&sort_dir=' + params.sortDir + '&sort_field=' + params.sortField;
	return axios.get(url);
}

export const createProductCategory = (params) => {

	let url = API_URL + PRODUCT_CATEGORIES_URL;
	return axios.post(url, params);
}

export const updateProductCategory = (params) => {

	let url = API_URL + PRODUCT_CATEGORIES_URL + '/' + params.sid;
	return axios.put(url, params);
}

export const deleteProductCategory = (params) => {

	let url = API_URL + PRODUCT_CATEGORIES_URL + '/' + params.sid;
	return axios.delete(url);
}
