import {configureStore} from '@reduxjs/toolkit'
import {useSelector,useDispatch,TypedUseSelectorHook} from 'react-redux'

import userReducer from './userReducer';


const store=configureStore({
    reducer:{
    user:userReducer
    }
});

type AppDispatch=typeof store.dispatch;
type RootState=ReturnType<typeof store.getState>

export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;
export const useAppDispatch:()=>AppDispatch=useDispatch;

export default store;