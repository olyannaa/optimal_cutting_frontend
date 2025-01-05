import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ResultCalculate2D } from '../types/Calculated2D';
import { cutting2DApi } from '../app/services/cutting2d';

const initialState: ResultCalculate2D = {
    details: [],
    workpiece: undefined,
};

const slice = createSlice({
    name: 'cutting2D',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            cutting2DApi.endpoints.calculate2D.matchFulfilled,
            (state, action) => {
                state.details = [...action.payload.details];
                state.workpiece = action.payload.workpiece;
            }
        );
    },
});

export default slice.reducer;
export const selectCalculateData2D = (state: RootState) => state.cutting2D;
