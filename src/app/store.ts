import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from './services/api';
import auth from "../features/authSlice"
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
