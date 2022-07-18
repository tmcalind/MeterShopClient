import {
    createSlice
  } from '@reduxjs/toolkit';
  
  export const userSlice = createSlice({
    name: 'user',
    initialState: {
      auth: null,
      roles: null,
      prefs: null,
      arcGISAuth: null,
      status: "notLoggedIn",
      cityworksLoginName: "?",
      cityworksToken: null
    },
    reducers: {
        setUser: (state, action) => {
            state.auth = action.payload.auth;
            state.roles = action.payload.roles;
            state.prefs = action.payload.prefs;
        },
      setAuth: (state, action) => {
        state.auth = action.payload;
      },
      setRoles: (state, action) => {
        state.roles = action.payload;
      },
      setPrefs: (state, action) => {
          state.prefs = action.payload;
      },
      setArcGISAuth: (state, action) => {
        state.arcGISAuth = action.payload;
      },
      setStatus: (state, action) => {
        state.status = action.payload;
      },
      setCityworksLoginName: (state, action) => {
        state.cityworksLoginName = action.payload;
      },
      setCityworksToken: (state, action) => {
        state.cityworksToken = action.payload;
      },
      
    },
  });
  
  export const {
    setUser,
    setAuth,
    setRoles,
    setPrefs,
    setArcGISAuth,
    setStatus,
    setCityworksLoginName,
    setCityworksToken
  } = userSlice.actions;
  
  export default userSlice.reducer;