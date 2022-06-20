import {
    createSlice
  } from '@reduxjs/toolkit';
  
export const workOrderSlice = createSlice({
    name: 'workOrder',
    initialState: {
        workOrderId: null,
        workOrderType: null
    },
    reducers: {
        setWorkOrder: (state, action) => {
            state.workOrderId = action.payload.id;
            state.workOrderType = action.payload.type;
        }
    },
});

export const {
setWorkOrder,
} = workOrderSlice.actions;

export default workOrderSlice.reducer;