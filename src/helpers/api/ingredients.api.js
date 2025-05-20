import axios from 'axios';
import {API_URL} from '../../config';

const INGREDIENTS_URL = 'client/ingredients';

export const getAllIngredients = (params) => {

    let url = API_URL + INGREDIENTS_URL + '?page=1&per_page=99999';
    return axios.get(url);
}

export const getIngredients = (params) => {

    let url = API_URL + INGREDIENTS_URL + '?page=' + params.page + '&per_page=' + params.pageSize + '&search=' + params.search + '&sort_dir=' + params.sortDir + '&sort_field=' + params.sortField;
    return axios.get(url);
}

export const createIngredients = (params) => {

    let url = API_URL + INGREDIENTS_URL;
    return axios.post(url, {
		name: params.name,
		amount: params.amount,
		measure_unit: params.hasOwnProperty('measure_unit') ? params.measure_unit.value : 0,
		price: params.price,
	});
}

export const updateIngredients = (params) => {

    let url = API_URL + INGREDIENTS_URL + '/' + params.sid;
    return axios.put(url, {
    	name: params.name,
    	amount: Number(params.amount),
		measure_unit: params.hasOwnProperty('measure_unit') ? params.measure_unit.value : 0,
		price: Number(params.price),
	});
}

export const deleteIngredients = (params) => {

    let url = API_URL + INGREDIENTS_URL + '/' + params.sid;
    return axios.delete(url);
}
