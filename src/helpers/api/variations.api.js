import axios from 'axios';
import {API_URL} from '../../config';

const VARIATIONS_URL = 'client/variations';

export const getVariations = (params) => {

	let url = API_URL + VARIATIONS_URL + '?page=' + params.page + '&per_page=' + params.pageSize + '&search=' + params.search + '&sort_dir=' + params.sortDir + '&sort_field=' + params.sortField;
	return axios.get(url);
}

export const getVariationDetails = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.vid;
	return axios.get(url);
}

export const createVariations = (params) => {

	let url = API_URL + VARIATIONS_URL;
	return axios.post(url, params);
}

export const updateVariations = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.vid;
	return axios.put(url, params);
}

export const deleteVariations = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.sid;
	return axios.delete(url, params);
}

////////////////////////////////////////////////////////////////////
//////////////// Variation recipes
////////////////////////////////////////////////////////////////////

export const createVariationsRecipe = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.vid + '/recipes';
	return axios.post(url, {
		recipe: params.recipe ? params.recipe.value : '',
		amount: params.amount
	});
}

export const updateVariationsRecipe = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.vid + '/recipes/' + params.rid;
	return axios.put(url, {
		amount: params.amount,
		notes: params.notes
	});
}

export const deleteVariationsRecipe = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.vid + '/recipes/' + params.rid;
	return axios.delete(url, params);
}

////////////////////////////////////////////////////////////////////
//////////////// Variation images
////////////////////////////////////////////////////////////////////

export const getVariationsImages = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.vid + '/images';
	return axios.get(url);
}

export const addVariationsImage = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.sid + '/images';
	const formData = new FormData();
	formData.append('file',params.file)
	const config = {
		headers: {
			'content-type': 'multipart/form-data',
			'Authorization': "Bearer " + localStorage.getItem('id_token')
		}
	}
	return axios.post(url, formData, config);
}

export const updateVariationsImage = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.vid + '/images/' + params.aid;
	return axios.put(url, {
		name: params.name,
		description: params.description,
		featured: params.featured
	});
}

export const deleteVariationsImage = (params) => {

	let url = API_URL + VARIATIONS_URL + '/' + params.vid + '/images/' + params.aid;
	return axios.delete(url, params);
}
