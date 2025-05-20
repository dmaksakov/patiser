import customizer from "./customizer/reducer"
import auth from "./auth/reducer"
import navbar from "./navbar/reducer"
import errors from "./errors/reducer"
import account from "./account/reducer"
import company from "./company/reducer"
import customers from "./customers/reducer"
import ingredients from "./ingredients/reducer"
import recipes from "./recipes/reducer"
import products from "./products/reducer"
import categories from "./categories/reducer"
import taxes from "./taxes/reducer"
import orders from "./orders/reducer"
import common from "./common/reducer"
import calendar from "./calendar/reducer"
import variation from "./variations/reducer"
import {dashboardInsightsReducer as insights, dashboardUpcomingOrdersReducer as upcoming} from "./dashboard/reducer"
import  reports from "./reports/reducer"
import { reducer as reduxFormReducer } from 'redux-form'

export default {
	customizer,
	auth,
	navbar,
	errors,
	account,
	company,
	customers,
	ingredients,
	recipes,
	products,
	categories,
	orders,
	form: reduxFormReducer,
	common,
	calendar,
	variation,
	dashboardInsights: insights,
	dashboardUpcoming: upcoming,
	reports,
	taxes,
}
