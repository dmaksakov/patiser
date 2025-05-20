import {all, takeEvery, put, delay, call, takeLatest, select} from 'redux-saga/effects'
import actions from "./actions"
import {
	getOrders,
	createOrder,
	updateOrder,
	scheduleOrder,
	getOrderDetails,
	deleteOrder,
	setOrderDiscount,
	getOrderItems,
	createOrderItem,
	updateOrderItem,
	deleteOrderItem,
	completeOrder,
} from '../../helpers/api/orders.api'
import {callCheckingAuthentication, combineErrors} from '../../helpers/utility'
import errorActions from "../errors/actions";
import {reset, startSubmit, stopSubmit} from "redux-form";

export const getErrors = (state) => state.errors.toJS().errors

export function* getOrdersSaga(action) {
    try {
		const getPageParams = (state) => state.orders.toJS().pageParams;
		const pageParams = yield select(getPageParams)

        const response = yield callCheckingAuthentication(getOrders, pageParams);
		yield put(actions.getOrdersSuccess(response.data));
	} catch (e) {
        yield put(actions.getOrdersFailure(e));
    }
}

export function* debounceGetOrdersSaga(action) {
	yield delay(200);
	yield call(getOrdersSaga, action);
}

export function* createOrdersSaga(action) {
	try {
		yield put( startSubmit('OrderForm') )

		const response = yield callCheckingAuthentication(createOrder, action.params);
		yield put(actions.createOrdersSuccess(response.data));

		yield put(actions.setTour(
			{
				run: true,
				stepIndex: 0,
			}
		))

		yield put(actions.setSidebar(false))
		yield put(reset('OrderForm') )
		yield put(stopSubmit('OrderForm') )

		yield put(actions.getOrders({}));
		yield put(actions.selectOrder({
			sid: ''
		}));
		yield put(errorActions.addNotification('Order added', 'The order was successfully added'));
	} catch (e) {
		yield put(actions.createOrdersFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* completeOrderSaga(action) {
	try {
		yield put( startSubmit('CompleteOrderForm') )

		const response = yield callCheckingAuthentication(completeOrder, action.params);
		yield put(actions.completeOrdersSuccess(response.data));

		yield put(actions.setSidebar(false, 'completeOrderSidebar'))
		yield put(reset('CompleteOrderForm') )
		yield put(stopSubmit('CompleteOrderForm') )

		yield put(actions.getOrders({}));
		yield put(actions.getOrderDetails({sid: action.params.sid}));
		yield put(errorActions.addNotification('Order completed', 'The order was successfully completed'));
	} catch (e) {
		yield put(actions.completeOrdersFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* updateOrdersSaga(action) {
	try {
		yield put( startSubmit('OrderForm') )

		const response = yield callCheckingAuthentication(updateOrder, action.params);
		yield put(actions.updateOrdersSuccess(response.data));

		yield put(actions.setSidebar(false))
		yield put(reset('OrderForm') )
		yield put(stopSubmit('OrderForm') )

		yield put(actions.getOrderDetails({sid: action.params.sid}));
		yield put(actions.getOrders({}));
		yield put(errorActions.addNotification('Order updated', 'The order was successfully updated'));
	} catch (e) {
		yield put(actions.updateOrdersFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* scheduleOrdersSaga(action) {
	try {
		yield put( startSubmit('ScheduleForm') )

		const response = yield callCheckingAuthentication(scheduleOrder, action.params);
		yield put(actions.scheduleOrdersSuccess(response.data));

		yield put(actions.setSidebar(false, 'scheduleSidebar'))
		yield put(reset('ScheduleForm') )
		yield put(stopSubmit('ScheduleForm') )

		yield put(actions.getOrderDetails({sid: action.params.sid}));
		yield put(actions.getOrders({}));
		yield put(errorActions.addNotification('Order scheduled', 'The order was successfully scheduled'));
	} catch (e) {
		yield put(actions.scheduleOrdersFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* setOrderDiscountSaga(action) {
	try {
		yield put( startSubmit('DiscountForm') )

		const response = yield callCheckingAuthentication(setOrderDiscount, action.params);
		yield put(actions.setOrderDiscountSuccess(response.data));

		yield put(actions.setSidebar(false, 'discountSidebar'))
		yield put(reset('DiscountForm') )
		yield put(stopSubmit('DiscountForm') )

		yield put(actions.getOrders());
		yield put(actions.getOrderDetails({sid: action.params.id}));
		yield put(errorActions.addNotification('Order discount applied', 'The order discount was successfully applied'));
	} catch (e) {
		yield put(actions.setOrderDiscountFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* getOrderDetailsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getOrderDetails, action.params);
		yield put(actions.getOrderDetailsSuccess(response.data));
		yield put(actions.selectOrder({
			...response.data,
			customer: {
				label: response.data.customer.first_name + ' ' + response.data.customer.last_name,
				value: response.data.customer.sid
			},
			status: {
				label: response.data.status.name,
				value: response.data.status.id,
			},
			starts_at: response.data.scheduled_event ? response.data.scheduled_event.starts_at : '',
			ends_at: response.data.scheduled_event ? response.data.scheduled_event.ends_at : '',

		}));
		yield put(actions.selectDiscount({
			type: {
				label: response.data.discount_type ? response.data.discount_type.name : null,
				value: response.data.discount_type ? response.data.discount_type.id : null
			},
			value: response.data.discount_value,

		}));
	} catch (e) {
		yield put(actions.getOrderDetailsFailure(e));
	}
}

export function* deleteOrderSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteOrder, action.params);
		yield put(actions.deleteOrderSuccess(response.data));
		yield put(actions.getOrders({}));
		yield put(errorActions.addNotification('Order removed', 'The order was successfully removed'));
	} catch (e) {
		yield put(actions.deleteOrderFailure(e));
	}
}

///////////////////////////////////////////////////////////
//order items
///////////////////////////////////////////////////////////

export function* getOrderItemsSaga(action) {
	try {
		const response = yield callCheckingAuthentication(getOrderItems, action.params);
		yield put(actions.getOrderItemsSuccess(response.data));
	} catch (e) {
		yield put(actions.getOrderItemsFailure(e));
	}
}

export function* createOrderItemSaga(action) {
	try {
		yield put( startSubmit('OrderItemForm') )

		const response = yield callCheckingAuthentication(createOrderItem, action.params);
		yield put(actions.createOrderItemSuccess(response.data));

		yield put(actions.setSidebar(false, 'orderItemSidebar'))
		yield put(reset('OrderItemForm') )
		yield put(stopSubmit('OrderItemForm') )

		yield put(actions.getOrderItems({sid: action.params.pid}));
		yield put(actions.getOrderDetails({sid: action.params.pid}));
		yield put(actions.selectOrderItem({
			sid: ''
		}));
		yield put(errorActions.addNotification('Order item added', 'The order item was successfully added'));
	} catch (e) {
		yield put(actions.createOrderItemFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* updateOrderItemSaga(action) {
	try {
		yield put( startSubmit('OrderItemForm') )

		const response = yield callCheckingAuthentication(updateOrderItem, action.params);
		yield put(actions.updateOrderItemSuccess(response.data));

		yield put(actions.setSidebar(false, 'orderItemSidebar'))
		yield put(reset('OrderItemForm') )
		yield put(stopSubmit('OrderItemForm') )

		yield put(actions.getOrderItems({sid: action.params.pid}));
		yield put(actions.getOrderDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Order item updated', 'The order item was successfully updated'));
	} catch (e) {
		yield put(actions.updateOrderItemFailure(e));

		let storeErrors = yield select(getErrors)
		yield put(stopSubmit(action.params.form, combineErrors(storeErrors)) )
	}
}

export function* deleteOrderItemSaga(action) {
	try {
		const response = yield callCheckingAuthentication(deleteOrderItem, action.params);
		yield put(actions.deleteOrderItemSuccess(response.data));
		yield put(actions.getOrderItems({sid: action.params.pid}));
		yield put(actions.getOrderDetails({sid: action.params.pid}));
		yield put(errorActions.addNotification('Order item removed', 'The order item was successfully removed'));
	} catch (e) {
		yield put(actions.deleteOrderItemFailure(e));
	}
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_ORDERS_REQUEST, getOrdersSaga),
		takeLatest(actions.GET_ORDERS_DEBOUNCE, debounceGetOrdersSaga),
		takeEvery(actions.CREATE_ORDERS_REQUEST, createOrdersSaga),
		takeEvery(actions.COMPLETE_ORDERS_REQUEST, completeOrderSaga),
        takeEvery(actions.UPDATE_ORDERS_REQUEST, updateOrdersSaga),
        takeEvery(actions.SCHEDULE_ORDERS_REQUEST, scheduleOrdersSaga),
        takeEvery(actions.GET_ORDER_DETAILS_REQUEST, getOrderDetailsSaga),
        takeEvery(actions.SET_ORDER_DISCOUNT_REQUEST, setOrderDiscountSaga),
        takeEvery(actions.DELETE_ORDER_REQUEST, deleteOrderSaga),

		takeEvery(actions.GET_ORDER_ITEMS_REQUEST, getOrderItemsSaga),
		takeEvery(actions.CREATE_ORDER_ITEM_REQUEST, createOrderItemSaga),
		takeEvery(actions.UPDATE_ORDER_ITEM_REQUEST, updateOrderItemSaga),
		takeEvery(actions.DELETE_ORDER_ITEM_REQUEST, deleteOrderItemSaga),
    ]);
}
