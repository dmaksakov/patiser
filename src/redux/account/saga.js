import {all, takeEvery, put, call} from 'redux-saga/effects';
import actions from './actions';
import authActons from "../auth/actions";
import {
    signup,
	forgotPassword,
	resetPassword,
	getProfile,
	updateProfile,
} from '../../helpers/api/signup.api';
import {callCheckingAuthentication} from '../../helpers/utility';
import errorActions from "../errors/actions";

export function* signupSaga(action) {
    try {
    	const {firstName,lastName,email,password,history,} = action.params;
        const response = yield callCheckingAuthentication(signup, {firstName,lastName,email,password});
		yield put(actions.signupSuccess(response.data));
		yield put(authActons.loginSuccess(response.data.token,history));
	} catch (e) {
        yield put(actions.signupFailure(e));
    }
}

export function* forgotPasswordSaga(action) {
    try {
        const response = yield callCheckingAuthentication(forgotPassword, action.username);
		yield put(actions.forgotPasswordSuccess(response.data));
		yield put(action.history.push('/email-sent'));
	} catch (e) {
        yield put(actions.forgotPasswordFailure(e));
    }
}

export function* resetPasswordSaga(action) {
    try {
		let {token,username,password,confirm_password, history} = action.params
        const response = yield callCheckingAuthentication(resetPassword, {token,username,password,confirm_password});
		yield put(actions.resetPasswordSuccess(response.data));
		yield put(history.push('/password-reset-success'));
	} catch (e) {
        yield put(actions.resetPasswordFailure(e));
    }
}

export function* getProfileSaga(action) {
    try {
        const response = yield callCheckingAuthentication(getProfile, {});
		yield put(actions.getProfileSuccess(response.data));
	} catch (e) {
        yield put(actions.getProfileFailure(e));
    }
}

export function* updateProfileSaga(action) {
    try {
        const response = yield callCheckingAuthentication(updateProfile, action.params);
		yield put(actions.updateProfileSuccess(response.data));
		yield put(errorActions.addNotification('Profile updated', 'The profile was successfully updated'));
	} catch (e) {
        yield put(actions.updateProfileFailure(e));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.SIGNUP_REQUEST, signupSaga),
        takeEvery(actions.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga),
        takeEvery(actions.RESET_PASSWORD_REQUEST, resetPasswordSaga),
        takeEvery(actions.GET_PROFILE_REQUEST, getProfileSaga),
        takeEvery(actions.UPDATE_PROFILE_REQUEST, updateProfileSaga),
    ]);
}
