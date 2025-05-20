import {all} from 'redux-saga/effects';
import authSagas from './auth/saga';
import errorSagas from './errors/saga';
import accountSagas from './account/saga'
import customerSagas from './customers/saga'
import companySagas from './company/saga'
import ingredientSagas from './ingredients/saga'
import productSagas from './products/saga'
import categorySagas from './categories/saga'
import orderSagas from './orders/saga'
import recipeSagas from './recipes/saga'
import commonSagas from './common/saga'
import calendarSagas from './calendar/saga'
import variationSagas from './variations/saga'
import dashboardSagas from './dashboard/saga'
import reportsOrdersSagas from './reports/orders/saga'
import reportsSalesSagas from './reports/sales/saga'
import taxSagas from './taxes/saga'

export default function* rootSaga(getState) {
	yield all([
		authSagas(),
		errorSagas(),
		accountSagas(),
		customerSagas(),
		companySagas(),
		ingredientSagas(),
		productSagas(),
		categorySagas(),
		orderSagas(),
		recipeSagas(),
		commonSagas(),
		calendarSagas(),
		variationSagas(),
		dashboardSagas(),
		reportsOrdersSagas(),
		reportsSalesSagas(),
		taxSagas(),
	]);
}
