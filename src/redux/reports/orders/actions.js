const orderReportsActions = {

	GET_ORDERS_CHART_REQUEST: 'GET_ORDERS_CHART_REQUEST',
	GET_ORDERS_CHART_SUCCESS: 'GET_ORDERS_CHART_SUCCESS',
	GET_ORDERS_CHART_FAILURE: 'GET_ORDERS_CHART_FAILURE',

	GET_ORDERS_OPTIONS_REQUEST: 'GET_ORDERS_OPTIONS_REQUEST',
	GET_ORDERS_OPTIONS_SUCCESS: 'GET_ORDERS_OPTIONS_SUCCESS',
	GET_ORDERS_OPTIONS_FAILURE: 'GET_ORDERS_OPTIONS_FAILURE',
	GET_ORDERS_PARAMS_CHANGE: 'GET_ORDERS_PARAMS_CHANGE',
	GET_ORDERS_GROUP_BY_CHANGE: 'GET_ORDERS_GROUP_BY_CHANGE',

	getOrdersParamsChange: (params) => ({
		type: orderReportsActions.GET_ORDERS_PARAMS_CHANGE,
		params,
	}),

	getOrdersGroupByChange: (params) => ({
		type: orderReportsActions.GET_ORDERS_GROUP_BY_CHANGE,
		params,
	}),

	getOrdersOptionsRequest: (params) => ({
		type: orderReportsActions.GET_ORDERS_OPTIONS_REQUEST,
		params,
	}),

	getOrdersOptionsSuccess: (result) => ({
		type: orderReportsActions.GET_ORDERS_OPTIONS_SUCCESS,
		payload: result,
	}),
	getOrdersOptionsFailure: (error) => ({
		type: orderReportsActions.GET_ORDERS_OPTIONS_FAILURE,
		payload: [],
		error,
	}),

	getOrdersChartRequest: (params) => ({
		type: orderReportsActions.GET_ORDERS_CHART_REQUEST,
		params,
	}),
	getOrdersChartSuccess: (result) => ({
		type: orderReportsActions.GET_ORDERS_CHART_SUCCESS,
		payload: result,
	}),
	getOrdersChartFailure: (error) => ({
		type: orderReportsActions.GET_ORDERS_CHART_FAILURE,
		payload: [],
		error,
	}),

};

export default orderReportsActions;
