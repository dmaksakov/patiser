const orderActions = {

    GET_ORDERS_REQUEST: 'GET_ORDERS_REQUEST',
	GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS',
	GET_ORDERS_FAILURE: 'GET_ORDERS_FAILURE',
	GET_ORDERS_DEBOUNCE: 'GET_ORDERS_DEBOUNCE',
	SET_SIDEBAR: 'SET_SIDEBAR',

	SET_PAGE_PARAMS: 'ORDERS/SET_PAGE_PARAMS',

	SET_TOUR: 'ORDERS/SET_TOUR',

	setTour: (tour) => ({
		type: orderActions.SET_TOUR,
		tour
	}),

	SET_DETAILS_TOUR: 'ORDERS/SET_DETAILS_TOUR',

	setDetailsTour: (tour) => ({
		type: orderActions.SET_DETAILS_TOUR,
		tour
	}),

	setPageParams: (params) => ({
		type: orderActions.SET_PAGE_PARAMS,
		params
	}),

	setSidebar: (boolean, sidebar = 'sidebar') => ({
		type: orderActions.SET_SIDEBAR,
		sidebar,
		boolean,
	}),

    getOrders: (params) => ({
        type: orderActions.GET_ORDERS_REQUEST,
		params
    }),
	getOrdersDebounce: (params) => ({
		type: orderActions.GET_ORDERS_DEBOUNCE,
		params,
	}),
	getOrdersSuccess: (result) => ({
        type: orderActions.GET_ORDERS_SUCCESS,
        payload: result,
    }),
	getOrdersFailure: (error) => ({
        type: orderActions.GET_ORDERS_FAILURE,
        payload: [],
        error,
    }),

    CREATE_ORDERS_REQUEST: 'CREATE_ORDERS_REQUEST',
	CREATE_ORDERS_SUCCESS: 'CREATE_ORDERS_SUCCESS',
	CREATE_ORDERS_FAILURE: 'CREATE_ORDERS_FAILURE',

    createOrder: (params) => ({
        type: orderActions.CREATE_ORDERS_REQUEST,
		params
    }),
	createOrdersSuccess: (result) => ({
        type: orderActions.CREATE_ORDERS_SUCCESS,
        payload: result,
    }),
	createOrdersFailure: (error) => ({
        type: orderActions.CREATE_ORDERS_FAILURE,
        payload: [],
        error,
    }),

    COMPLETE_ORDERS_REQUEST: 'COMPLETE_ORDERS_REQUEST',
	COMPLETE_ORDERS_SUCCESS: 'COMPLETE_ORDERS_SUCCESS',
	COMPLETE_ORDERS_FAILURE: 'COMPLETE_ORDERS_FAILURE',

    completeOrder: (params) => ({
        type: orderActions.COMPLETE_ORDERS_REQUEST,
		params
    }),
	completeOrdersSuccess: (result) => ({
        type: orderActions.COMPLETE_ORDERS_SUCCESS,
        payload: result,
    }),
	completeOrdersFailure: (error) => ({
        type: orderActions.COMPLETE_ORDERS_FAILURE,
        payload: [],
        error,
    }),

    UPDATE_ORDERS_REQUEST: 'UPDATE_ORDERS_REQUEST',
	UPDATE_ORDERS_SUCCESS: 'UPDATE_ORDERS_SUCCESS',
	UPDATE_ORDERS_FAILURE: 'UPDATE_ORDERS_FAILURE',

    updateOrder: (params) => ({
        type: orderActions.UPDATE_ORDERS_REQUEST,
		params
    }),
	updateOrdersSuccess: (result) => ({
        type: orderActions.UPDATE_ORDERS_SUCCESS,
        payload: result,
    }),
	updateOrdersFailure: (error) => ({
        type: orderActions.UPDATE_ORDERS_FAILURE,
        payload: [],
        error,
    }),

    SCHEDULE_ORDERS_REQUEST: 'SCHEDULE_ORDERS_REQUEST',
	SCHEDULE_ORDERS_SUCCESS: 'SCHEDULE_ORDERS_SUCCESS',
	SCHEDULE_ORDERS_FAILURE: 'SCHEDULE_ORDERS_FAILURE',

    scheduleOrder: (params) => ({
        type: orderActions.SCHEDULE_ORDERS_REQUEST,
		params
    }),
	scheduleOrdersSuccess: (result) => ({
        type: orderActions.SCHEDULE_ORDERS_SUCCESS,
        payload: result,
    }),
	scheduleOrdersFailure: (error) => ({
        type: orderActions.SCHEDULE_ORDERS_FAILURE,
        payload: [],
        error,
    }),

    SET_ORDER_DISCOUNT_REQUEST: 'SET_ORDER_DISCOUNT_REQUEST',
	SET_ORDER_DISCOUNT_SUCCESS: 'SET_ORDER_DISCOUNT_SUCCESS',
	SET_ORDER_DISCOUNT_FAILURE: 'SET_ORDER_DISCOUNT_FAILURE',

    setOrderDiscount: (params) => ({
        type: orderActions.SET_ORDER_DISCOUNT_REQUEST,
		params
    }),
	setOrderDiscountSuccess: (result) => ({
        type: orderActions.SET_ORDER_DISCOUNT_SUCCESS,
        payload: result,
    }),
	setOrderDiscountFailure: (error) => ({
        type: orderActions.SET_ORDER_DISCOUNT_FAILURE,
        payload: [],
        error,
    }),

    GET_ORDER_DETAILS_REQUEST: 'GET_ORDER_DETAILS_REQUEST',
	GET_ORDER_DETAILS_SUCCESS: 'GET_ORDER_DETAILS_SUCCESS',
	GET_ORDER_DETAILS_FAILURE: 'GET_ORDER_DETAILS_FAILURE',

    getOrderDetails: (params) => ({
        type: orderActions.GET_ORDER_DETAILS_REQUEST,
		params
    }),
	getOrderDetailsSuccess: (result) => ({
        type: orderActions.GET_ORDER_DETAILS_SUCCESS,
        payload: result,
    }),
	getOrderDetailsFailure: (error) => ({
        type: orderActions.GET_ORDER_DETAILS_FAILURE,
        payload: [],
        error,
    }),

    DELETE_ORDER_REQUEST:	'DELETE_ORDER_REQUEST',
	DELETE_ORDER_SUCCESS:	'DELETE_ORDER_SUCCESS',
	DELETE_ORDER_FAILURE:	'DELETE_ORDER_FAILURE',

    deleteOrder: (params) => ({
        type: orderActions.DELETE_ORDER_REQUEST,
		params
    }),
	deleteOrderSuccess: (result) => ({
        type: orderActions.DELETE_ORDER_SUCCESS,
        payload: result,
    }),
	deleteOrderFailure: (error) => ({
        type: orderActions.DELETE_ORDER_FAILURE,
        payload: [],
        error,
    }),

	SELECT_ORDER:	'SELECT_ORDER',

	selectOrder: (order) => ({
		type: orderActions.SELECT_ORDER,
		order
	}),

	////////////////////////////////////////////
	//// ORDER ITEMS
	////////////////////////////////////////////

	GET_ORDER_ITEMS_REQUEST: 'GET_ORDER_ITEMS_REQUEST',
	GET_ORDER_ITEMS_SUCCESS: 'GET_ORDER_ITEMS_SUCCESS',
	GET_ORDER_ITEMS_FAILURE: 'GET_ORDER_ITEMS_FAILURE',

	getOrderItems: (params) => ({
		type: orderActions.GET_ORDER_ITEMS_REQUEST,
		params
	}),
	getOrderItemsSuccess: (result) => ({
		type: orderActions.GET_ORDER_ITEMS_SUCCESS,
		payload: result,
	}),
	getOrderItemsFailure: (error) => ({
		type: orderActions.GET_ORDER_ITEMS_FAILURE,
		payload: [],
		error,
	}),

	CREATE_ORDER_ITEM_REQUEST: 'CREATE_ORDER_ITEM_REQUEST',
	CREATE_ORDER_ITEM_SUCCESS: 'CREATE_ORDER_ITEM_SUCCESS',
	CREATE_ORDER_ITEM_FAILURE: 'CREATE_ORDER_ITEM_FAILURE',

	createOrderItem: (params) => ({
		type: orderActions.CREATE_ORDER_ITEM_REQUEST,
		params
	}),
	createOrderItemSuccess: (result) => ({
		type: orderActions.CREATE_ORDER_ITEM_SUCCESS,
		payload: result,
	}),
	createOrderItemFailure: (error) => ({
		type: orderActions.CREATE_ORDER_ITEM_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_ORDER_ITEM_REQUEST: 'UPDATE_ORDER_ITEM_REQUEST',
	UPDATE_ORDER_ITEM_SUCCESS: 'UPDATE_ORDER_ITEM_SUCCESS',
	UPDATE_ORDER_ITEM_FAILURE: 'UPDATE_ORDER_ITEM_FAILURE',

	updateOrderItem: (params) => ({
		type: orderActions.UPDATE_ORDER_ITEM_REQUEST,
		params
	}),
	updateOrderItemSuccess: (result) => ({
		type: orderActions.UPDATE_ORDER_ITEM_SUCCESS,
		payload: result,
	}),
	updateOrderItemFailure: (error) => ({
		type: orderActions.UPDATE_ORDER_ITEM_FAILURE,
		payload: [],
		error,
	}),

	DELETE_ORDER_ITEM_REQUEST:	'DELETE_ORDER_ITEM_REQUEST',
	DELETE_ORDER_ITEM_SUCCESS:	'DELETE_ORDER_ITEM_SUCCESS',
	DELETE_ORDER_ITEM_FAILURE:	'DELETE_ORDER_ITEM_FAILURE',

	deleteOrderItem: (params) => ({
		type: orderActions.DELETE_ORDER_ITEM_REQUEST,
		params
	}),
	deleteOrderItemSuccess: (result) => ({
		type: orderActions.DELETE_ORDER_ITEM_SUCCESS,
		payload: result,
	}),
	deleteOrderItemFailure: (error) => ({
		type: orderActions.DELETE_ORDER_ITEM_FAILURE,
		payload: [],
		error,
	}),

	SELECT_ORDER_ITEM: 'SELECT_ORDER_ITEM',

	selectOrderItem: (orderItem) => ({
		type: orderActions.SELECT_ORDER_ITEM,
		orderItem
	}),

	SELECT_DISCOUNT: 'SELECT_DISCOUNT',

	selectDiscount: (discount) => ({
		type: orderActions.SELECT_DISCOUNT,
		discount
	}),


};

export default orderActions;
