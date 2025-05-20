const authActons = {

	LOGIN_REQUEST: 'LOGIN_REQUEST',
	LOGOUT: 'LOGOUT',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_ERROR: 'LOGIN_ERROR',

	VERIFY_TOKEN_REQUEST: 'VERIFY_TOKEN_REQUEST',
	VERIFY_TOKEN_SUCCESS: 'VERIFY_TOKEN_SUCCESS',
	VERIFY_TOKEN_FAILURE: 'VERIFY_TOKEN_FAILURE',

	FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST',
	FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
	FORGOT_PASSWORD_FAILURE: 'FORGOT_PASSWORD_FAILURE',

	VERIFY_FORGOT_TOKEN_REQUEST: 'VERIFY_FORGOT_TOKEN_REQUEST',
	VERIFY_FORGOT_TOKEN_SUCCESS: 'VERIFY_FORGOT_TOKEN_SUCCESS',
	VERIFY_FORGOT_TOKEN_FAILURE: 'VERIFY_FORGOT_TOKEN_FAILURE',

	RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST',
	RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
	RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',

	REGISTER_ACCOUNT_REQUEST: 'REGISTER_ACCOUNT_REQUEST',
	REGISTER_ACCOUNT_SUCCESS: 'REGISTER_ACCOUNT_SUCCESS',
	REGISTER_ACCOUNT_FAILURE: 'REGISTER_ACCOUNT_FAILURE',

	registerAccountRequest: (params) => ({
		type: authActons.REGISTER_ACCOUNT_REQUEST,
		params
	}),

	resetPasswordRequest: (params) => ({
		type: authActons.RESET_PASSWORD_REQUEST,
		params
	}),

	resetPasswordSuccess: () => ({
		type: authActons.RESET_PASSWORD_SUCCESS
	}),

	resetPasswordFailure: () => ({
		type: authActons.RESET_PASSWORD_FAILURE
	}),

	verifyForgotTokenRequest: (token) => ({
		type: authActons.VERIFY_FORGOT_TOKEN_REQUEST,
		token: token
	}),

	verifyForgotTokenSuccess: () => ({
		type: authActons.VERIFY_FORGOT_TOKEN_SUCCESS
	}),

	verifyForgotTokenFailure: () => ({
		type: authActons.VERIFY_FORGOT_TOKEN_FAILURE
	}),


	forgotPasswordRequest: (email,history) => ({
		type: authActons.FORGOT_PASSWORD_REQUEST,
		email,
		history
	}),

	forgotPasswordSuccess: () => ({
		type: authActons.FORGOT_PASSWORD_SUCCESS
	}),

	forgotPasswordFailure: () => ({
		type: authActons.FORGOT_PASSWORD_FAILURE
	}),

	verifyTokenRequest: (token,history) => ({
		type: authActons.VERIFY_TOKEN_REQUEST,
		token,
		history
	}),

	verifyTokenSuccess: () => ({
		type: authActons.VERIFY_TOKEN_SUCCESS
	}),

	verifyTokenFailure: () => ({
		type: authActons.VERIFY_TOKEN_FAILURE
	}),

	login: (username, password, history) => ({
		type: authActons.LOGIN_REQUEST,
		username: username,
		password: password,
		history:history
	}),

	loginSuccess: (token,history) => ({
		type: authActons.LOGIN_SUCCESS,
		token,
		history,
	}),

	logout: () => ({
		type: authActons.LOGOUT,
	}),
};

export default authActons;
