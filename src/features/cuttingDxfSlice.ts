import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ResultCalculate2D } from '../types/Calculated2D';
import { cutting2DApi } from '../app/services/cutting2d';

const initialState: ResultCalculate2D = {
    workpieces: [],
    totalPercentUsage: 0,
};

const slice = createSlice({
    name: 'cuttingDxf',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            cutting2DApi.endpoints.calculateDxf.matchFulfilled,
            (state, action) => {
                state.workpieces = [...action.payload.workpieces];
                state.totalPercentUsage = action.payload.totalPercentUsage;
            }
        );
    },
});

export default slice.reducer;
export const selectCalculateDataDxf = (state: RootState) => state.cuttingDxf;
