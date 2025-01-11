import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ICustomTableRow } from '../types/CustomTable';

type InitialState = {
    rows: ICustomTableRow[];
};

const initialState: InitialState = {
    rows: [],
};

const slice = createSlice({
    name: 'rowsTable',
    initialState,
    reducers: {
        updateRows: (state, action) => {
            state.rows = [...action.payload];
        },
    },
});

export default slice.reducer;
export const { updateRows } = slice.actions;
export const selectRowsTable = (state: RootState) => state.rowsTable.rows;
