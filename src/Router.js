import React, {lazy, Suspense, useEffect} from "react"
import {BrowserRouter, Redirect, Route, Router, Switch} from "react-router-dom"
import {connect} from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import {ContextLayout} from "./utility/context/Layout"
import {PUBLIC_PATH, NODE_ENV} from "./config";
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import errorActions from "./redux/errors/actions"
import commonActions from "./redux/common/actions";
import { history } from "./history";
import ReactGA from 'react-ga';

// if (NODE_ENV && NODE_ENV !== 'development') {
// 	history.listen(location => {
// 		ReactGA.set({ page: location.pathname })
// 		ReactGA.pageview(location.pathname)
// 	})
// }

const {
	setMobile,
} = commonActions

const {
	removeAllErrors,
	removeAllNotifications,
} = errorActions

// Route-based code splitting
const Home = lazy(() =>
	import("./views/pages/Home")
)
const Setup = lazy(() =>
	import("./views/pages/Setup")
)
const Ingredients = lazy(() =>
	import("./views/pages/ingredients/Ingredients")
)
const Customers = lazy(() =>
	import("./views/pages/customers/Customers")
)
const Orders = lazy(() =>
	import("./views/pages/orders/Orders")
)
const OrderDetails = lazy(() =>
	import("./views/pages/orders/orderDetails/OrderDetails")
)
const Recipes = lazy(() =>
	import("./views/pages/recipes/Recipes")
)
const RecipeDetails = lazy(() =>
	import("./views/pages/recipes/recipeDetails/RecipeDetails")
)
const ProductDetails = lazy(() =>
	import("./views/pages/products/productDetails/ProductDetails")
)
const ProductVariationDetails = lazy(() =>
	import("./views/pages/products/productDetails/variations/ProductVariationDetails")
)
const login = lazy(() =>
	import("./views/pages/authentication/login/Login")
)
const register = lazy(() =>
	import("./views/pages/authentication/register/Register")
)
const activate = lazy(() =>
	import("./views/pages/authentication/activate/Activate")
)
const forgot = lazy(() =>
	import("./views/pages/authentication/forgot/ForgotPassword")
)
const EmailSent = lazy(() =>
	import("./views/pages/EmailSent")
)
const ResetPasswordSuccess = lazy(() =>
	import("./views/pages/PasswordResetSuccess")
)
const ResetPassword = lazy(() =>
	import("./views/pages/authentication/forgot/ResetPassword")
)
const Profile = lazy(() =>
	import("./views/pages/Profile")
)
const EditProfile = lazy(() =>
	import("./views/pages/account/EditProfile")
)
const EditCompany = lazy(() =>
	import("./views/pages/account/EditCompany")
)
const Calendar = lazy(() =>
	import("./views/pages/calendar/Calendar")
)
const Products = lazy(() =>
	import("./views/pages/products/Products")
)
const ProductCategories = lazy(() =>
	import("./views/pages/products/categories/ProductCategories")
)

const TaxCategories = lazy(() =>
	import("./views/pages/taxes/TaxCategories")
)

const OrderReports = lazy(()=>
	import("./views/pages/reports/orders/OrderReports")
);

const SalesReports = lazy(()=>
	import("./views/pages/reports/sales/SalesReports")
);

const ProductsReports = lazy(()=>
	import("./views/pages/reports/products/ProductsReport")
);
const ProfitLossReport = lazy(()=>
	import("./views/pages/reports/profit_loss/ProfitLossReport")
);

const RestrictedRouteConfig = ({
							component: Component,
							isLoggedIn,
							fullLayout,
							permission,
							user,
							initialized,
							...rest
						}) => (
	<Route
		{...rest}
		render={props =>
			isLoggedIn ? (
				<ContextLayout.Consumer>
					{context => {
						let LayoutTag =
							fullLayout === true
								? context.fullLayout
								: context.state.activeLayout === "horizontal"
								? context.horizontalLayout
								: context.VerticalLayout

						return (
							<LayoutTag {...props} permission={props.user}>
								<Suspense fallback={<Spinner/>}>
									{initialized
										?
											<Component {...props} />
										:
											<Setup {...props} />
									}
								</Suspense>
							</LayoutTag>
						)
					}}
				</ContextLayout.Consumer>
			) : (
				<Redirect
					to={{
						pathname: `/login`,
						state: {from: props.location},
					}}
				/>
			)
		}
	/>
);

// Set Layout and Component Using App Route
const RouteConfig = ({
						 component: Component,
						 fullLayout,
						 permission,
						 user,
						 ...rest
					 }) => (
	<Route
		{...rest}
		render={props => {
			return (
				<ContextLayout.Consumer>
				 	{context => {
				 		let LayoutTag =
				 			fullLayout === true
				 				? context.fullLayout
				 				: context.state.activeLayout === "horizontal"
				 				? context.horizontalLayout
				 				: context.VerticalLayout
				 		return (
								<LayoutTag {...props} permission={props.user}>
									<Suspense fallback={<Spinner/>}>
										<Component {...props} />
									</Suspense>
								 </LayoutTag>
						)
					}}
				</ContextLayout.Consumer>
			)
		}}
	/>
)

