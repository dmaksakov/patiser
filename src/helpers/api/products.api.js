import axios from 'axios';
import {API_URL} from '../../config';

const PRODUCT_SIMPLE_URL = 'client/products/simple';
const PRODUCT_VARIABLE_URL = 'client/products/variable';
const PRODUCT_URL = 'client/products';

export const getProducts = (params) => {

    let url = API_URL + PRODUCT_URL + '?page=' + params.page + '&per_page=' + params.pageSize + '&search=' + params.search + '&sort_dir=' + params.sortDir + '&sort_field=' + params.sortField;
    return axios.get(url);
}

export const createProduct = (params) => {

    let url = API_URL + PRODUCT_SIMPLE_URL;
    return axios.post(url, {
		category: params.category ? params.category.value : '',
		name: params.name,
		recipe_based: params.recipe_based === "yes",
		price: params.price,
		tax_category: params.tax_category ? params.tax_category.value : '',
	});

}

export const updateProduct = (params) => {

    let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.sid;
    return axios.put(url, {
		category: params.category ? params.category.value : '',
		name: params.name,
		recipe_based: params.recipe_based === "yes",
		price: params.price,
		tax_category: params.tax_category ? params.tax_category.value : '',
	});
}

export const getProductDetails = (params) => {

	let url = API_URL + PRODUCT_URL + '/' + params.sid;
	return axios.get(url);
}

export const deleteProduct = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.sid;
	return axios.delete(url);
}
/////////////////////////////////////////
///////// Product Attributes
/////////////////////////////////////////

export const addProductAttribute = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.pid + '/attributes';
	return axios.post(url, params);
}

export const updateProductAttribute = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.pid + '/attributes/' + params.sid;
	return axios.put(url, params);
}

export const deleteProductAttribute = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.pid + '/attributes/' + params.sid;
	return axios.delete(url);

}

/////////////////////////////////////////
///////// Product Recipes
/////////////////////////////////////////

export const addProductRecipe = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.pid + '/recipes';
	return axios.post(url, {
		recipe: params.recipe ? params.recipe.value : '',
		amount: params.amount,
		notes: params.notes
	});
}

export const updateProductRecipe = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.pid + '/recipes/' + params.recipe.sid;
	return axios.put(url, {
		amount: params.amount,
		notes: params.notes
	});
}

export const deleteProductRecipe = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.pid + '/recipes/' + params.sid;
	return axios.delete(url);

}

//Product images

export const getSimpleProductImages = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.sid + '/images';
	return axios.get(url);
}

export const addSimpleProductImages = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL+ '/' + params.sid + '/images';
	const formData = new FormData();
	formData.append('file',params.file, params.filename)
	const config = {
		headers: {
			'content-type': 'multipart/form-data',
			'Authorization': "Bearer " + localStorage.getItem('id_token')
		}
	}
	return axios.post(url, formData, config);
}

export const updateSimpleProductImages = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.pid + '/images/' + params.sid;
	return axios.put(url, {
		name: params.name,
		description: params.description,
		featured: params.featured,
	});
}

export const deleteSimpleProductImages = (params) => {

	let url = API_URL + PRODUCT_SIMPLE_URL + '/' + params.pid + '/images/' + params.sid;
	return axios.delete(url);
}

/////////////////////////////////////////////////
///////////////// Variable products
/////////////////////////////////////////////////

export const generateProductVariations = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL + '/' + params.sid + '/generate';
	return axios.post(url, {});
}

export const getProductVariations = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL + '/' + params.sid + '/variations';
	return axios.get(url);
}

export const createVariableProduct = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL;
	return axios.post(url, {
		category: params.category ? params.category.value : '',
		name: params.name,
		recipe_based: params.recipe_based === "yes",
		price: params.price,
		description: params.description,
		tax_category: params.tax_category ? params.tax_category.value : '',
	});

}

export const updateVariableProduct = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL + '/' + params.sid;
	return axios.put(url, {
		category: params.category ? params.category.value : '',
		name: params.name,
		recipe_based: params.recipe_based === "yes",
		price: params.price,
		description: params.description,
		tax_category: params.tax_category ? params.tax_category.value : '',
	});
}

export const deleteVariableProduct = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL + '/' + params.sid;
	return axios.delete(url);
}

/////////////////////////////////////////////////
///////////////// Variable product attributes
/////////////////////////////////////////////////

export const createVariableProductAttribute = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL + '/' + params.pid + '/attributes';
	return axios.post(url, {
		name: params.name,
		value: params.values,
		default_value: params.defaultValue
	});
}

export const updateVariableProductAttribute = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL + '/' + params.pid + '/attributes/' + params.aid;
	return axios.put(url, {
		name: params.name
	});
}

export const deleteVariableProductAttribute = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL + '/' + params.pid + '/attributes/' + params.sid;
	return axios.delete(url);
}

export const addVariableProductAttributeValue = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL + '/' + params.pid + '/attributes/' + params.aid + '/values';
	return axios.post(url, {
		value: params.value
	});
}

export const deleteVariableProductAttributeValue = (params) => {

	let url = API_URL + PRODUCT_VARIABLE_URL + '/' + params.pid + '/attributes/' + params.aid + '/values/' + params.value;
	return axios.delete(url);
}
