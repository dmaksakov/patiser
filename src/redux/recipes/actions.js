const recipeActions = {

    GET_RECIPES_REQUEST:	'GET_RECIPES_REQUEST',
	GET_RECIPES_SUCCESS:	'GET_RECIPES_SUCCESS',
	GET_RECIPES_FAILURE:	'GET_RECIPES_FAILURE',
	GET_RECIPES_DEBOUNCE:	'GET_RECIPES_DEBOUNCE',
	SET_SIDEBAR: 'SET_SIDEBAR',
	SET_ITEM_SIDEBAR: 'SET_ITEM_SIDEBAR',

	SET_PAGE_PARAMS: 'RECIPES/SET_PAGE_PARAMS',

	SET_TOUR: 'RECIPES/SET_TOUR',

	setTour: (tour) => ({
		type: recipeActions.SET_TOUR,
		tour
	}),

	setPageParams: (params) => ({
		type: recipeActions.SET_PAGE_PARAMS,
		params
	}),

	setSidebar: (boolean) => ({
		type: recipeActions.SET_SIDEBAR,
		boolean
	}),

	setItemSidebar: (boolean) => ({
		type: recipeActions.SET_ITEM_SIDEBAR,
		boolean
	}),

	getRecipesRequest: (params) => ({
        type: recipeActions.GET_RECIPES_REQUEST,
		params,
    }),
	getRecipesDebounce: (params) => ({
		type: recipeActions.GET_RECIPES_DEBOUNCE,
		params,
	}),
	getRecipesSuccess: (result) => ({
        type: recipeActions.GET_RECIPES_SUCCESS,
        payload: result,
    }),
	getRecipesFailure: (error) => ({
        type: recipeActions.GET_RECIPES_FAILURE,
        payload: [],
        error,
    }),

    CREATE_RECIPES_REQUEST:	'CREATE_RECIPES_REQUEST',
	CREATE_RECIPES_SUCCESS:	'CREATE_RECIPES_SUCCESS',
	CREATE_RECIPES_FAILURE:	'CREATE_RECIPES_FAILURE',

    createRecipesRequest: (params) => ({
        type: recipeActions.CREATE_RECIPES_REQUEST,
		params
    }),
	createRecipesSuccess: (result) => ({
        type: recipeActions.CREATE_RECIPES_SUCCESS,
        payload: result,
    }),
	createRecipesFailure: (error) => ({
        type: recipeActions.CREATE_RECIPES_FAILURE,
        payload: [],
        error,
    }),

    UPDATE_RECIPES_REQUEST:	'UPDATE_RECIPES_REQUEST',
	UPDATE_RECIPES_SUCCESS:	'UPDATE_RECIPES_SUCCESS',
	UPDATE_RECIPES_FAILURE:	'UPDATE_RECIPES_FAILURE',

    updateRecipesRequest: (params) => ({
        type: recipeActions.UPDATE_RECIPES_REQUEST,
		params
    }),
	updateRecipesSuccess: (result) => ({
        type: recipeActions.UPDATE_RECIPES_SUCCESS,
        payload: result,
    }),
	updateRecipesFailure: (error) => ({
        type: recipeActions.UPDATE_RECIPES_FAILURE,
        payload: [],
        error,
    }),

    GET_RECIPE_DETAILS_REQUEST:	'GET_RECIPE_DETAILS_REQUEST',
	GET_RECIPE_DETAILS_SUCCESS:	'GET_RECIPE_DETAILS_SUCCESS',
	GET_RECIPE_DETAILS_FAILURE:	'GET_RECIPE_DETAILS_FAILURE',

    getRecipeDetailsRequest: (params) => ({
        type: recipeActions.GET_RECIPE_DETAILS_REQUEST,
		params
    }),
	getRecipeDetailsSuccess: (result) => ({
        type: recipeActions.GET_RECIPE_DETAILS_SUCCESS,
        payload: result,
    }),
	getRecipeDetailsFailure: (error) => ({
        type: recipeActions.GET_RECIPE_DETAILS_FAILURE,
        payload: [],
        error,
    }),

    DELETE_RECIPE_REQUEST:	'DELETE_RECIPE_REQUEST',
	DELETE_RECIPE_SUCCESS:	'DELETE_RECIPE_SUCCESS',
	DELETE_RECIPE_FAILURE:	'DELETE_RECIPE_FAILURE',

    deleteRecipeRequest: (params, history) => ({
        type: recipeActions.DELETE_RECIPE_REQUEST,
		params,
		history,
    }),
	deleteRecipeSuccess: (result) => ({
        type: recipeActions.DELETE_RECIPE_SUCCESS,
        payload: result,
    }),
	deleteRecipeFailure: (error) => ({
        type: recipeActions.DELETE_RECIPE_FAILURE,
        payload: [],
        error,
    }),

	SELECT_RECIPE:	'SELECT_RECIPE',

	selectRecipe: (recipe) => ({
		type: recipeActions.SELECT_RECIPE,
		recipe
	}),

	/////////////////////////////////////////////////
	///Recipe items
	/////////////////////////////////////////////////

	GET_RECIPE_ITEMS_REQUEST: 'GET_RECIPE_ITEMS_REQUEST',
	GET_RECIPE_ITEMS_SUCCESS: 'GET_RECIPE_ITEMS_SUCCESS',
	GET_RECIPE_ITEMS_FAILURE: 'GET_RECIPE_ITEMS_FAILURE',

	getRecipeItems: (params) => ({
		type: recipeActions.GET_RECIPE_ITEMS_REQUEST,
		params
	}),
	getByRecipeItemsSuccess: (result) => ({
		type: recipeActions.GET_RECIPE_ITEMS_SUCCESS,
		payload: result,
	}),
	getByRecipeItemsFailure: (error) => ({
		type: recipeActions.GET_RECIPE_ITEMS_FAILURE,
		payload: [],
		error,
	}),

	CREATE_RECIPE_ITEM_REQUEST:	'CREATE_RECIPE_ITEM_REQUEST',
	CREATE_RECIPE_ITEM_SUCCESS:	'CREATE_RECIPE_ITEM_SUCCESS',
	CREATE_RECIPE_ITEM_FAILURE:	'CREATE_RECIPE_ITEM_FAILURE',

	createRecipeItem: (params) => ({
		type: recipeActions.CREATE_RECIPE_ITEM_REQUEST,
		params
	}),
	createRecipeItemSuccess: (result) => ({
		type: recipeActions.CREATE_RECIPE_ITEM_SUCCESS,
		payload: result,
	}),
	createRecipeItemFailure: (error) => ({
		type: recipeActions.CREATE_RECIPE_ITEM_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_RECIPE_ITEM_REQUEST:	'UPDATE_RECIPE_ITEM_REQUEST',
	UPDATE_RECIPE_ITEM_SUCCESS:	'UPDATE_RECIPE_ITEM_SUCCESS',
	UPDATE_RECIPE_ITEM_FAILURE:	'UPDATE_RECIPE_ITEM_FAILURE',

	updateRecipeItem: (params) => ({
		type: recipeActions.UPDATE_RECIPE_ITEM_REQUEST,
		params
	}),
	updateRecipeItemSuccess: (result) => ({
		type: recipeActions.UPDATE_RECIPE_ITEM_SUCCESS,
		payload: result,
	}),
	updateRecipeItemFailure: (error) => ({
		type: recipeActions.UPDATE_RECIPE_ITEM_FAILURE,
		payload: [],
		error,
	}),

	DELETE_RECIPE_ITEM_REQUEST:	'DELETE_RECIPE_ITEM_REQUEST',
	DELETE_RECIPE_ITEM_SUCCESS:	'DELETE_RECIPE_ITEM_SUCCESS',
	DELETE_RECIPE_ITEM_FAILURE:	'DELETE_RECIPE_ITEM_FAILURE',

	deleteRecipeItem: (params) => ({
		type: recipeActions.DELETE_RECIPE_ITEM_REQUEST,
		params
	}),
	deleteRecipeItemSuccess: (result) => ({
		type: recipeActions.DELETE_RECIPE_ITEM_SUCCESS,
		payload: result,
	}),
	deleteRecipeItemFailure: (error) => ({
		type: recipeActions.DELETE_RECIPE_ITEM_FAILURE,
		payload: [],
		error,
	}),

	SELECT_RECIPE_ITEM: 'SELECT_RECIPE_ITEM',

	selectRecipeItem: (item) => ({
		type: recipeActions.SELECT_RECIPE_ITEM,
		item
	}),


};

export default recipeActions;
