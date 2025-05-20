const calendarActions = {

	HANDLE_SIDEBAR: 'HANDLE_SIDEBAR',
	ADD_EVENT: 'ADD_EVENT',
	UPDATE_EVENT: 'UPDATE_EVENT',
	UPDATE_DRAG: 'UPDATE_DRAG',
	EVENT_RESIZE: 'EVENT_RESIZE',
	HANDLE_SELECTED_EVENT: 'HANDLE_SELECTED_EVENT',

	FETCH_EVENTS: 'FETCH_EVENTS',
	FETCH_EVENTS_SUCCESS: 'FETCH_EVENTS_SUCCESS',
	FETCH_EVENTS_FAILURE: 'FETCH_EVENTS_FAILURE',

	fetchEvents: (params) => ({
		type: calendarActions.FETCH_EVENTS,
		params
	}),

	fetchEventsSuccess: (result) => ({
		type: calendarActions.FETCH_EVENTS_SUCCESS,
		payload: result
	}),

	fetchEventsFailure: (error) => ({
		type: calendarActions.FETCH_EVENTS_FAILURE,
		payload: [],
		error,
	}),

	UPDATE_EVENT_REQUEST: 'UPDATE_EVENT_REQUEST',
	UPDATE_EVENT_SUCCESS: 'UPDATE_EVENT_SUCCESS',
	UPDATE_EVENT_FAILURE: 'UPDATE_EVENT_FAILURE',

	handleSidebar: (bool) => ({
		type: "HANDLE_SIDEBAR",
		status: bool
	}),

	updateEvent: (params) => ({
		type: calendarActions.UPDATE_EVENT_REQUEST,
		params
	}),

	updateEventSuccess: (result) => ({
		type: calendarActions.UPDATE_EVENT_SUCCESS,
		payload: result
	}),

	updateEventFailure: (error) => ({
		type: calendarActions.UPDATE_EVENT_FAILURE,
		payload: [],
		error,
	}),

	addEvent: (event) => ({
		type: "ADD_EVENT",
		event
	}),

	updateDrag: (event) => ({
		type: "UPDATE_DRAG",
		event
	}),

	updateResize: (event) => ({
		type: "EVENT_RESIZE",
		event
	}),

	handleSelectedEvent: (event) => ({
		type: "HANDLE_SELECTED_EVENT",
		event
	})
}

export default calendarActions
