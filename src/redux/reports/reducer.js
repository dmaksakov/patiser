import reportOrdersReducer from "./orders/reducer"
import reportSalesReducer from "./sales/reducer";

export default function reports(state = {}, action) {
	return {
		orders: reportOrdersReducer(state.orders, action),
		sales: reportSalesReducer(state.sales, action),
	}
}
