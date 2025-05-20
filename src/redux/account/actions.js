const accountActions = {

    SIGNUP_REQUEST:         'SIGNUP_REQUEST',
    SIGNUP_SUCCESS:         'SIGNUP_SUCCESS',
    SIGNUP_FAILURE:         'SIGNUP_FAILURE',
    RESET_SIGNUP_SUCCESS:   'RESET_SIGNUP_SUCCESS',

	signupRequest: (params) => ({
		type: accountActions.SIGNUP_REQUEST,
		params
	}),
    signupSuccess: (result) => ({
        type: accountActions.SIGNUP_SUCCESS,
        payload: result,
    }),
    signupFailure: (error) => ({
        type: accountActions.SIGNUP_FAILURE,
        payload: [],
        error,
    }),
    resetSignupSuccess: () => ({
       type: accountActions.RESET_SIGNUP_SUCCESS,
    }),

	FORGOT_PASSWORD_REQUEST:         'FORGOT_PASSWORD_REQUEST',
	FORGOT_PASSWORD_SUCCESS:         'FORGOT_PASSWORD_SUCCESS',
	FORGOT_PASSWORD_FAILURE:         'FORGOT_PASSWORD_FAILURE',

	forgotPasswordRequest: (username,history) => ({
    	type: accountActions.FORGOT_PASSWORD_REQUEST,
		username,
		history
	}),
	forgotPasswordSuccess: (result) => ({
		type: accountActions.FORGOT_PASSWORD_SUCCESS,
		payload: result,
	}),
	forgotPasswordFailure: (error) => ({
		type: accountActions.FORGOT_PASSWORD_FAILURE,
		payload: [],
		error,
	}),

	RESET_PASSWORD_REQUEST:		'RESET_PASSWORD_REQUEST',
	RESET_PASSWORD_SUCCESS:		'RESET_PASSWORD_SUCCESS',
	RESET_PASSWORD_FAILURE:		'RESET_PASSWORD_FAILURE',

	resetPasswordRequest: (params) => ({
    	type: accountActions.RESET_PASSWORD_REQUEST,
		params
	}),
	resetPasswordSuccess: (result) => ({
		type: accountActions.RESET_PASSWORD_SUCCESS,
		payload: result,
	}),
	resetPasswordFailure: (error) => ({
		type: accountActions.RESET_PASSWORD_FAILURE,
		payload: [],
		error,
	}),

	GET_PROFILE_REQUEST:	'GET_PROFILE_REQUEST',
	GET_PROFILE_SUCCESS:	'GET_PROFILE_SUCCESS',
	GET_PROFILE_FAILURE:	'GET_PROFILE_FAILURE',

	getProfileRequest: () => ({
    	type: accountActions.GET_PROFILE_REQUEST
	}),
	getProfileSuccess: (result) => ({
		type: accountActions.GET_PROFILE_SUCCESS,
		payload: result,
	}),
	getProfileFailure: (error) => ({
		type: accountActions.GET_PROFILE_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_PROFILE_REQUEST:	'UPDATE_PROFILE_REQUEST',
	UPDATE_PROFILE_SUCCESS:	'UPDATE_PROFILE_SUCCESS',
	UPDATE_PROFILE_FAILURE:	'UPDATE_PROFILE_FAILURE',

	updateProfileRequest: (params) => ({
    	type: accountActions.UPDATE_PROFILE_REQUEST,
		params
	}),
	updateProfileSuccess: (result) => ({
		type: accountActions.UPDATE_PROFILE_SUCCESS,
		payload: result,
	}),
	updateProfileFailure: (error) => ({
		type: accountActions.UPDATE_PROFILE_FAILURE,
		payload: [],
		error,
	}),
};

export default accountActions;
