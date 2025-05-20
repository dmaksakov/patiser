import {Map} from 'immutable';
import actions from './actions';
import React from "react";

const initState = new Map({
    loading: false,
	sidebar: false,
	scheduleSidebar: false,
	orderItemSidebar: false,
	discountSidebar: false,
	completeOrderSidebar: false,
	orders: [],
	selectedOrder: {},
	orderItems: [],
	selectedOrderItem: {},
	selectedDiscount: {},
	pageParams: {
		page: 1,
		pageSize: 4,
		total: 0,
		search: '',
		sortDir: 'desc',
		sortField: '',
	},
	tour: {
		run: false,
		stepIndex: 0,
		steps: [
			{
				content: (
					<div>
						Click on the button to add new order
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				hideFooter: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.add-new',
				title: 'Add order',
			},
			{
				content: <div>
					Order create is a 2 step procedure:
					first you add the basic information and then proceed to the order details
					to add order items. Please make sure the customer was added to the customer
					database first (Customers page).
				</div>,
				placement: 'left',
				target: '.form-order',
				title: 'Fill the form out',
				spotlightPadding: 7,
			},
		],
		steps2: [
			{
				content: (
					<div>
						Click on the order number to proceed to order details
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				hideFooter: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.order-number',
				title: 'Order details',
			},
		],
	},
	detailsTour: {
		run: false,
		stepIndex: 0,
		steps: [
			{
				content: (
					<div>
						Use this button to apply a discount for the order. Discount can be
						 one of two types: percentage or fixed amount.
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.set-discount',
				title: 'Set discount',
			},
			{
				content: (
					<div>
						Use this button to schedule the order by choosing start
						and end date and time.
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.schedule-order',
				title: 'Schedule order',
			},
			{
				content: (
					<div>
						Use this button to mark the order as completed.
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.complete-order',
				title: 'Complete order',
			},
			{
				content: (
					<div>
						Click on this button to add order items.
					</div>
				),
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				placement: 'bottom',
				spotlightClicks: true,
				target: '.add-order-item',
				title: 'Add order items',
				hideFooter: true,
			},
			{
				content: (
					<div>
						Select the item to add to the order.
					</div>
				),
				styles: {
					options: {
						zIndex: 10000,
					},
				},
				disableBeacon: true,
				disableOverlayClose: true,
				hideCloseButton: true,
				placement: 'left',
				spotlightClicks: true,
				target: '.select-order-item',
				title: 'Select order items',
			},
		],
	},
});

export default function orderReducer(state = initState, action) {

    switch (action.type) {

		case actions.SET_TOUR:
			return state
				.set('tour', {
					...state.get('tour'),
					...action.tour
				})

		case actions.SET_DETAILS_TOUR:
			return state
				.set('detailsTour', {
					...state.get('detailsTour'),
					...action.tour
				})

		case actions.SET_PAGE_PARAMS:
			return state
				.set('pageParams', {
					...state.get('pageParams'),
					...action.params
				})

		case actions.SET_SIDEBAR:
			return state
				.set(action.sidebar, action.boolean);

        case actions.GET_ORDERS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_ORDERS_SUCCESS:
            return state
                .set('loading', false)
				.set('orders', action.payload.items)
				.set('pageParams', {
					...state.get('pageParams'),
					page: action.payload.page,
					pageSize: action.payload.per_page,
					total: action.payload.total,
				})

        case actions.GET_ORDERS_FAILURE:
            return state
                .set('loading', false)


        case actions.CREATE_ORDERS_REQUEST:
            return state
                .set('loading', true);

        case actions.CREATE_ORDERS_SUCCESS:
            return state
                .set('loading', false)

        case actions.CREATE_ORDERS_FAILURE:
            return state
                .set('loading', false)

        case actions.COMPLETE_ORDERS_REQUEST:
            return state
                .set('loading', true);

        case actions.COMPLETE_ORDERS_SUCCESS:
            return state
                .set('loading', false)

        case actions.COMPLETE_ORDERS_FAILURE:
            return state
                .set('loading', false)

        case actions.UPDATE_ORDERS_REQUEST:
            return state
                .set('loading', true);

        case actions.UPDATE_ORDERS_SUCCESS:
            return state
                .set('loading', false)

        case actions.UPDATE_ORDERS_FAILURE:
            return state
                .set('loading', false)

        case actions.SCHEDULE_ORDERS_REQUEST:
            return state
                .set('loading', true);

        case actions.SCHEDULE_ORDERS_SUCCESS:
            return state
                .set('loading', false)

        case actions.SCHEDULE_ORDERS_FAILURE:
            return state
                .set('loading', false)


        case actions.GET_ORDER_DETAILS_REQUEST:
            return state
                .set('loading', true);

        case actions.GET_ORDER_DETAILS_SUCCESS:
            return state
                .set('loading', false)
				.set('selectedOrder', action.payload)

		case actions.GET_ORDER_DETAILS_FAILURE:
            return state
                .set('loading', false)

        case actions.SET_ORDER_DISCOUNT_REQUEST:
            return state
                .set('loading', true);

        case actions.SET_ORDER_DISCOUNT_SUCCESS:
            return state
                .set('loading', false)

        case actions.SET_ORDER_DISCOUNT_FAILURE:
            return state
                .set('loading', false)

        case actions.DELETE_ORDER_REQUEST:
            return state
                .set('loading', true);

        case actions.DELETE_ORDER_SUCCESS:
            return state
                .set('loading', false)

        case actions.DELETE_ORDER_FAILURE:
            return state
                .set('loading', false)

		///////////////////////////////////
		///// ORDER ITEMS
		///////////////////////////////////

		case actions.GET_ORDER_ITEMS_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_ORDER_ITEMS_SUCCESS:
			return state
				.set('loading', false)
				.set('orderItems', action.payload)

		case actions.GET_ORDER_ITEMS_FAILURE:
			return state
				.set('loading', false)


		case actions.CREATE_ORDER_ITEM_REQUEST:
			return state
				.set('loading', true);

		case actions.CREATE_ORDER_ITEM_SUCCESS:
			return state
				.set('loading', false)

		case actions.CREATE_ORDER_ITEM_FAILURE:
			return state
				.set('loading', false)


		case actions.UPDATE_ORDER_ITEM_REQUEST:
			return state
				.set('loading', true);

		case actions.UPDATE_ORDER_ITEM_SUCCESS:
			return state
				.set('loading', false)

		case actions.UPDATE_ORDER_ITEM_FAILURE:
			return state
				.set('loading', false)

		case actions.DELETE_ORDER_ITEM_REQUEST:
			return state
				.set('loading', true);

		case actions.DELETE_ORDER_ITEM_SUCCESS:
			return state
				.set('loading', false)

		case actions.DELETE_ORDER_ITEM_FAILURE:
			return state
				.set('loading', false)

///////////////////////////////////
///// Other stuff
///////////////////////////////////

        case actions.SELECT_ORDER:
            return state
                .set('selectedOrder', action.order)

        case actions.SELECT_ORDER_ITEM:
            return state
                .set('selectedOrderItem', action.orderItem)

        case actions.SELECT_DISCOUNT:
            return state
                .set('selectedDiscount', action.discount)


		default:
            return state;
    }
}
