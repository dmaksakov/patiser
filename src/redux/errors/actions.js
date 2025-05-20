const errorActions = {

    ADD_ERROR: 'ADD_ERROR',
    RESET_ADD_ERROR: 'RESET_ADD_ERROR',
    REMOVE_ALL_ERRORS: 'REMOVE_ALL_ERRORS',
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    REMOVE_ALL_NOTIFICATIONS: 'REMOVE_ALL_NOTIFICATIONS',
    SET_LOADING_ICON: 'SET_LOADING_ICON',
	SET_SHOW_ERRORS: 'SET_SHOW_ERRORS',

    addError: (header, error, needExtract = true, status = 0) => ({
        type: errorActions.ADD_ERROR,
        header,
        error,
        needExtract,
        status,
    }),

    resetAddError: (header, error) => ({
        type: errorActions.RESET_ADD_ERROR,
        header,
        error,
    }),

    addNotification: (header, message) => ({
        type: errorActions.ADD_NOTIFICATION,
        header: header,
        message: message
    }),

    removeAllErrors: () => ({
        type: errorActions.REMOVE_ALL_ERRORS
    }),

    removeAllNotifications: () => ({
        type: errorActions.REMOVE_ALL_NOTIFICATIONS
    }),

    setLoadingIcon: (status) => ({
        type: errorActions.SET_LOADING_ICON,
        status
    }),

    setShowErrors: (status) => ({
        type: errorActions.SET_SHOW_ERRORS,
        status
    }),

};

export default errorActions;
