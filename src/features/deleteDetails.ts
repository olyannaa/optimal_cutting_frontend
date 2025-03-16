import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface InitialState {
    details: number[];
}

const initialState: InitialState = { details: [] };

const slice = createSlice({
    name: 'deleteDetails',
    initialState,
    reducers: {
        addDetailDelete: (state, action) => {
            state.details = [...state.details, action.payload];
        },
        deleteDetailDelete: (state, action) => {
            state.details = state.details.filter((id) => id !== action.payload);
        },
        clearDetailsDelete: (state) => {
            state.details = [];
        },
    },
});

export const { addDetailDelete, deleteDetailDelete, clearDetailsDelete } = slice.actions;
export default slice.reducer;
export const selectDeleteDetails = (state: RootState) => state.deleteDetails.details;
