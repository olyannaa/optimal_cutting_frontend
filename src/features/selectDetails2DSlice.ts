import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { addDxfApi, ResponseGetDesignations } from '../app/services/addDxf';
import { DetailDxf } from '../types/CalculatedDxf';

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
            const checkedDetails = state.checkedDetails[action.payload.name] || [];
            state.checkedDetails[action.payload.name] = [
                ...checkedDetails,
                action.payload.checkedDetail,
            ];
        },
        deleteCheckedDetails: (state, action) => {
            if (
                !state.addedDetails[action.payload.name] ||
                !state.addedDetails[action.payload.name].find(
                    (detail) => detail.id === Number(action.payload.checkedDetail.id)
                )
            )
                state.checkedDetails[action.payload.name] = state.checkedDetails[
                    action.payload.name
                ].filter(
                    (detail) => detail.id !== Number(action.payload.checkedDetail.id)
                );
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
        },
        clearAddDetails: (state) => {
            state.addedDetails = {};
        },
        deleteAddedDetail: (state, action) => {
            Object.keys(state.addedDetails).forEach((name) => {
                state.addedDetails[name] = state.addedDetails[name].filter(
                    (detail) => detail.designation !== action.payload
                );
            });
        },
        addAddedDetails: (state, action: { payload: DetailDxf[] }) => {
            action.payload.forEach((detail) => {
                const name = detail.designation;
                if (state.addedDetails[name.substring(0, 4)]) {
                    state.addedDetails[name.substring(0, 4)].push({
                        designation: detail.designation,
                        id: detail.id,
                        materialId: detail.materialId,
                        thickness: detail.thickness,
                    });
                } else {
                    state.addedDetails[name.substring(0, 4)] = [
                        {
                            designation: detail.designation,
                            id: detail.id,
                            materialId: detail.materialId,
                            thickness: detail.thickness,
                        },
                    ];
                }
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
    addAddedDetails,
    clearAddDetails,
} = slice.actions;
export default slice.reducer;
export const selectCheckedDetails = (state: RootState) =>
    state.selectDetails2D.checkedDetails;
export const selectAddedDetails = (state: RootState) =>
    state.selectDetails2D.addedDetails;
