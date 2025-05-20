const dashboardActions = {

	GET_INSIGHTS_REQUEST: 'GET_INSIGHTS_REQUEST',
	GET_INSIGHTS_SUCCESS: 'GET_INSIGHTS_SUCCESS',
	GET_INSIGHTS_FAILURE: 'GET_INSIGHTS_FAILURE',

	getInsightsRequest: (params) => ({
		type: dashboardActions.GET_INSIGHTS_REQUEST,
		params,
	}),
	getInsightsSuccess: (result) => ({
		type: dashboardActions.GET_INSIGHTS_SUCCESS,
		payload: result,
	}),
	getInsightsFailure: (error) => ({
		type: dashboardActions.GET_INSIGHTS_FAILURE,
		payload: [],
		error,
	}),

	GET_UPCOMING_REQUEST: 'GET_UPCOMING_REQUEST',
	GET_UPCOMING_SUCCESS: 'GET_UPCOMING_SUCCESS',
	GET_UPCOMING_FAILURE: 'GET_UPCOMING_FAILURE',

	getUpcomingRequest: (params) => ({
		type: dashboardActions.GET_UPCOMING_REQUEST,
		params,
	}),
	getUpcomingSuccess: (result) => ({
		type: dashboardActions.GET_UPCOMING_SUCCESS,
		payload: result,
	}),
	getUpcomingFailure: (error) => ({
		type: dashboardActions.GET_UPCOMING_FAILURE,
		payload: [],
		error,
	}),

};

export default dashboardActions;
