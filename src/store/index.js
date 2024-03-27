import {configureStore} from '@reduxjs/toolkit';
import  counterReducer from './slices/counterslice';
import createSagaMiddleware from "redux-saga";
import saga from './saga';
import watcherSagas from './saga';


const sagaMiddleware = createSagaMiddleware();
export default configureStore({
    reducer:{
        counter:counterReducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSagas);