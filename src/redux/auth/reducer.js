import {Map} from 'immutable'
import {getToken} from '../../helpers/utility'
import actions from './actions'

const initState = new Map({
	idToken: null,
	userRole: 'admin',
})

export default function authReducer(state = initState.merge(getToken()), action) {

	switch (action.type) {

		case actions.VERIFY_TOKEN_REQUEST:
			return state

		case actions.VERIFY_TOKEN_SUCCESS:
			return state

		case actions.VERIFY_TOKEN_FAILURE:
			return state

		case actions.FORGOT_PASSWORD_REQUEST:
			return state

		case actions.FORGOT_PASSWORD_SUCCESS:
			return state

		case actions.FORGOT_PASSWORD_FAILURE:
			return state

		case actions.LOGIN_SUCCESS:
			return state
				.set('idToken', action.token)

		case actions.LOGIN_ERROR:
			return state
				.set('error', action.error)

		case actions.LOGOUT:
			return state
				.set('idToken', null)

		default:
			return state
	}
}
