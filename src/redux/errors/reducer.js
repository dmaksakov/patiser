import {fromJS} from 'immutable';
import errorActions from './actions';

const initState = new fromJS({
    errors: [],
    notifications: [],
    loadingIcon: false,
	showErrors: true,
});

const extractErrors = (header, error) => {

    if (error.hasOwnProperty('errors') && error.errors.length > 0) {
        let errors = [];
        error.errors.map((er) => {
            errors.push(er.field + ': ' + er.defaultMessage);
        });
        return [{type: 'error', message: 'Error', description: errors.join(', ')}];
    }

    if (error.hasOwnProperty('validation_errors')) {
        let errors = [];
        for (let prop in error.validation_errors) {
        	if (error.validation_errors.hasOwnProperty(prop)) {
				error.validation_errors[prop].forEach(er => {
					errors.push(
						{
							type: 'error',
							message: 'Validation error',
							description: prop + ': ' + er
						}
					)
				})
			}
		}
        return errors
    }
};

export default function ErrorReducer(state = initState, action) {

    switch (action.type) {

        case errorActions.ADD_ERROR:
            let data;
            if (!action.needExtract) {
                data = [...state.get('errors'), {
                    type: 'error',
                    message: action.header,
                    description: action.error,
                    status: action.status,
                }];
            }
            else {
                data = [...state.get('errors'), ...extractErrors(action.header, action.error)];
            }
            return state
                .set('errors', data);

        case errorActions.RESET_ADD_ERROR:
            return state
                .set('errors', [{
					type: 'error',
					message: action.header,
					description: action.error,
				}]);

        case errorActions.REMOVE_ALL_ERRORS:
            return state
                .set('errors', []);

        case errorActions.SET_LOADING_ICON:
            return state
                .set('loadingIcon', action.status);

        case errorActions.SET_SHOW_ERRORS:
            return state
                .set('showErrors', action.status);

        case errorActions.ADD_NOTIFICATION:
            return state
                .set('notifications', [...state.get('notifications'), {type: 'success', message: action.header, description: action.message}]);

        case errorActions.REMOVE_ALL_NOTIFICATIONS:
            return state
                .set('notifications', []);

        default:
            return state;
    }
}
