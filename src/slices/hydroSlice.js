import { createSlice } from "@reduxjs/toolkit";

export const hydroSlice = createSlice({
    name: 'hydro',
    initialState: {
        serviceOrders: [],
        serviceOrdersVisible: false,
        serviceOrdersLastUpdate: null,
        notifications: [],
        notificationsVisible: false,
        notificationsLastUpdate: null,
    },
    reducers: {
        setServiceOrders: (state, action) => { state.serviceOrders = action.payload; },
        setServiceOrdersVisible: (state, action) => { state.serviceOrdersVisible = action.payload; },
        setServiceOrdersLastUpdate: (state, action) => { state.serviceOrdersLastUpdate = action.payload; },

        setNotifications: (state, action) => { state.notifications = action.payload; },
        setNotificationsVisible: (state, action) => { state.notificationsVisible = action.payload; },
        setNotificationsLastUpdate: (state, action) => { state.notificationsLastUpdate = action.payload; },
    }
});

export const {
    setServiceOrders,
    setServiceOrdersVisible,
    setServiceOrdersLastUpdate,
    setNotifications,
    setNotificationsVisible,
    setNotificationsLastUpdate,
} = hydroSlice.actions;

export default hydroSlice.reducer;