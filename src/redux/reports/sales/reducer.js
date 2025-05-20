import {Map} from 'immutable';
import actions from './actions';

const salesChartState = new Map({
	loading: false,
	items: {
		name:"",
		series: [],
		categories:[]
	},
});

const salesOptionsState = new Map({
	loading: false,
	quick_ranges:{},
	currentRange:"last_30_days",
	rangeDateMin:null,
	params:{
		range_type: "last_30_days",
		range_group:"day",
	}

});

export function salesChartReducer(state = salesChartState, action) {

	switch (action.type) {
		case actions.GET_SALES_CHART_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_SALES_CHART_SUCCESS:
			return state
				.set('loading', false)
				.set('items', action.payload)

		case actions.GET_SALES_CHART_FAILURE:
			return state
				.set('loading', false)
		default:
			return state;
	}
}
export function salesOptionsReducer(state = salesOptionsState, action) {

	switch (action.type) {

		case actions.GET_SALES_GROUP_BY_CHANGE:
			return state.set('params', {...state.params, ...action.params})

		case actions.GET_SALES_PARAMS_CHANGE:
			return state.set('params', {...state.params, ...action.params})

		case actions.GET_SALES_OPTIONS_REQUEST:
			return state
				.set('loading', true);

		case actions.GET_SALES_OPTIONS_SUCCESS:
			return state
				.set('loading', false)
				.set('quick_ranges', action.payload.quick_ranges)

		case actions.GET_SALES_OPTIONS_FAILURE:
			return state
				.set('loading', false)
		default:
			return state;
	}
}

export default function reportSalesReducer(state = {}, action){
	return {
		chart: 	salesChartReducer(state.chart, action),
		options: salesOptionsReducer(state.options, action)
	};
}

