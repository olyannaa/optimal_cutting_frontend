import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { addDxfApi, ResponseGetDesignations } from '../app/services/addDxf';

interface InitialState {
	details: ResponseGetDesignations;
	checkedDetails: ResponseGetDesignations;
	addedDetails: ResponseGetDesignations;
}

const initialState: InitialState = {
	details: {},
	checkedDetails: {},
	addedDetails: {},
};
const slice = createSlice({
	name: 'selectDetails2D',
	initialState,
	reducers: {
		addCheckedDetails: (state, action) => {
			let checkedDetails = state.checkedDetails[action.payload.name] || [];
			state.checkedDetails[action.payload.name] = [
				...checkedDetails,
				action.payload.checkedDetail,
			];
			console.log(state.checkedDetails[action.payload.name]);
		},
		deleteCheckedDetails: (state, action) => {
			console.log(action.payload.checkedDetail);
			state.checkedDetails[action.payload.name] = state.checkedDetails[
				action.payload.name
			].filter(
				(detail) => detail.id !== Number(action.payload.checkedDetail.id)
			);
			console.log(state.checkedDetails[action.payload.name]);
		},
		updateAddedDetails: (state) => {
			Object.keys(state.checkedDetails).forEach((name) => {
				if (state.addedDetails[name])
					state.addedDetails[name] = [
						...state.addedDetails[name],
						...state.checkedDetails[name],
					];
				else state.addedDetails[name] = [...state.checkedDetails[name]];
			});
		},
		clearCheckedDetails: (state) => {
			state.checkedDetails = {};
			console.log(state.checkedDetails);
		},
		deleteAddedDetail: (state, action) => {
			Object.keys(state.addedDetails).forEach((name) => {
				state.addedDetails[name] = state.addedDetails[name].filter(
					(detail) => detail.designation !== action.payload
				);
			});
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			addDxfApi.endpoints.getDesignations.matchFulfilled,
			(state, action) => {
				state.details = action.payload;
			}
		);
	},
});
export const {
	addCheckedDetails,
	updateAddedDetails,
	clearCheckedDetails,
	deleteAddedDetail,
	deleteCheckedDetails,
} = slice.actions;
export default slice.reducer;
export const selectCheckedDetails = (state: RootState) =>
	state.selectDetails2D.checkedDetails;
export const selectAddedDetails = (state: RootState) =>
	state.selectDetails2D.addedDetails;
