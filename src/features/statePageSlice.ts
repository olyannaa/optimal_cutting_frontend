import { createSlice } from '@reduxjs/toolkit';
import { TabsOptions } from '../components/FormTabs/tabsOption';
import { RootState } from '../app/store';

type statePage = {
    isLoading: boolean;
    tab: TabsOptions;
};

const initialState: statePage = {
    isLoading: false,
    tab: TabsOptions.valueFirst,
};

const slice = createSlice({
    name: 'statePage',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        changeTab(state, action) {
            state.tab = action.payload;
        },
    },
});

export default slice.reducer;
export const { setLoading, changeTab } = slice.actions;
export const selectTab = (state: RootState) => state.statePage.tab;
