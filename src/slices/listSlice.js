import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
    name: 'lists',
    initialState: {
        hydroServiceOrderObjectIds: [],
        hydroServiceOrderObjectIdsVisible: false,
        hydroNotificationObjectIds: [],
        hydroNotificationObjectIdsVisible: false,
        crmObjectIds: [],
        crmObjectIdsVisible: false,
        crmObjectIdsLastUpdate: null,
        lettersObjectIds: [],
        lettersObjectIdsVisible: false,
        callsObjectIds: [],
        callsObjectIdsVisible: false,
        shutoffsObjectIds: [],
        shutoffsObjectIdsVisible: false,
        scheduledObjectIds: [],
        scheduledObjectIdsVisible: false
    },
    reducers: {
        setHydroServiceOrderObjectIds: (state, action) => { state.hydroServiceOrderObjectIds = action.payload; },
        setHydroServiceOrderObjectIdsVisible: (state, action) => { state.hydroServiceOrderObjectIdsVisible = action.payload; },

        setHydroNotificationObjectIds: (state, action) => { state.hydroNotificationObjectIds = action.payload; },
        setHydroNotificationObjectIdsVisible: (state, action) => { state.hydroNotificationObjectIdsVisible = action.payload; },

        setCrmObjectIds: (state, action) => { state.crmObjectIds = action.payload; },
        setCrmObjectIdsVisible: (state, action) => { state.crmObjectIdsVisible = action.payload; },
        setCrmObjectIdsLastUpdate: (state, action) => { state.crmObjectIdsLastUpdate = action.payload; },

        setLettersObjectIds: (state, action) => { state.lettersObjectIds = action.payload; },
        setLettersObjectIdsVisible: (state, action) => { state.lettersObjectIdsVisible = action.payload; },

        setCallsObjectIds: (state, action) => { state.callsObjectIds = action.payload; },
        setCallsObjectIdsVisible: (state, action) => { state.callsObjectIdsVisible = action.payload; },

        setShutoffsObjectIds: (state, action) => { state.shutoffsObjectIds = action.payload; },
        setShutoffsObjectIdsVisible: (state, action) => { state.shutoffsObjectIdsVisible = action.payload; },

        setScheduledObjectIds: (state, action) => { state.scheduledObjectIds = action.payload; },
        setScheduledObjectIdsVisible: (state, action) => { state.scheduledObjectIdsVisible = action.payload; }
    }
});

export const {
    setHydroServiceOrderObjectIds,
    setHydroServiceOrderObjectIdsVisible,
    setHydroNotificationObjectIds,
    setHydroNotificationObjectIdsVisible,
    setCrmObjectIds,
    setCrmObjectIdsVisible,
    setCrmObjectIdsLastUpdate,
    setLettersObjectIds,
    setLettersObjectIdsVisible,
    setCallsObjectIds,
    setCallsObjectIdsVisible,
    setShutoffsObjectIds,
    setShutoffsObjectIdsVisible,
    setScheduledObjectIds,
    setScheduledObjectIdsVisible
} = listSlice.actions;

export default listSlice.reducer;
