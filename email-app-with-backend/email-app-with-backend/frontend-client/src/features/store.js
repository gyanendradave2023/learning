import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import emailReducer from './email/emailSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
  },
});

export default store;
