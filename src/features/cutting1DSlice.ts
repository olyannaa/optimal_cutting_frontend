import { createSlice } from '@reduxjs/toolkit';
import { cuttingApi, ResponseCalculate1D } from '../app/services/cutting';
import { RootState } from '../app/store';

const initialState: ResponseCalculate1D = {
	workpieces: [],
	totalPercentUsage: 0,
};

const slice = createSlice({
	name: 'cutting1D',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			cuttingApi.endpoints.calculate1D.matchFulfilled,
			(state, action) => {
				state.workpieces = [...action.payload.workpieces];
				state.totalPercentUsage = action.payload.totalPercentUsage;
			}
		);
	},
});

export default slice.reducer;
export const selectCalculateData1D = (state: RootState) => state.cutting1D;
