const ingredientsActions = {

    GET_INGREDIENTS_REQUEST:	'GET_INGREDIENTS_REQUEST',
	GET_INGREDIENTS_SUCCESS:	'GET_INGREDIENTS_SUCCESS',
	GET_INGREDIENTS_FAILURE:	'GET_INGREDIENTS_FAILURE',

	GET_INGREDIENTS_DEBOUNCE:	'GET_INGREDIENTS_DEBOUNCE',

	SET_PAGE_PARAMS: 'INGREDIENT/SET_PAGE_PARAMS',
	SET_SIDEBAR: 'SET_SIDEBAR',

	GET_ALL_INGREDIENTS_REQUEST:	'GET_ALL_INGREDIENTS_REQUEST',
	GET_ALL_INGREDIENTS_SUCCESS:	'GET_ALL_INGREDIENTS_SUCCESS',
	GET_ALL_INGREDIENTS_FAILURE:	'GET_ALL_INGREDIENTS_FAILURE',

	getAllIngredientsRequest: (params) => ({
		type: ingredientsActions.GET_ALL_INGREDIENTS_REQUEST,
		params,
	}),
	getAllIngredientsSuccess: (result) => ({
		type: ingredientsActions.GET_ALL_INGREDIENTS_SUCCESS,
		payload: result,
	}),
	getAllIngredientsFailure: (error) => ({
		type: ingredientsActions.GET_ALL_INGREDIENTS_FAILURE,
		payload: [],
		error,
	}),

	setPageParams: (params) => ({
		type: ingredientsActions.SET_PAGE_PARAMS,
		params
	}),

	setSidebar: (boolean) => ({
		type: ingredientsActions.SET_SIDEBAR,
		boolean
	}),

    getIngredientsRequest: (params) => ({
        type: ingredientsActions.GET_INGREDIENTS_REQUEST,
		params,
    }),
    getIngredientsDebounce: (params) => ({
        type: ingredientsActions.GET_INGREDIENTS_DEBOUNCE,
		params,
    }),
	getIngredientsSuccess: (result) => ({
        type: ingredientsActions.GET_INGREDIENTS_SUCCESS,
        payload: result,
    }),
	getIngredientsFailure: (error) => ({
        type: ingredientsActions.GET_INGREDIENTS_FAILURE,
        payload: [],
        error,
    }),

    CREATE_INGREDIENTS_REQUEST:	'CREATE_INGREDIENTS_REQUEST',
	CREATE_INGREDIENTS_SUCCESS:	'CREATE_INGREDIENTS_SUCCESS',
	CREATE_INGREDIENTS_FAILURE:	'CREATE_INGREDIENTS_FAILURE',

    createIngredientsRequest: (params) => ({
        type: ingredientsActions.CREATE_INGREDIENTS_REQUEST,
		params
    }),
	createIngredientsSuccess: (result) => ({
        type: ingredientsActions.CREATE_INGREDIENTS_SUCCESS,
        payload: result,
    }),
	createIngredientsFailure: (error) => ({
        type: ingredientsActions.CREATE_INGREDIENTS_FAILURE,
        payload: [],
        error,
    }),

    UPDATE_INGREDIENTS_REQUEST:	'UPDATE_INGREDIENTS_REQUEST',
	UPDATE_INGREDIENTS_SUCCESS:	'UPDATE_INGREDIENTS_SUCCESS',
	UPDATE_INGREDIENTS_FAILURE:	'UPDATE_INGREDIENTS_FAILURE',

    updateIngredientsRequest: (params) => ({
        type: ingredientsActions.UPDATE_INGREDIENTS_REQUEST,
		params
    }),
	updateIngredientsSuccess: (result) => ({
        type: ingredientsActions.UPDATE_INGREDIENTS_SUCCESS,
        payload: result,
    }),
	updateIngredientsFailure: (error) => ({
        type: ingredientsActions.UPDATE_INGREDIENTS_FAILURE,
        payload: [],
        error,
    }),

    DELETE_INGREDIENTS_REQUEST:	'DELETE_INGREDIENTS_REQUEST',
	DELETE_INGREDIENTS_SUCCESS:	'DELETE_INGREDIENTS_SUCCESS',
	DELETE_INGREDIENTS_FAILURE:	'DELETE_INGREDIENTS_FAILURE',

    deleteIngredientsRequest: (params) => ({
        type: ingredientsActions.DELETE_INGREDIENTS_REQUEST,
		params
    }),
	deleteIngredientsSuccess: (result) => ({
        type: ingredientsActions.DELETE_INGREDIENTS_SUCCESS,
        payload: result,
    }),
	deleteIngredientsFailure: (error) => ({
        type: ingredientsActions.DELETE_INGREDIENTS_FAILURE,
        payload: [],
        error,
    }),

	SET_TOUR: 'INGREDIENTS/SET_TOUR',

	setTour: (tour) => ({
		type: ingredientsActions.SET_TOUR,
		tour
	}),

	SELECT_INGREDIENT: 'SELECT_INGREDIENT',

	selectIngredient: (ingredient) => ({
		type: ingredientsActions.SELECT_INGREDIENT,
		ingredient
	}),

};

export default ingredientsActions;
