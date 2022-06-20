import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../slices/userSlice';
import featureReducer from '../slices/featureSlice';
import listReducer from '../slices/listSlice';
import addressReducer from '../slices/addressSlice';
import workOrderReducer from '../slices/workOrderSlice';
import hydroReducer from '../slices/hydroSlice'
import cityworksReducer from '../slices/cityworksSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    features: featureReducer,
    lists: listReducer,
    address: addressReducer,
    workOrder: workOrderReducer,
    hydro: hydroReducer,
    cityworks: cityworksReducer,
  },
});