const mapStateToProps = state => {
	return {
		user: state.auth.get('userRole'),
		isLoggedIn: state.auth.get('idToken') !== null && state.auth.get('idToken') !== undefined,
		initialized: state.account.toJS().profile.company.initialized,
		errors: state.errors.toJS().errors,
		showErrors: state.errors.toJS().showErrors,
		notifications: state.errors.toJS().notifications,
	}
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

const AppRouter = ({
					   history,
					   errors,
					   showErrors,
					   notifications,
					   removeAllErrors,
					   removeAllNotifications,
					   setMobile,
				}) => {

		useEffect(() => {

			const resize = () => {
				setMobile(window.innerWidth <= 760);
			}

			window.addEventListener("resize", resize)

			if (showErrors && errors) {
				errors.forEach(message => {
					NotificationManager.error(message.description, message.message)
				})
			}

			if (notifications) {
				notifications.forEach(message => {
					NotificationManager.success(message.description, message.message)
				})
			}

			if (showErrors && errors && errors.length > 0) {
				removeAllErrors()
			}
			if (notifications && notifications.length > 0) {
				removeAllNotifications()
			}

			return () => {
				window.removeEventListener("resize", resize);
			}
		})

		// useEffect(() => {
		// 	if (NODE_ENV && NODE_ENV !== 'development') {
		// 		ReactGA.pageview(window.location.pathname)
		// 	}
		// }, [])

		return (
			<BrowserRouter history={history} basename={PUBLIC_PATH}>

				<NotificationContainer/>

				<Switch>
					<RestrictedRoute
						exact
						path="/"
						component={Home}
					/>
					<RestrictedRoute
						path="/setup"
						component={Setup}
						fullLayout
					/>
					<AppRoute
						path="/login"
						component={login}
						fullLayout
					/>
					<AppRoute
						path="/register"
						component={register}
						fullLayout
					/>
					<AppRoute
						path="/account/activate"
						component={activate}
						fullLayout
					/>
					<AppRoute
						path="/forgot-password"
						component={forgot}
						fullLayout
					/>
					<AppRoute
						path="/email-sent"
						component={EmailSent}
						fullLayout
					/>
					<AppRoute
						path="/account/reset-password"
						component={ResetPassword}
						fullLayout
					/>
					<AppRoute
						path="/password-reset-success"
						component={ResetPasswordSuccess}
						fullLayout
					/>
					<RestrictedRoute
						path="/ingredients"
						component={Ingredients}
					/>
					<RestrictedRoute
						path="/recipes/:sid"
						component={RecipeDetails}
					/>
					<RestrictedRoute
						exact
						path="/recipes"
						component={Recipes}
					/>
					<RestrictedRoute
						exact
						path="/products/:pid/variations/:sid"
						component={ProductVariationDetails}
					/>
					<RestrictedRoute
						path="/products/categories"
						component={ProductCategories}
					/>
					<RestrictedRoute
						path="/taxes/categories"
						component={TaxCategories}
					/>
					<RestrictedRoute
						path="/products/:sid/:activeTab"
						component={ProductDetails}
					/>
					<RestrictedRoute
						path="/products/:sid"
						component={ProductDetails}
					/>
					<RestrictedRoute
						exact
						path="/products"
						component={Products}
					/>
					<RestrictedRoute
						path="/orders/:sid"
						component={OrderDetails}
					/>
					<RestrictedRoute
						exact
						path="/orders"
						component={Orders}
					/>
					<RestrictedRoute
						path="/customers"
						component={Customers}
					/>
					<RestrictedRoute
						exact
						path="/account/profile"
						component={Profile}
					/>
					<RestrictedRoute
						path="/account/profile/edit"
						component={EditProfile}
					/>
					<RestrictedRoute
						path="/account/company/edit"
						component={EditCompany}
					/>
					<RestrictedRoute
						path="/account/calendar"
						component={Calendar}
					/>

					{/* ------------------------------Reporting----------------------------------*/}
					<RestrictedRoute
						path="/reports/orders"
						component={OrderReports}
					/>
					<RestrictedRoute
						path="/reports/sales"
						component={SalesReports}
					/>
					<RestrictedRoute
						path="/reports/products"
						component={ProductsReports}
					/>
					<RestrictedRoute
						path="/reports/profit-loss"
						component={ProfitLossReport}
					/>

				</Switch>
			</BrowserRouter>
		)
	}

const RestrictedRoute = connect(mapStateToProps)(RestrictedRouteConfig)
export default connect(mapStateToProps, {
	removeAllErrors,
	removeAllNotifications,
	setMobile,
})(AppRouter)
