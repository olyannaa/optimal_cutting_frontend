import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState: { maxLength: number } = {
    maxLength: 1000000,
};

const slice = createSlice({
    name: 'maxLengthWorkpieces',
    initialState,
    reducers: {
        updateMaxLength: (state, action) => {
            state.maxLength = action.payload;
        },
    },
});

export default slice.reducer;
export const { updateMaxLength } = slice.actions;
export const selectMaxLengthWorkpieces = (state: RootState) => state.maxLengthWorkpieces;
