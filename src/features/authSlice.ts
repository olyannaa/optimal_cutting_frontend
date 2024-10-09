import { createSlice } from '@reduxjs/toolkit';
import { authApi, ResponseLoginData } from '../app/services/auth';
import { RootState } from '../app/store';

interface InitialState {
    token: ResponseLoginData | null;
    isAuth: boolean;
}
const initialState: InitialState = {
    token: null,
    isAuth: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            localStorage.clear();
            return initialState;
        },
        refresh: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.token = action.payload;
                    state.isAuth = true;
                }
            )
    },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuth;
