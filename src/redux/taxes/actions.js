const taxActions = {

	SET_PAGE_PARAMS: 'TAXES/SET_PAGE_PARAMS',
	SET_SIDEBAR: 'SET_SIDEBAR',

	setPageParams: (params) => ({
		type: taxActions.SET_PAGE_PARAMS,
		params
	}),

	setSidebar: (boolean) => ({
		type: taxActions.SET_SIDEBAR,
		boolean
	}),

	GET_TAX_CATEGORIES_REQUEST: 'GET_TAX_CATEGORIES_REQUEST',
	GET_TAX_CATEGORIES_SUCCESS: 'GET_TAX_CATEGORIES_SUCCESS',
	GET_TAX_CATEGORIES_FAILURE: 'GET_TAX_CATEGORIES_FAILURE',

	getTaxCategories: () => ({
		type: taxActions.GET_TAX_CATEGORIES_REQUEST,
	}),
	getByTaxCategoriesSuccess: (result) => ({
		type: taxActions.GET_TAX_CATEGORIES_SUCCESS,
		payload: result,
	}),
	getByTaxCategoriesFailure: (error) => ({
		type: taxActions.GET_TAX_CATEGORIES_FAILURE,
		payload: [],
		error,
	}),

	CREATE_TAX_CATEGORY_REQUEST: 'CREATE_TAX_CATEGORY_REQUEST',
	CREATE_TAX_CATEGORY_SUCCESS: 'CREATE_TAX_CATEGORY_SUCCESS',
	CREATE_TAX_CATEGORY_FAILURE: 'CREATE_TAX_CATEGORY_FAILURE',

	createTaxCategory: (params) => ({
		type: taxActions.CREATE_TAX_CATEGORY_REQUEST,
		params
	}),
	createTaxCategorySuccess: (result) => ({
		type: taxActions.CREATE_TAX_CATEGORY_SUCCESS,
		payload: result,
	}),
	createTaxCategoryFailure: (error) => ({
		type: taxActions.CREATE_TAX_CATEGORY_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_TAX_CATEGORY_REQUEST: 'UPDATE_TAX_CATEGORY_REQUEST',
	UPDATE_TAX_CATEGORY_SUCCESS: 'UPDATE_TAX_CATEGORY_SUCCESS',
	UPDATE_TAX_CATEGORY_FAILURE: 'UPDATE_TAX_CATEGORY_FAILURE',

	updateTaxCategory: (params) => ({
		type: taxActions.UPDATE_TAX_CATEGORY_REQUEST,
		params
	}),
	updateTaxCategorySuccess: (result) => ({
		type: taxActions.UPDATE_TAX_CATEGORY_SUCCESS,
		payload: result,
	}),
	updateTaxCategoryFailure: (error) => ({
		type: taxActions.UPDATE_TAX_CATEGORY_FAILURE,
		payload: [],
		error,
	}),

	DELETE_TAX_CATEGORY_REQUEST: 'DELETE_TAX_CATEGORY_REQUEST',
	DELETE_TAX_CATEGORY_SUCCESS: 'DELETE_TAX_CATEGORY_SUCCESS',
	DELETE_TAX_CATEGORY_FAILURE: 'DELETE_TAX_CATEGORY_FAILURE',

	deleteTaxCategory: (params) => ({
		type: taxActions.DELETE_TAX_CATEGORY_REQUEST,
		params
	}),
	deleteTaxCategorySuccess: (result) => ({
		type: taxActions.DELETE_TAX_CATEGORY_SUCCESS,
		payload: result,
	}),
	deleteTaxCategoryFailure: (error) => ({
		type: taxActions.DELETE_TAX_CATEGORY_FAILURE,
		payload: [],
		error,
	}),

	SELECT_TAX_CATEGORY: 'SELECT_TAX_CATEGORY',

	selectTaxCategory: (taxCategory) => ({
		type: taxActions.SELECT_TAX_CATEGORY,
		taxCategory
	}),
}

export default taxActions
