import {Map} from 'immutable';
import {getToken} from '../../helpers/utility';
import actions from './actions';

const initState = new Map({
    signupSuccess: false,
	loading: false,
	profile: {
    	company: {
			initialized: true,
		}
	},
});

export default function accountReducer(state = initState.merge(getToken()), action) {

    switch (action.type) {

        case actions.SIGNUP_REQUEST:
            return state
                .set('loading', true);

        case actions.SIGNUP_SUCCESS:
            return state
                .set('loading', false)
                .set('signupSuccess', true);

        case actions.SIGNUP_FAILURE:
            return state
                .set('loading', false)
                .set('signupError', action.error);

        case actions.RESET_SIGNUP_SUCCESS:
            return state
                .set('signupSuccess', false);

		case actions.FORGOT_PASSWORD_REQUEST:
			return state
				.set('loading', true);

		case actions.FORGOT_PASSWORD_SUCCESS:
			return state
				.set('loading', false)

		case actions.FORGOT_PASSWORD_FAILURE:
			return state
				.set('loading', false)

		case actions.RESET_PASSWORD_REQUEST:
			return state
				.set('loading', true);

		case actions.RESET_PASSWORD_SUCCESS:
			return state
				.set('loading', false)

		case actions.RESET_PASSWORD_FAILURE:
			return state
				.set('loading', false)


		case actions.GET_PROFILE_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_PROFILE_SUCCESS:
			return state
				.set('loading', false)
				.set('profile', action.payload)

		case actions.GET_PROFILE_FAILURE:
			return state
				.set('loading', false)


		case actions.UPDATE_PROFILE_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_PROFILE_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_PROFILE_FAILURE:
			return state
				.set('loading', false)

        default:
            return state;
    }
}
