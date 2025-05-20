import {Map} from 'immutable'
import Cookies from 'universal-cookie';
import {put, call} from 'redux-saga/effects'
import errorActions from '../redux/errors/actions'
import authActions from '../redux/auth/actions'

const { updateSyncErrors } = require('redux-form/lib/actions').default;
const cookies = new Cookies();

export const getTourState = () => {
	let tour = cookies.get('Tour')

	if (tour) {
		return tour
	} else {
		return {}
	}

}

export const setTourState = (tour) => {
	cookies.set(
		'Tour',
		JSON.stringify({...getTourState(), ...tour}),
		{path: '/'}
	)
}

export function getViewport () {
	const width = Math.max(
		document.documentElement.clientWidth,
		window.innerWidth || 0
	)
	if (width <= 576) return 'xs'
	if (width <= 768) return 'sm'
	if (width <= 992) return 'md'
	if (width <= 1200) return 'lg'
	return 'xl'
}

export function clearToken() {
	localStorage.removeItem('id_token');
}

export const combineErrors = (storeErrors) => {
	let errors = {}
	storeErrors.forEach( error =>  {
		errors[error.message] = error.description
	})
	return errors
}

export function getToken() {
	try {
		const idToken = localStorage.getItem('id_token');
		return new Map({idToken});
	} catch (err) {
		clearToken();
		return new Map();
	}
}

export function* callCheckingAuthentication(fn, ...rest) {

	try {
		return yield call(fn, ...rest)
	} catch (e) {

		switch (e.response.status) {

			case 400:
			case 404:
			case 500:
				yield put(errorActions.addError('Error', e.response.data.error_message, false))
				break

			case 403:
				yield put(errorActions.addError('Error', e.response.data.error_message, false))
				// yield put(authActions.logout())
				// yield put(push('/signin'))
				break

			case 409:
				yield put(errorActions.addError('Error', e.response.data.hasOwnProperty('message') ? e.response.data.message : e.response.data.error, false, 409))
				break

			case 401:
				//TODO - this is a band aid for now - will need to find more appropriate solution
				if (e.response.data.message === 'Invalid credentials.') {
					yield put(errorActions.resetAddError('Authentication Error', e.response.data.message, false))
				}
				yield put(authActions.logout())
				break

			case 422:
				// if (rest[0].hasOwnProperty('form') && e.response.data.hasOwnProperty('validation_errors')) {
				// 	let errors = {}
				// 	for (const field in e.response.data.validation_errors) {
				// 		let cleanField = field.includes('address') ? field.substring(field.indexOf('.') + 1) : field
				// 		errors = {
				// 			...errors,
				// 			[cleanField]: e.response.data.validation_errors[field][0]
				// 		}
				// 	}
				// 	//TODO - do not forget to uncomment
				// 	yield put(updateSyncErrors(rest[0].form, errors))
				// }
				// else
				if (e.response.data.hasOwnProperty('validation_errors')) {
					for(const field in e.response.data.validation_errors) {
						yield put(errorActions.addError(field, e.response.data.validation_errors[field][0], false))
					}
				} else {
					yield put(errorActions.addError('Validation error', e.response.data, true))
				}
				break

			default:
				break
		}
	}
}
