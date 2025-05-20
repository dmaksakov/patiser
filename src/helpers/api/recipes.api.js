import axios from 'axios';
import {API_URL} from '../../config';

const RECIPE_URL = 'client/recipes';

export const getRecipes = (params) => {

	let url = API_URL + RECIPE_URL + '?page=' + params.page + '&per_page=' + params.pageSize + '&search=' + params.search + '&sort_dir=' + params.sortDir + '&sort_field=' + params.sortField;
    return axios.get(url);
}

export const createRecipe = (params) => {

    let url = API_URL + RECIPE_URL;
    return axios.post(url, {
    	...params,
		yield_measure_unit: params.yield_measure_unit ? params.yield_measure_unit.value : ''
	});
}

export const updateRecipe = (params) => {

    let url = API_URL + RECIPE_URL + '/' + params.sid;
    return axios.put(url, {
		name: params.name,
		labor_time: params.labor_time ? params.labor_time : 0,
		yield: params.yield ? params.yield : 0,
		yield_measure_unit: params.yield_measure_unit.value ? params.yield_measure_unit.value : '',
		expenses: params.expenses ? params.expenses : 0,
	});
}

export const getRecipeDetails = (params) => {

	let url = API_URL + RECIPE_URL + '/' + params.sid;
	return axios.get(url);
}

export const deleteRecipe = (params) => {

	let url = API_URL + RECIPE_URL + '/' + params.sid;
	return axios.delete(url);
}

//Recipe items

export const getRecipeItems = (params) => {

	let url = API_URL + RECIPE_URL + '/' + params.sid + '/items';
	return axios.get(url);
}

export const createRecipeItem = (params) => {

    let url = API_URL + RECIPE_URL + '/' + params.sid + '/items';
    return axios.post(url, {
    	ingredient: params.ingredient,
		amount: params.amount ? params.amount : 0,
		measure_unit: params.measure_unit,
		notes: params.notes ? params.notes : ''
	});
}

export const updateRecipeItem = (params) => {

    let url = API_URL + RECIPE_URL + '/' + params.rid + '/items/' + params.riid;
    return axios.put(url, {
		ingredient: params.iid,
		amount: params.amount ? params.amount : 0,
		measure_unit: params.measure_unit,
		notes: params.notes ? params.notes : ''
	});
}

export const deleteRecipeItem = (params) => {

	let url = API_URL + RECIPE_URL + '/' + params.sid + '/items/' + params.ingredient;
	return axios.delete(url);
}

