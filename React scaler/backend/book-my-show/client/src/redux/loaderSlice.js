import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
    name: 'loaders',
    initialState: {
        loading: false,
    },
    reducers: {
        showLoader: (state) => {
            state.loading = true;
        },
        hideLoader: (state) => {
            state.loading = false;
        },
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer; 