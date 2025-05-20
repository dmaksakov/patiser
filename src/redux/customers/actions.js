const customerActions = {

    GET_CUSTOMERS_REQUEST: 'GET_CUSTOMERS_REQUEST',
	GET_CUSTOMERS_SUCCESS: 'GET_CUSTOMERS_SUCCESS',
	GET_CUSTOMERS_FAILURE: 'GET_CUSTOMERS_FAILURE',

	GET_CUSTOMERS_DEBOUNCE: 'GET_CUSTOMERS_DEBOUNCE',
	SET_SIDEBAR: 'SET_SIDEBAR',

	SET_PAGE_PARAMS: 'CUSTOMERS/SET_PAGE_PARAMS',

	GET_ALL_CUSTOMERS_REQUEST: 'GET_ALL_CUSTOMERS_REQUEST',
	GET_ALL_CUSTOMERS_SUCCESS: 'GET_ALL_CUSTOMERS_SUCCESS',
	GET_ALL_CUSTOMERS_FAILURE: 'GET_ALL_CUSTOMERS_FAILURE',

	getAllCustomersRequest: () => ({
		type: customerActions.GET_ALL_CUSTOMERS_REQUEST
	}),
	getAllCustomersSuccess: (result) => ({
		type: customerActions.GET_ALL_CUSTOMERS_SUCCESS,
		payload: result,
	}),
	getAllCustomersFailure: (error) => ({
		type: customerActions.GET_ALL_CUSTOMERS_FAILURE,
		payload: [],
		error,
	}),

	setPageParams: (params) => ({
		type: customerActions.SET_PAGE_PARAMS,
		params
	}),

	setSidebar: (boolean) => ({
		type: customerActions.SET_SIDEBAR,
		boolean
	}),

	getCustomersRequest: (params) => ({
        type: customerActions.GET_CUSTOMERS_REQUEST,
		params,
    }),
	getCustomersDebounce: (params) => ({
		type: customerActions.GET_CUSTOMERS_DEBOUNCE,
		params,
	}),
	getCustomersSuccess: (result) => ({
        type: customerActions.GET_CUSTOMERS_SUCCESS,
        payload: result,
    }),
	getCustomersFailure: (error) => ({
        type: customerActions.GET_CUSTOMERS_FAILURE,
        payload: [],
        error,
    }),

    CREATE_CUSTOMERS_REQUEST: 'CREATE_CUSTOMERS_REQUEST',
	CREATE_CUSTOMERS_SUCCESS: 'CREATE_CUSTOMERS_SUCCESS',
	CREATE_CUSTOMERS_FAILURE: 'CREATE_CUSTOMERS_FAILURE',

    createCustomersRequest: (params) => ({
        type: customerActions.CREATE_CUSTOMERS_REQUEST,
		params
    }),
	createCustomersSuccess: (result) => ({
        type: customerActions.CREATE_CUSTOMERS_SUCCESS,
        payload: result,
    }),
	createCustomersFailure: (error) => ({
        type: customerActions.CREATE_CUSTOMERS_FAILURE,
        payload: [],
        error,
    }),

    UPDATE_CUSTOMERS_REQUEST: 'UPDATE_CUSTOMERS_REQUEST',
	UPDATE_CUSTOMERS_SUCCESS: 'UPDATE_CUSTOMERS_SUCCESS',
	UPDATE_CUSTOMERS_FAILURE: 'UPDATE_CUSTOMERS_FAILURE',

    updateCustomersRequest: (params) => ({
        type: customerActions.UPDATE_CUSTOMERS_REQUEST,
		params
    }),
	updateCustomersSuccess: (result) => ({
        type: customerActions.UPDATE_CUSTOMERS_SUCCESS,
        payload: result,
    }),
	updateCustomersFailure: (error) => ({
        type: customerActions.UPDATE_CUSTOMERS_FAILURE,
        payload: [],
        error,
    }),

    GET_CUSTOMER_DETAILS_REQUEST: 'GET_CUSTOMER_DETAILS_REQUEST',
	GET_CUSTOMER_DETAILS_SUCCESS: 'GET_CUSTOMER_DETAILS_SUCCESS',
	GET_CUSTOMER_DETAILS_FAILURE: 'GET_CUSTOMER_DETAILS_FAILURE',

    getCustomerDetailsRequest: (params) => ({
        type: customerActions.GET_CUSTOMER_DETAILS_REQUEST,
		params
    }),
	getCustomerDetailsSuccess: (result) => ({
        type: customerActions.GET_CUSTOMER_DETAILS_SUCCESS,
        payload: result,
    }),
	getCustomerDetailsFailure: (error) => ({
        type: customerActions.GET_CUSTOMER_DETAILS_FAILURE,
        payload: [],
        error,
    }),

    DELETE_CUSTOMER_REQUEST: 'DELETE_CUSTOMER_REQUEST',
	DELETE_CUSTOMER_SUCCESS: 'DELETE_CUSTOMER_SUCCESS',
	DELETE_CUSTOMER_FAILURE: 'DELETE_CUSTOMER_FAILURE',

    deleteCustomerRequest: (params) => ({
        type: customerActions.DELETE_CUSTOMER_REQUEST,
		params
    }),
	deleteCustomerSuccess: (result) => ({
        type: customerActions.DELETE_CUSTOMER_SUCCESS,
        payload: result,
    }),
	deleteCustomerFailure: (error) => ({
        type: customerActions.DELETE_CUSTOMER_FAILURE,
        payload: [],
        error,
    }),

	SELECT_CUSTOMER: 'SELECT_CUSTOMER',

	selectCustomer: (customer) => ({
		type: customerActions.SELECT_CUSTOMER,
		customer
	}),

}

export default customerActions
