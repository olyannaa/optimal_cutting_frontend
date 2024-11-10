import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { addDxfApi, Material } from '../app/services/addDxf';

interface InitialState {
    materials: Material[] | null;
    file?: FormData;
}

const initialState: InitialState = {
    materials: null,
    file: undefined,
};
const slice = createSlice({
    name: 'dxf',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            addDxfApi.endpoints.getMaterial.matchFulfilled,
            (state, action) => {
                state.materials = [...action.payload];
            }
        );
        builder.addMatcher(
            addDxfApi.endpoints.addDetail.matchFulfilled,
            (state, action) => {
                state.file = action.payload;
            }
        );
    },
});

export default slice.reducer;
export const selectMaterials = (state: RootState) => state.dxf.materials;
export const selectFile = (state: RootState) => state.dxf.file;
