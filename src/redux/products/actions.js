const productActions = {

    GET_PRODUCTS_REQUEST: 'GET_PRODUCTS_REQUEST',
	GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
	GET_PRODUCTS_FAILURE: 'GET_PRODUCTS_FAILURE',
	GET_PRODUCTS_DEBOUNCE: 'GET_PRODUCTS_DEBOUNCE',

	SET_PAGE_PARAMS: 'PRODUCTS/SET_PAGE_PARAMS',
	SET_SIDEBAR: 'SET_SIDEBAR',

	SET_TOUR: 'PRODUCTS/SET_TOUR',

	setTour: (tour) => ({
		type: productActions.SET_TOUR,
		tour
	}),

	setPageParams: (params) => ({
		type: productActions.SET_PAGE_PARAMS,
		params
	}),

	setSidebar: (boolean, sidebar = 'sidebar') => ({
		type: productActions.SET_SIDEBAR,
		boolean,
		sidebar
	}),

    getProducts: (params) => ({
        type: productActions.GET_PRODUCTS_REQUEST,
		params,
    }),
	getProductsDebounce: (params) => ({
		type: productActions.GET_PRODUCTS_DEBOUNCE,
		params,
	}),
	getProductsSuccess: (result) => ({
        type: productActions.GET_PRODUCTS_SUCCESS,
        payload: result,
    }),
	getProductsFailure: (error) => ({
        type: productActions.GET_PRODUCTS_FAILURE,
        payload: [],
        error,
    }),

    CREATE_PRODUCTS_REQUEST: 'CREATE_PRODUCTS_REQUEST',
	CREATE_PRODUCTS_SUCCESS: 'CREATE_PRODUCTS_SUCCESS',
	CREATE_PRODUCTS_FAILURE: 'CREATE_PRODUCTS_FAILURE',

    createProduct: (params) => ({
        type: productActions.CREATE_PRODUCTS_REQUEST,
		params
    }),
	createProductsSuccess: (result) => ({
        type: productActions.CREATE_PRODUCTS_SUCCESS,
        payload: result,
    }),
	createProductsFailure: (error) => ({
        type: productActions.CREATE_PRODUCTS_FAILURE,
        payload: [],
        error,
    }),

    UPDATE_PRODUCTS_REQUEST: 'UPDATE_PRODUCTS_REQUEST',
	UPDATE_PRODUCTS_SUCCESS: 'UPDATE_PRODUCTS_SUCCESS',
	UPDATE_PRODUCTS_FAILURE: 'UPDATE_PRODUCTS_FAILURE',

    updateProduct: (params) => ({
        type: productActions.UPDATE_PRODUCTS_REQUEST,
		params
    }),
	updateProductsSuccess: (result) => ({
        type: productActions.UPDATE_PRODUCTS_SUCCESS,
        payload: result,
    }),
	updateProductsFailure: (error) => ({
        type: productActions.UPDATE_PRODUCTS_FAILURE,
        payload: [],
        error,
    }),

    GET_PRODUCT_DETAILS_REQUEST: 'GET_PRODUCT_DETAILS_REQUEST',
	GET_PRODUCT_DETAILS_SUCCESS: 'GET_PRODUCT_DETAILS_SUCCESS',
	GET_PRODUCT_DETAILS_FAILURE: 'GET_PRODUCT_DETAILS_FAILURE',

    getProductDetails: (params) => ({
        type: productActions.GET_PRODUCT_DETAILS_REQUEST,
		params
    }),
	getProductDetailsSuccess: (result) => ({
        type: productActions.GET_PRODUCT_DETAILS_SUCCESS,
        payload: result,
    }),
	getProductDetailsFailure: (error) => ({
        type: productActions.GET_PRODUCT_DETAILS_FAILURE,
        payload: [],
        error,
    }),

    DELETE_PRODUCT_REQUEST:	'DELETE_PRODUCT_REQUEST',
	DELETE_PRODUCT_SUCCESS:	'DELETE_PRODUCT_SUCCESS',
	DELETE_PRODUCT_FAILURE:	'DELETE_PRODUCT_FAILURE',

    deleteProduct: (params) => ({
        type: productActions.DELETE_PRODUCT_REQUEST,
		params
    }),
	deleteProductSuccess: (result) => ({
        type: productActions.DELETE_PRODUCT_SUCCESS,
        payload: result,
    }),
	deleteProductFailure: (error) => ({
        type: productActions.DELETE_PRODUCT_FAILURE,
        payload: [],
        error,
    }),

	SELECT_PRODUCT:	'SELECT_PRODUCT',

	selectProduct: (product) => ({
		type: productActions.SELECT_PRODUCT,
		product
	}),

	SELECT_PRODUCT_ATTRIBUTE:	'SELECT_PRODUCT_ATTRIBUTE',

	selectAttribute: (attribute) => ({
		type: productActions.SELECT_PRODUCT_ATTRIBUTE,
		attribute
	}),

	SELECT_PRODUCT_RECIPE:	'SELECT_PRODUCT_RECIPE',

	selectRecipe: (recipe) => ({
		type: productActions.SELECT_PRODUCT_RECIPE,
		recipe
	}),

	SELECT_PRODUCT_IMAGE: 'SELECT_PRODUCT_IMAGE',

	selectProductImage: (productImage) => ({
		type: productActions.SELECT_PRODUCT_IMAGE,
		productImage
	}),

	/////////////////////////////////////////////////
	///Product Recipe
	/////////////////////////////////////////////////

	SET_RECIPE_AMOUNT: 'SET_RECIPE_AMOUNT',

	setRecipeAmount: (amount) => ({
		type: productActions.SET_RECIPE_AMOUNT,
		amount
	}),

	ADD_PRODUCT_RECIPE_REQUEST: 'ADD_PRODUCT_RECIPE_REQUEST',
	ADD_PRODUCT_RECIPE_SUCCESS: 'ADD_PRODUCT_RECIPE_SUCCESS',
	ADD_PRODUCT_RECIPE_FAILURE: 'ADD_PRODUCT_RECIPE_FAILURE',

	addProductRecipe: (params) => ({
		type: productActions.ADD_PRODUCT_RECIPE_REQUEST,
		params
	}),
	addProductRecipeSuccess: (result) => ({
		type: productActions.ADD_PRODUCT_RECIPE_SUCCESS,
		payload: result,
	}),
	addProductRecipeFailure: (error) => ({
		type: productActions.ADD_PRODUCT_RECIPE_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_PRODUCT_RECIPE_REQUEST: 'UPDATE_PRODUCT_RECIPE_REQUEST',
	UPDATE_PRODUCT_RECIPE_SUCCESS: 'UPDATE_PRODUCT_RECIPE_SUCCESS',
	UPDATE_PRODUCT_RECIPE_FAILURE: 'UPDATE_PRODUCT_RECIPE_FAILURE',

	updateProductRecipe: (params) => ({
		type: productActions.UPDATE_PRODUCT_RECIPE_REQUEST,
		params
	}),
	updateProductRecipeSuccess: (result) => ({
		type: productActions.UPDATE_PRODUCT_RECIPE_SUCCESS,
		payload: result,
	}),
	updateProductRecipeFailure: (error) => ({
		type: productActions.UPDATE_PRODUCT_RECIPE_FAILURE,
		payload: [],
		error,
	}),

	DELETE_PRODUCT_RECIPE_REQUEST:	'DELETE_PRODUCT_RECIPE_REQUEST',
	DELETE_PRODUCT_RECIPE_SUCCESS:	'DELETE_PRODUCT_RECIPE_SUCCESS',
	DELETE_PRODUCT_RECIPE_FAILURE:	'DELETE_PRODUCT_RECIPE_FAILURE',

	deleteProductRecipe: (params) => ({
		type: productActions.DELETE_PRODUCT_RECIPE_REQUEST,
		params
	}),
	deleteProductRecipeSuccess: (result) => ({
		type: productActions.DELETE_PRODUCT_RECIPE_SUCCESS,
		payload: result,
	}),
	deleteProductRecipeFailure: (error) => ({
		type: productActions.DELETE_PRODUCT_RECIPE_FAILURE,
		payload: [],
		error,
	}),

	/////////////////////////////////////////////////
	///Product Attributes
	/////////////////////////////////////////////////

	ADD_PRODUCT_ATTRIBUTE_REQUEST: 'ADD_PRODUCT_ATTRIBUTE_REQUEST',
	ADD_PRODUCT_ATTRIBUTE_SUCCESS: 'ADD_PRODUCT_ATTRIBUTE_SUCCESS',
	ADD_PRODUCT_ATTRIBUTE_FAILURE: 'ADD_PRODUCT_ATTRIBUTE_FAILURE',

	addProductAttribute: (params) => ({
		type: productActions.ADD_PRODUCT_ATTRIBUTE_REQUEST,
		params
	}),
	addProductAttributeSuccess: (result) => ({
		type: productActions.ADD_PRODUCT_ATTRIBUTE_SUCCESS,
		payload: result,
	}),
	addProductAttributeFailure: (error) => ({
		type: productActions.ADD_PRODUCT_ATTRIBUTE_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_PRODUCT_ATTRIBUTE_REQUEST: 'UPDATE_PRODUCT_ATTRIBUTE_REQUEST',
	UPDATE_PRODUCT_ATTRIBUTE_SUCCESS: 'UPDATE_PRODUCT_ATTRIBUTE_SUCCESS',
	UPDATE_PRODUCT_ATTRIBUTE_FAILURE: 'UPDATE_PRODUCT_ATTRIBUTE_FAILURE',

	updateProductAttribute: (params) => ({
		type: productActions.UPDATE_PRODUCT_ATTRIBUTE_REQUEST,
		params
	}),
	updateProductAttributeSuccess: (result) => ({
		type: productActions.UPDATE_PRODUCT_ATTRIBUTE_SUCCESS,
		payload: result,
	}),
	updateProductAttributeFailure: (error) => ({
		type: productActions.UPDATE_PRODUCT_ATTRIBUTE_FAILURE,
		payload: [],
		error,
	}),

	DELETE_PRODUCT_ATTRIBUTE_REQUEST:	'DELETE_PRODUCT_ATTRIBUTE_REQUEST',
	DELETE_PRODUCT_ATTRIBUTE_SUCCESS:	'DELETE_PRODUCT_ATTRIBUTE_SUCCESS',
	DELETE_PRODUCT_ATTRIBUTE_FAILURE:	'DELETE_PRODUCT_ATTRIBUTE_FAILURE',

	deleteProductAttribute: (params) => ({
		type: productActions.DELETE_PRODUCT_ATTRIBUTE_REQUEST,
		params
	}),
	deleteProductAttributeSuccess: (result) => ({
		type: productActions.DELETE_PRODUCT_ATTRIBUTE_SUCCESS,
		payload: result,
	}),
	deleteProductAttributeFailure: (error) => ({
		type: productActions.DELETE_PRODUCT_ATTRIBUTE_FAILURE,
		payload: [],
		error,
	}),

	/////////////////////////////////////////////////
	///Product Images
	/////////////////////////////////////////////////

	GET_SIMPLE_PRODUCT_IMAGES_REQUEST: 'GET_SIMPLE_PRODUCT_IMAGES_REQUEST',
	GET_SIMPLE_PRODUCT_IMAGES_SUCCESS: 'GET_SIMPLE_PRODUCT_IMAGES_SUCCESS',
	GET_SIMPLE_PRODUCT_IMAGES_FAILURE: 'GET_SIMPLE_PRODUCT_IMAGES_FAILURE',

	getSimpleProductImages: (params) => ({
		type: productActions.GET_SIMPLE_PRODUCT_IMAGES_REQUEST,
		params
	}),
	getSimpleProductImagesSuccess: (result) => ({
		type: productActions.GET_SIMPLE_PRODUCT_IMAGES_SUCCESS,
		payload: result,
	}),
	getSimpleProductImagesFailure: (error) => ({
		type: productActions.GET_SIMPLE_PRODUCT_IMAGES_FAILURE,
		payload: [],
		error,
	}),

	ADD_SIMPLE_PRODUCT_IMAGES_REQUEST: 'ADD_SIMPLE_PRODUCT_IMAGES_REQUEST',
	ADD_SIMPLE_PRODUCT_IMAGES_SUCCESS: 'ADD_SIMPLE_PRODUCT_IMAGES_SUCCESS',
	ADD_SIMPLE_PRODUCT_IMAGES_FAILURE: 'ADD_SIMPLE_PRODUCT_IMAGES_FAILURE',

	addSimpleProductImages: (params) => ({
		type: productActions.ADD_SIMPLE_PRODUCT_IMAGES_REQUEST,
		params
	}),
	addSimpleProductImagesSuccess: (result) => ({
		type: productActions.ADD_SIMPLE_PRODUCT_IMAGES_SUCCESS,
		payload: result,
	}),
	addSimpleProductImagesFailure: (error) => ({
		type: productActions.ADD_SIMPLE_PRODUCT_IMAGES_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_SIMPLE_PRODUCT_IMAGES_REQUEST: 'UPDATE_SIMPLE_PRODUCT_IMAGES_REQUEST',
	UPDATE_SIMPLE_PRODUCT_IMAGES_SUCCESS: 'UPDATE_SIMPLE_PRODUCT_IMAGES_SUCCESS',
	UPDATE_SIMPLE_PRODUCT_IMAGES_FAILURE: 'UPDATE_SIMPLE_PRODUCT_IMAGES_FAILURE',

	updateSimpleProductImages: (params) => ({
		type: productActions.UPDATE_SIMPLE_PRODUCT_IMAGES_REQUEST,
		params
	}),
	updateSimpleProductImagesSuccess: (result) => ({
		type: productActions.UPDATE_SIMPLE_PRODUCT_IMAGES_SUCCESS,
		payload: result,
	}),
	updateSimpleProductImagesFailure: (error) => ({
		type: productActions.UPDATE_SIMPLE_PRODUCT_IMAGES_FAILURE,
		payload: [],
		error,
	}),

	DELETE_SIMPLE_PRODUCT_IMAGES_REQUEST: 'DELETE_SIMPLE_PRODUCT_IMAGES_REQUEST',
	DELETE_SIMPLE_PRODUCT_IMAGES_SUCCESS: 'DELETE_SIMPLE_PRODUCT_IMAGES_SUCCESS',
	DELETE_SIMPLE_PRODUCT_IMAGES_FAILURE: 'DELETE_SIMPLE_PRODUCT_IMAGES_FAILURE',

	deleteSimpleProductImages: (params) => ({
		type: productActions.DELETE_SIMPLE_PRODUCT_IMAGES_REQUEST,
		params
	}),
	deleteSimpleProductImagesSuccess: (result) => ({
		type: productActions.DELETE_SIMPLE_PRODUCT_IMAGES_SUCCESS,
		payload: result,
	}),
	deleteSimpleProductImagesFailure: (error) => ({
		type: productActions.DELETE_SIMPLE_PRODUCT_IMAGES_FAILURE,
		payload: [],
		error,
	}),

/////////////////////////////////////////////////
///////////////// Variable products
/////////////////////////////////////////////////

	GENERATE_PRODUCT_VARIATIONS_REQUEST: 'GENERATE_PRODUCT_VARIATIONS_REQUEST',
	GENERATE_PRODUCT_VARIATIONS_SUCCESS: 'GENERATE_PRODUCT_VARIATIONS_SUCCESS',
	GENERATE_PRODUCT_VARIATIONS_FAILURE: 'GENERATE_PRODUCT_VARIATIONS_FAILURE',

	generateProductVariations: (params) => ({
		type: productActions.GENERATE_PRODUCT_VARIATIONS_REQUEST,
		params
	}),
	generateProductVariationsSuccess: (result) => ({
		type: productActions.GENERATE_PRODUCT_VARIATIONS_SUCCESS,
		payload: result,
	}),
	generateProductVariationsFailure: (error) => ({
		type: productActions.GENERATE_PRODUCT_VARIATIONS_FAILURE,
		payload: [],
		error,
	}),

	GET_PRODUCT_VARIATIONS_REQUEST: 'GET_PRODUCT_VARIATIONS_REQUEST',
	GET_PRODUCT_VARIATIONS_SUCCESS: 'GET_PRODUCT_VARIATIONS_SUCCESS',
	GET_PRODUCT_VARIATIONS_FAILURE: 'GET_PRODUCT_VARIATIONS_FAILURE',

	getProductVariations: (params) => ({
		type: productActions.GET_PRODUCT_VARIATIONS_REQUEST,
		params
	}),
	getProductVariationsSuccess: (result) => ({
		type: productActions.GET_PRODUCT_VARIATIONS_SUCCESS,
		payload: result,
	}),
	getProductVariationsFailure: (error) => ({
		type: productActions.GET_PRODUCT_VARIATIONS_FAILURE,
		payload: [],
		error,
	}),

	CREATE_VARIABLE_PRODUCTS_REQUEST: 'CREATE_VARIABLE_PRODUCTS_REQUEST',
	CREATE_VARIABLE_PRODUCTS_SUCCESS: 'CREATE_VARIABLE_PRODUCTS_SUCCESS',
	CREATE_VARIABLE_PRODUCTS_FAILURE: 'CREATE_VARIABLE_PRODUCTS_FAILURE',

	createVariableProduct: (params) => ({
		type: productActions.CREATE_VARIABLE_PRODUCTS_REQUEST,
		params
	}),
	createVariableProductSuccess: (result) => ({
		type: productActions.CREATE_VARIABLE_PRODUCTS_SUCCESS,
		payload: result,
	}),
	createVariableProductFailure: (error) => ({
		type: productActions.CREATE_VARIABLE_PRODUCTS_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_VARIABLE_PRODUCTS_REQUEST: 'UPDATE_VARIABLE_PRODUCTS_REQUEST',
	UPDATE_VARIABLE_PRODUCTS_SUCCESS: 'UPDATE_VARIABLE_PRODUCTS_SUCCESS',
	UPDATE_VARIABLE_PRODUCTS_FAILURE: 'UPDATE_VARIABLE_PRODUCTS_FAILURE',

	updateVariableProduct: (params) => ({
		type: productActions.UPDATE_VARIABLE_PRODUCTS_REQUEST,
		params
	}),
	updateVariableProductSuccess: (result) => ({
		type: productActions.UPDATE_VARIABLE_PRODUCTS_SUCCESS,
		payload: result,
	}),
	updateVariableProductFailure: (error) => ({
		type: productActions.UPDATE_VARIABLE_PRODUCTS_FAILURE,
		payload: [],
		error,
	}),

	DELETE_VARIABLE_PRODUCTS_REQUEST: 'DELETE_VARIABLE_PRODUCTS_REQUEST',
	DELETE_VARIABLE_PRODUCTS_SUCCESS: 'DELETE_VARIABLE_PRODUCTS_SUCCESS',
	DELETE_VARIABLE_PRODUCTS_FAILURE: 'DELETE_VARIABLE_PRODUCTS_FAILURE',

	deleteVariableProduct: (params) => ({
		type: productActions.DELETE_VARIABLE_PRODUCTS_REQUEST,
		params
	}),
	deleteVariableProductSuccess: (result) => ({
		type: productActions.DELETE_VARIABLE_PRODUCTS_SUCCESS,
		payload: result,
	}),
	deleteVariableProductFailure: (error) => ({
		type: productActions.DELETE_VARIABLE_PRODUCTS_FAILURE,
		payload: [],
		error,
	}),

/////////////////////////////////////////////////
///////////////// Variable product attributes
/////////////////////////////////////////////////

	CREATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST: 'CREATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST',
	CREATE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS: 'CREATE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS',
	CREATE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE: 'CREATE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE',

	createVariableProductAttribute: (params) => ({
		type: productActions.CREATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST,
		params
	}),
	createVariableProductAttributeSuccess: (result) => ({
		type: productActions.CREATE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS,
		payload: result,
	}),
	createVariableProductAttributeFailure: (error) => ({
		type: productActions.CREATE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST: 'UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST',
	UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS: 'UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS',
	UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE: 'UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE',

	updateVariableProductAttribute: (params) => ({
		type: productActions.UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST,
		params
	}),
	updateVariableProductAttributeSuccess: (result) => ({
		type: productActions.UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS,
		payload: result,
	}),
	updateVariableProductAttributeFailure: (error) => ({
		type: productActions.UPDATE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE,
		payload: [],
		error,
	}),

	DELETE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST: 'DELETE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST',
	DELETE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS: 'DELETE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS',
	DELETE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE: 'DELETE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE',

	deleteVariableProductAttribute: (params) => ({
		type: productActions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_REQUEST,
		params
	}),
	deleteVariableProductAttributeSuccess: (result) => ({
		type: productActions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_SUCCESS,
		payload: result,
	}),
	deleteVariableProductAttributeFailure: (error) => ({
		type: productActions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_FAILURE,
		payload: [],
		error,
	}),

	ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST: 'ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST',
	ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_SUCCESS: 'ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_SUCCESS',
	ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_FAILURE: 'ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_FAILURE',

	addVariableProductAttributeValue: (params) => ({
		type: productActions.ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST,
		params
	}),
	addVariableProductAttributeValueSuccess: (result) => ({
		type: productActions.ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_SUCCESS,
		payload: result,
	}),
	addVariableProductAttributeValueFailure: (error) => ({
		type: productActions.ADD_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_FAILURE,
		payload: [],
		error,
	}),

	DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST: 'DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST',
	DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_SUCCESS: 'DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_SUCCESS',
	DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_FAILURE: 'DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_FAILURE',

	deleteVariableProductAttributeValue: (params) => ({
		type: productActions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_REQUEST,
		params
	}),
	deleteVariableProductAttributeValueSuccess: (result) => ({
		type: productActions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_SUCCESS,
		payload: result,
	}),
	deleteVariableProductAttributeValueFailure: (error) => ({
		type: productActions.DELETE_VARIABLE_PRODUCT_ATTRIBUTE_VALUE_FAILURE,
		payload: [],
		error,
	}),


	RESET_PRODUCT_IMAGES: 'RESET_PRODUCT_IMAGES',

	resetProductImages: () => ({
		type: productActions.RESET_PRODUCT_IMAGES,
	}),

};

export default productActions;
