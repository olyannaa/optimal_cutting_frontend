import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from './services/api';
import { listenerMiddleware } from './middleware/auth';
import auth from '../features/authSlice';
import cutting1D from '../features/cutting1DSlice';
import maxLengthWorkpieces from '../features/maxLengthWorkpieces';
import dxf from '../features/dxfSlice';
import selectDetails2D from '../features/selectDetails2DSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth,
        cutting1D,
        maxLengthWorkpieces,
        dxf,
        selectDetails2D
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
