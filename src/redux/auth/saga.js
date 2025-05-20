import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { clearToken } from '../../helpers/utility';
import actions from './actions';
import Cookies from 'universal-cookie';
import { callCheckingAuthentication } from '../../helpers/utility';
import { API_URL, COOKIE_DOMAIN } from '../../config';
import axios from 'axios';
import {verifyToken} from "../../helpers/api/userActivate.api";
import accountActions from "../account/actions";

const cookies = new Cookies();

export function fetchPostsApi(payload, path) {

	let url = API_URL + path;
	return axios.post(url, payload);
}

export function* loginRequest() {

	yield takeEvery('LOGIN_REQUEST', function* (payload) {

		const data = {'username': payload.username, 'password': payload.password};
		const apiResponse = yield callCheckingAuthentication(fetchPostsApi, data, 'account/login');

		if (apiResponse !== undefined && apiResponse.hasOwnProperty('data')) {
			yield put({
				type: actions.LOGIN_SUCCESS,
				token: apiResponse.data.token,
				history:payload.history,
				profile: 'Profile'
			});
		} else {
			yield put({type: actions.LOGIN_ERROR, error: true});
		}
	});
}

export function* loginSuccess() {

	yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
		yield  localStorage.setItem('id_token', payload.token);
		yield  payload.history.push('/');
	});
}

export function* loginError() {

	yield takeEvery(actions.LOGIN_ERROR, function* () {
		// notification('destroy');
		// notification('error', 'Login error!', 'Please check your username and password.');
	});
}

export function* logout() {

	yield takeEvery(actions.LOGOUT, function* () {
		clearToken();
		// yield call(history.push, '/');
	});
}

export function* verifyTokenSaga(action) {
	try {
		const response = yield callCheckingAuthentication(verifyToken, action.token);
		yield put(actions.verifyTokenSuccess(response.data));
		yield put(accountActions.getProfileRequest());
		yield put(action.history.push('/'));
	} catch (e) {
		yield put(actions.verifyTokenFailure(e));
		yield put(action.history.push('/'));
	}
}

export default function* rootSaga() {

	yield all([
		fork(loginRequest),
		fork(loginSuccess),
		fork(loginError),
		fork(logout),
		// fork(verifyTokenSaga),
		takeEvery(actions.VERIFY_TOKEN_REQUEST, verifyTokenSaga),
		// takeEvery(actions.FORGOT_PASSWORD_REQUEST, forgotPasswordRequestSaga),
		// takeEvery(actions.RESET_PASSWORD_REQUEST, resetPasswordRequestSaga),
	]);
}
