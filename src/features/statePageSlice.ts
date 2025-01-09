import { createSlice } from '@reduxjs/toolkit';

type statePage = {
    isLoading: boolean;
};

const initialState: statePage = {
    isLoading: false,
};

const slice = createSlice({
    name: 'statePage',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export default slice.reducer;
export const { setLoading } = slice.actions;
