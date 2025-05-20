const categoryActions = {

	SET_PAGE_PARAMS: 'CATEGORIES/SET_PAGE_PARAMS',
	SET_SIDEBAR: 'SET_SIDEBAR',

	setPageParams: (params) => ({
		type: categoryActions.SET_PAGE_PARAMS,
		params
	}),

	setSidebar: (boolean) => ({
		type: categoryActions.SET_SIDEBAR,
		boolean
	}),

	GET_PRODUCT_CATEGORIES_REQUEST: 'GET_PRODUCT_CATEGORIES_REQUEST',
	GET_PRODUCT_CATEGORIES_SUCCESS: 'GET_PRODUCT_CATEGORIES_SUCCESS',
	GET_PRODUCT_CATEGORIES_FAILURE: 'GET_PRODUCT_CATEGORIES_FAILURE',
	GET_PRODUCT_CATEGORIES_DEBOUNCE: 'GET_PRODUCT_CATEGORIES_DEBOUNCE',

	getProductCategories: (params) => ({
		type: categoryActions.GET_PRODUCT_CATEGORIES_REQUEST,
		params,
	}),
	getProductCategoriesDebounce: (params) => ({
		type: categoryActions.GET_PRODUCT_CATEGORIES_DEBOUNCE,
		params,
	}),
	getByProductCategoriesSuccess: (result) => ({
		type: categoryActions.GET_PRODUCT_CATEGORIES_SUCCESS,
		payload: result,
	}),
	getByProductCategoriesFailure: (error) => ({
		type: categoryActions.GET_PRODUCT_CATEGORIES_FAILURE,
		payload: [],
		error,
	}),

	CREATE_PRODUCT_CATEGORY_REQUEST: 'CREATE_PRODUCT_CATEGORY_REQUEST',
	CREATE_PRODUCT_CATEGORY_SUCCESS: 'CREATE_PRODUCT_CATEGORY_SUCCESS',
	CREATE_PRODUCT_CATEGORY_FAILURE: 'CREATE_PRODUCT_CATEGORY_FAILURE',

	createProductCategory: (params) => ({
		type: categoryActions.CREATE_PRODUCT_CATEGORY_REQUEST,
		params
	}),
	createProductCategorySuccess: (result) => ({
		type: categoryActions.CREATE_PRODUCT_CATEGORY_SUCCESS,
		payload: result,
	}),
	createProductCategoryFailure: (error) => ({
		type: categoryActions.CREATE_PRODUCT_CATEGORY_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_PRODUCT_CATEGORY_REQUEST: 'UPDATE_PRODUCT_CATEGORY_REQUEST',
	UPDATE_PRODUCT_CATEGORY_SUCCESS: 'UPDATE_PRODUCT_CATEGORY_SUCCESS',
	UPDATE_PRODUCT_CATEGORY_FAILURE: 'UPDATE_PRODUCT_CATEGORY_FAILURE',

	updateProductCategory: (params) => ({
		type: categoryActions.UPDATE_PRODUCT_CATEGORY_REQUEST,
		params
	}),
	updateProductCategorySuccess: (result) => ({
		type: categoryActions.UPDATE_PRODUCT_CATEGORY_SUCCESS,
		payload: result,
	}),
	updateProductCategoryFailure: (error) => ({
		type: categoryActions.UPDATE_PRODUCT_CATEGORY_FAILURE,
		payload: [],
		error,
	}),

	DELETE_PRODUCT_CATEGORY_REQUEST: 'DELETE_PRODUCT_CATEGORY_REQUEST',
	DELETE_PRODUCT_CATEGORY_SUCCESS: 'DELETE_PRODUCT_CATEGORY_SUCCESS',
	DELETE_PRODUCT_CATEGORY_FAILURE: 'DELETE_PRODUCT_CATEGORY_FAILURE',

	deleteProductCategory: (params) => ({
		type: categoryActions.DELETE_PRODUCT_CATEGORY_REQUEST,
		params
	}),
	deleteProductCategorySuccess: (result) => ({
		type: categoryActions.DELETE_PRODUCT_CATEGORY_SUCCESS,
		payload: result,
	}),
	deleteProductCategoryFailure: (error) => ({
		type: categoryActions.DELETE_PRODUCT_CATEGORY_FAILURE,
		payload: [],
		error,
	}),

	SELECT_PRODUCT_CATEGORY: 'SELECT_PRODUCT_CATEGORY',

	selectProductCategory: (productCategory) => ({
		type: categoryActions.SELECT_PRODUCT_CATEGORY,
		productCategory
	}),
}

export default categoryActions
