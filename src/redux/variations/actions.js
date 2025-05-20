const variationActions = {

	SELECT_VARIATION:	'SELECT_VARIATION',

	selectVariation: (variation) => ({
		type: variationActions.SELECT_VARIATION,
		variation
	}),

	SET_SIDEBAR: 'SET_SIDEBAR',

	setSidebar: (boolean, sidebar = 'sidebar') => ({
		type: variationActions.SET_SIDEBAR,
		boolean,
		sidebar
	}),

    GET_VARIATIONS_REQUEST:	'GET_VARIATIONS_REQUEST',
	GET_VARIATIONS_SUCCESS:	'GET_VARIATIONS_SUCCESS',
	GET_VARIATIONS_FAILURE:	'GET_VARIATIONS_FAILURE',
	GET_VARIATIONS_DEBOUNCE: 'GET_VARIATIONS_DEBOUNCE',

	SET_PAGE_PARAMS: 'VARIATIONS/SET_PAGE_PARAMS',

	setPageParams: (params) => ({
		type: variationActions.SET_PAGE_PARAMS,
		params
	}),

    getVariations: () => ({
        type: variationActions.GET_VARIATIONS_REQUEST,
    }),
    getVariationsDebounce: (params) => ({
        type: variationActions.GET_VARIATIONS_DEBOUNCE,
		params
    }),
	getVariationsSuccess: (result) => ({
        type: variationActions.GET_VARIATIONS_SUCCESS,
        payload: result,
    }),
	getVariationsFailure: (error) => ({
        type: variationActions.GET_VARIATIONS_FAILURE,
        payload: [],
        error,
    }),

    GET_VARIATION_DETAILS_REQUEST:	'GET_VARIATION_DETAILS_REQUEST',
	GET_VARIATION_DETAILS_SUCCESS:	'GET_VARIATION_DETAILS_SUCCESS',
	GET_VARIATION_DETAILS_FAILURE:	'GET_VARIATION_DETAILS_FAILURE',

    getVariationDetails: (params) => ({
        type: variationActions.GET_VARIATION_DETAILS_REQUEST,
		params
    }),
	getVariationDetailsSuccess: (result) => ({
        type: variationActions.GET_VARIATION_DETAILS_SUCCESS,
        payload: result,
    }),
	getVariationDetailsFailure: (error) => ({
        type: variationActions.GET_VARIATION_DETAILS_FAILURE,
        payload: [],
        error,
    }),

    CREATE_VARIATIONS_REQUEST:	'CREATE_VARIATIONS_REQUEST',
	CREATE_VARIATIONS_SUCCESS:	'CREATE_VARIATIONS_SUCCESS',
	CREATE_VARIATIONS_FAILURE:	'CREATE_VARIATIONS_FAILURE',

    createVariations: (params) => ({
        type: variationActions.CREATE_VARIATIONS_REQUEST,
		params,
    }),
	createVariationsSuccess: (result) => ({
        type: variationActions.CREATE_VARIATIONS_SUCCESS,
        payload: result,
    }),
	createVariationsFailure: (error) => ({
        type: variationActions.CREATE_VARIATIONS_FAILURE,
        payload: [],
        error,
    }),

    UPDATE_VARIATIONS_REQUEST:	'UPDATE_VARIATIONS_REQUEST',
	UPDATE_VARIATIONS_SUCCESS:	'UPDATE_VARIATIONS_SUCCESS',
	UPDATE_VARIATIONS_FAILURE:	'UPDATE_VARIATIONS_FAILURE',

    updateVariations: (params) => ({
        type: variationActions.UPDATE_VARIATIONS_REQUEST,
		params,
    }),
	updateVariationsSuccess: (result) => ({
        type: variationActions.UPDATE_VARIATIONS_SUCCESS,
        payload: result,
    }),
	updateVariationsFailure: (error) => ({
        type: variationActions.UPDATE_VARIATIONS_FAILURE,
        payload: [],
        error,
    }),

    DELETE_VARIATIONS_REQUEST:	'DELETE_VARIATIONS_REQUEST',
	DELETE_VARIATIONS_SUCCESS:	'DELETE_VARIATIONS_SUCCESS',
	DELETE_VARIATIONS_FAILURE:	'DELETE_VARIATIONS_FAILURE',

    deleteVariations: (params, history) => ({
        type: variationActions.DELETE_VARIATIONS_REQUEST,
		params,
		history,
    }),
	deleteVariationsSuccess: (result) => ({
        type: variationActions.DELETE_VARIATIONS_SUCCESS,
        payload: result,
    }),
	deleteVariationsFailure: (error) => ({
        type: variationActions.DELETE_VARIATIONS_FAILURE,
        payload: [],
        error,
    }),

////////////////////////////////////////////////////////////////////
//////////////// Variation recipes
////////////////////////////////////////////////////////////////////

	CREATE_VARIATIONS_RECIPE_REQUEST:	'CREATE_VARIATIONS_RECIPE_REQUEST',
	CREATE_VARIATIONS_RECIPE_SUCCESS:	'CREATE_VARIATIONS_RECIPE_SUCCESS',
	CREATE_VARIATIONS_RECIPE_FAILURE:	'CREATE_VARIATIONS_RECIPE_FAILURE',

	createVariationsRecipe: (params) => ({
		type: variationActions.CREATE_VARIATIONS_RECIPE_REQUEST,
		params,
	}),
	createVariationsRecipeSuccess: (result) => ({
		type: variationActions.CREATE_VARIATIONS_RECIPE_SUCCESS,
		payload: result,
	}),
	createVariationsRecipeFailure: (error) => ({
		type: variationActions.CREATE_VARIATIONS_RECIPE_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_VARIATIONS_RECIPE_REQUEST:	'UPDATE_VARIATIONS_RECIPE_REQUEST',
	UPDATE_VARIATIONS_RECIPE_SUCCESS:	'UPDATE_VARIATIONS_RECIPE_SUCCESS',
	UPDATE_VARIATIONS_RECIPE_FAILURE:	'UPDATE_VARIATIONS_RECIPE_FAILURE',

	updateVariationsRecipe: (params) => ({
		type: variationActions.UPDATE_VARIATIONS_RECIPE_REQUEST,
		params,
	}),
	updateVariationsRecipeSuccess: (result) => ({
		type: variationActions.UPDATE_VARIATIONS_RECIPE_SUCCESS,
		payload: result,
	}),
	updateVariationsRecipeFailure: (error) => ({
		type: variationActions.UPDATE_VARIATIONS_RECIPE_FAILURE,
		payload: [],
		error,
	}),

	DELETE_VARIATIONS_RECIPE_REQUEST:	'DELETE_VARIATIONS_RECIPE_REQUEST',
	DELETE_VARIATIONS_RECIPE_SUCCESS:	'DELETE_VARIATIONS_RECIPE_SUCCESS',
	DELETE_VARIATIONS_RECIPE_FAILURE:	'DELETE_VARIATIONS_RECIPE_FAILURE',

	deleteVariationsRecipe: (params) => ({
		type: variationActions.DELETE_VARIATIONS_RECIPE_REQUEST,
		params
	}),
	deleteVariationsRecipeSuccess: (result) => ({
		type: variationActions.DELETE_VARIATIONS_RECIPE_SUCCESS,
		payload: result,
	}),
	deleteVariationsRecipeFailure: (error) => ({
		type: variationActions.DELETE_VARIATIONS_FAILURE,
		payload: [],
		error,
	}),

////////////////////////////////////////////////////////////////////
//////////////// Variation images
////////////////////////////////////////////////////////////////////

	ADD_VARIATIONS_IMAGE_REQUEST:	'ADD_VARIATIONS_IMAGE_REQUEST',
	ADD_VARIATIONS_IMAGE_SUCCESS:	'ADD_VARIATIONS_IMAGE_SUCCESS',
	ADD_VARIATIONS_IMAGE_FAILURE:	'ADD_VARIATIONS_IMAGE_FAILURE',

	addVariationsImage: (params) => ({
		type: variationActions.ADD_VARIATIONS_IMAGE_REQUEST,
		params,
	}),
	addVariationsImageSuccess: (result) => ({
		type: variationActions.ADD_VARIATIONS_IMAGE_SUCCESS,
		payload: result,
	}),
	addVariationsImageFailure: (error) => ({
		type: variationActions.ADD_VARIATIONS_IMAGE_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_VARIATIONS_IMAGE_REQUEST:	'UPDATE_VARIATIONS_IMAGE_REQUEST',
	UPDATE_VARIATIONS_IMAGE_SUCCESS:	'UPDATE_VARIATIONS_IMAGE_SUCCESS',
	UPDATE_VARIATIONS_IMAGE_FAILURE:	'UPDATE_VARIATIONS_IMAGE_FAILURE',

	updateVariationsImage: (params) => ({
		type: variationActions.UPDATE_VARIATIONS_IMAGE_REQUEST,
		params
	}),
	updateVariationsImageSuccess: (result) => ({
		type: variationActions.UPDATE_VARIATIONS_IMAGE_SUCCESS,
		payload: result,
	}),
	updateVariationsImageFailure: (error) => ({
		type: variationActions.UPDATE_VARIATIONS_IMAGE_FAILURE,
		payload: [],
		error,
	}),

	DELETE_VARIATIONS_IMAGE_REQUEST:	'DELETE_VARIATIONS_IMAGE_REQUEST',
	DELETE_VARIATIONS_IMAGE_SUCCESS:	'DELETE_VARIATIONS_IMAGE_SUCCESS',
	DELETE_VARIATIONS_IMAGE_FAILURE:	'DELETE_VARIATIONS_IMAGE_FAILURE',

	deleteVariationsImage: (params) => ({
		type: variationActions.DELETE_VARIATIONS_IMAGE_REQUEST,
		params,
	}),
	deleteVariationsImageSuccess: (result) => ({
		type: variationActions.DELETE_VARIATIONS_IMAGE_SUCCESS,
		payload: result,
	}),
	deleteVariationsImageFailure: (error) => ({
		type: variationActions.DELETE_VARIATIONS_IMAGE_FAILURE,
		payload: [],
		error,
	}),

	GET_VARIATIONS_IMAGES_REQUEST:	'GET_VARIATIONS_IMAGES_REQUEST',
	GET_VARIATIONS_IMAGES_SUCCESS:	'GET_VARIATIONS_IMAGES_SUCCESS',
	GET_VARIATIONS_IMAGES_FAILURE:	'GET_VARIATIONS_IMAGES_FAILURE',

	getVariationsImages: (params) => ({
		type: variationActions.GET_VARIATIONS_IMAGES_REQUEST,
		params,
	}),
	getVariationsImagesSuccess: (result) => ({
		type: variationActions.GET_VARIATIONS_IMAGES_SUCCESS,
		payload: result,
	}),
	getVariationsImagesFailure: (error) => ({
		type: variationActions.GET_VARIATIONS_IMAGES_FAILURE,
		payload: [],
		error,
	}),


};

export default variationActions;
