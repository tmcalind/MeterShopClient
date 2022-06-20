import {
    createSlice
  } from '@reduxjs/toolkit';
  
  export const userSlice = createSlice({
    name: 'user',
    initialState: {
      auth: null,
      roles: null,
      prefs: null
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
      }
    },
  });
  
  export const {
    setUser,
    setAuth,
    setRoles,
    setPrefs
  } = userSlice.actions;
  
  export default userSlice.reducer;