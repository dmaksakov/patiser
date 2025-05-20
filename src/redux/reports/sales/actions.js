const salesReportsActions = {

	GET_SALES_CHART_REQUEST: 'GET_SALES_CHART_REQUEST',
	GET_SALES_CHART_SUCCESS: 'GET_SALES_CHART_SUCCESS',
	GET_SALES_CHART_FAILURE: 'GET_SALES_CHART_FAILURE',

	GET_SALES_OPTIONS_REQUEST: 'GET_SALES_OPTIONS_REQUEST',
	GET_SALES_OPTIONS_SUCCESS: 'GET_SALES_OPTIONS_SUCCESS',
	GET_SALES_OPTIONS_FAILURE: 'GET_SALES_OPTIONS_FAILURE',
	GET_SALES_PARAMS_CHANGE: 'GET_SALES_PARAMS_CHANGE',
	GET_SALES_GROUP_BY_CHANGE: 'GET_SALES_GROUP_BY_CHANGE',

	getSalesParamsChange: (params) => ({
		type: salesReportsActions.GET_SALES_PARAMS_CHANGE,
		params,
	}),

	getSalesGroupByChange: (params) => ({
		type: salesReportsActions.GET_SALES_GROUP_BY_CHANGE,
		params,
	}),

	getSalesOptionsRequest: (params) => ({
		type: salesReportsActions.GET_SALES_OPTIONS_REQUEST,
		params,
	}),

	getSalesOptionsSuccess: (result) => ({
		type: salesReportsActions.GET_SALES_OPTIONS_SUCCESS,
		payload: result,
	}),
	getSalesOptionsFailure: (error) => ({
		type: salesReportsActions.GET_SALES_OPTIONS_FAILURE,
		payload: [],
		error,
	}),

	getSalesChartRequest: (params) => ({
		type: salesReportsActions.GET_SALES_CHART_REQUEST,
		params,
	}),
	getSalesChartSuccess: (result) => ({
		type: salesReportsActions.GET_SALES_CHART_SUCCESS,
		payload: result,
	}),
	getSalesChartFailure: (error) => ({
		type: salesReportsActions.GET_SALES_CHART_FAILURE,
		payload: [],
		error,
	}),

};

export default salesReportsActions;
