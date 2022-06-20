import { createSlice } from "@reduxjs/toolkit";

export const cityworksSlice = createSlice({
    name: 'cityworks',
    initialState: {
        tasks: [],
        tasksVisible: false,
        tasksLastUpdate: null,
        selectedWorkOrderId: null,
        selectedWorkOrder: null
    },
    reducers: {
        setTasks: (state, action) => { state.tasks = action.payload; },
        setTasksVisible: (state, action) => { state.tasksVisible = action.payload; },
        setTasksLastUpdate: (state, action) => { state.tasksLastUpdate = action.payload; },
        setSelectedWorkOrderId: (state, action) => { state.selectedWorkOrderId = action.payload; },
        setSelectedWorkOrder: (state, action) => { state.selectedWorkOrder = action.payload; },
    }
});

export const {
    setTasks,
    setTasksVisible,
    setTasksLastUpdate,
    setSelectedWorkOrderId,
    setSelectedWorkOrder
} = cityworksSlice.actions;

export default cityworksSlice.reducer;