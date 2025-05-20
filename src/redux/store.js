import {createStore, applyMiddleware, compose, combineReducers} from "redux"
import createDebounce from "redux-debounced"
import thunk from "redux-thunk"
import reducers from "./reducers"
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../redux/sagas'
import {routerMiddleware, routerReducer} from "react-router-redux";
import { history } from "../history";

const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware, createDebounce()]

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose
const store = createStore(
	combineReducers({
		...reducers,
		router: routerReducer
	}),
	composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga);
export {store, history}
