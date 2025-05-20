const commonActions = {

    SET_MOBILE:	'SET_MOBILE',

	setMobile: (mobile) => ({
		type: commonActions.SET_MOBILE,
		mobile
	}),

	GET_CURRENCIES_REQUEST:	'GET_CURRENCIES_REQUEST',
	GET_CURRENCIES_SUCCESS:	'GET_CURRENCIES_SUCCESS',
	GET_CURRENCIES_FAILURE:	'GET_CURRENCIES_FAILURE',

    getCurrenciesRequest: () => ({
        type: commonActions.GET_CURRENCIES_REQUEST,
    }),
	getCurrenciesSuccess: (result) => ({
        type: commonActions.GET_CURRENCIES_SUCCESS,
        payload: result,
    }),
	getCurrenciesFailure: (error) => ({
        type: commonActions.GET_CURRENCIES_FAILURE,
        payload: [],
        error,
    }),

    GET_COUNTRIES_REQUEST:	'GET_COUNTRIES_REQUEST',
	GET_COUNTRIES_SUCCESS:	'GET_COUNTRIES_SUCCESS',
	GET_COUNTRIES_FAILURE:	'GET_COUNTRIES_FAILURE',

    getCountriesRequest: () => ({
        type: commonActions.GET_COUNTRIES_REQUEST,
    }),
	getCountriesSuccess: (result) => ({
        type: commonActions.GET_COUNTRIES_SUCCESS,
        payload: result,
    }),
	getCountriesFailure: (error) => ({
        type: commonActions.GET_COUNTRIES_FAILURE,
        payload: [],
        error,
    }),

    GET_MEASURE_SYSTEMS_REQUEST:	'GET_MEASURE_SYSTEMS_REQUEST',
	GET_MEASURE_SYSTEMS_SUCCESS:	'GET_MEASURE_SYSTEMS_SUCCESS',
	GET_MEASURE_SYSTEMS_FAILURE:	'GET_MEASURE_SYSTEMS_FAILURE',

    getMeasureSystemRequest: () => ({
        type: commonActions.GET_MEASURE_SYSTEMS_REQUEST,
    }),
	getMeasureSystemSuccess: (result) => ({
        type: commonActions.GET_MEASURE_SYSTEMS_SUCCESS,
        payload: result,
    }),
	getMeasureSystemFailure: (error) => ({
        type: commonActions.GET_MEASURE_SYSTEMS_FAILURE,
        payload: [],
        error,
    }),

    GET_MEASURE_UNITS_DETAILS_REQUEST:	'GET_MEASURE_UNITS_DETAILS_REQUEST',
	GET_MEASURE_UNITS_DETAILS_SUCCESS:	'GET_MEASURE_UNITS_DETAILS_SUCCESS',
	GET_MEASURE_UNITS_DETAILS_FAILURE:	'GET_MEASURE_UNITS_DETAILS_FAILURE',

    getMeasureUnitDetails: (params, callBack) => ({
        type: commonActions.GET_MEASURE_UNITS_DETAILS_REQUEST,
		params,
		callBack
    }),
	getMeasureUnitDetailsSuccess: (result) => ({
        type: commonActions.GET_MEASURE_UNITS_DETAILS_SUCCESS,
        payload: result,
    }),
	getMeasureUnitDetailsFailure: (error) => ({
        type: commonActions.GET_MEASURE_UNITS_DETAILS_FAILURE,
        payload: [],
        error,
    }),

    GET_DISCOUNT_TYPES_REQUEST:	'GET_DISCOUNT_TYPES_REQUEST',
	GET_DISCOUNT_TYPES_SUCCESS:	'GET_DISCOUNT_TYPES_SUCCESS',
	GET_DISCOUNT_TYPES_FAILURE:	'GET_DISCOUNT_TYPES_FAILURE',

    getDiscountTypesRequest: () => ({
        type: commonActions.GET_DISCOUNT_TYPES_REQUEST,
    }),
	getDiscountTypesSuccess: (result) => ({
        type: commonActions.GET_DISCOUNT_TYPES_SUCCESS,
        payload: result,
    }),
	getDiscountTypesFailure: (error) => ({
        type: commonActions.GET_DISCOUNT_TYPES_FAILURE,
        payload: [],
        error,
    }),

    GET_ORDER_STATUSES_REQUEST:	'GET_ORDER_STATUSES_REQUEST',
	GET_ORDER_STATUSES_SUCCESS:	'GET_ORDER_STATUSES_SUCCESS',
	GET_ORDER_STATUSES_FAILURE:	'GET_ORDER_STATUSES_FAILURE',

    getOrderStatusesRequest: () => ({
        type: commonActions.GET_ORDER_STATUSES_REQUEST,
    }),
	getOrderStatusesSuccess: (result) => ({
        type: commonActions.GET_ORDER_STATUSES_SUCCESS,
        payload: result,
    }),
	getOrderStatusesFailure: (error) => ({
        type: commonActions.GET_ORDER_STATUSES_FAILURE,
        payload: [],
        error,
    }),
};

export default commonActions;
