// import{configureStore} from '@reduxjs/toolkit';
// import loaderReducer from './loaderSlice';
// import usersReducer from './userSlice';

// const store = configureStore({
//     reducer: {
//         loader: loaderReducer,
//         users: usersReducer,
//     },
// });


import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
// Import the loader reducer
import loaderReducer from './loaderSlice'; // Adjust the path as necessary

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // Add the loader reducer with the key 'loader'
    loader: loaderReducer,
  },
});

export default store;