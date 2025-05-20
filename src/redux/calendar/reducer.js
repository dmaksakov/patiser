const initialState = {
	events: [],
	sidebar: false,
	selectedEvent: null,
	loading: false,
}

const calenderReducer = (state = initialState, action) => {

	switch (action.type) {

		case "FETCH_EVENTS":
			return state

		case "FETCH_EVENTS_SUCCESS":
			return {
				...state,
				events: action.payload.map(event => {
					return {
							...event,
							id: event.sid,
							title: event.name,
							start: event.starts_at,
							end: event.ends_at,
							allDay: false,
							selectable: true,
						}
				})


			}

		case "FETCH_EVENTS_FAILURE":
			return state

		case "UPDATE_EVENT_REQUEST":
			return state

		case "UPDATE_EVENT_SUCCESS":
			return state

		case "UPDATE_EVENT_FAILURE":
			return state

		case "ADD_EVENT":
			state.events.push(action.event)
			return {...state}

		case "UPDATE_EVENT":
			let updatedEvents = state.events.map(event => {
				if (event.id === action.event.id) {
					return action.event
				}
				return event
			})
			return {...state, events: updatedEvents}

		case "UPDATE_DRAG":
			let eventToDrag = action.event,
				extractedEvent = state.events.map(event => {
					if (event.id === eventToDrag.id) {
						return eventToDrag
					}
					return event
				})
			return {...state, events: extractedEvent}

		case "EVENT_RESIZE":
			let eventToResize = action.event,
				resizeEvent = state.events.map(event => {
					if (event.id === eventToResize.id) {
						return eventToResize
					}
					return event
				})
			return {...state, events: resizeEvent}

		case "HANDLE_SIDEBAR":
			return {...state, sidebar: action.status}

		case "HANDLE_SELECTED_EVENT":
			return {...state, selectedEvent: action.event}

		default:
			return state
	}
}

export default calenderReducer
