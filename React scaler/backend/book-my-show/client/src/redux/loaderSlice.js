import{createSlice} from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
    name: 'loader',
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
