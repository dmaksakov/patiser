const companyActions = {

    GET_COMPANY_REQUEST: 'GET_COMPANY_REQUEST',
	GET_COMPANY_SUCCESS: 'GET_COMPANY_SUCCESS',
	GET_COMPANY_FAILURE: 'GET_COMPANY_FAILURE',

    getCompanyRequest: () => ({
        type: companyActions.GET_COMPANY_REQUEST,
    }),
	getCompanySuccess: (result) => ({
        type: companyActions.GET_COMPANY_SUCCESS,
        payload: result,
    }),
	getCompanyFailure: (error) => ({
        type: companyActions.GET_COMPANY_FAILURE,
        payload: [],
        error,
    }),

    UPDATE_COMPANY_REQUEST:	'UPDATE_COMPANY_REQUEST',
	UPDATE_COMPANY_SUCCESS:	'UPDATE_COMPANY_SUCCESS',
	UPDATE_COMPANY_FAILURE:	'UPDATE_COMPANY_FAILURE',

    updateCompanyRequest: (params, redirect = false) => ({
        type: companyActions.UPDATE_COMPANY_REQUEST,
		params,
		redirect
    }),
	updateCompanySuccess: (result) => ({
        type: companyActions.UPDATE_COMPANY_SUCCESS,
        payload: result,
    }),
	updateCompanyFailure: (error) => ({
        type: companyActions.UPDATE_COMPANY_FAILURE,
        payload: [],
        error,
    }),

    COMPANY_MEASURE_UNITS_REQUEST: 'COMPANY_MEASURE_UNITS_REQUEST',
	COMPANY_MEASURE_UNITS_SUCCESS: 'COMPANY_MEASURE_UNITS_SUCCESS',
	COMPANY_MEASURE_UNITS_FAILURE: 'COMPANY_MEASURE_UNITS_FAILURE',

    getCompanyMeasureUnits: () => ({
        type: companyActions.COMPANY_MEASURE_UNITS_REQUEST,
    }),
	getCompanyMeasureUnitsSuccess: (result) => ({
        type: companyActions.COMPANY_MEASURE_UNITS_SUCCESS,
        payload: result,
    }),
	getCompanyMeasureUnitsFailure: (error) => ({
        type: companyActions.COMPANY_MEASURE_UNITS_FAILURE,
        payload: [],
        error,
    }),

}

export default companyActions
