import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'


interface UserInitialState {
    registerLoading:boolean;
    loginLoading:boolean;
    user:any;
    errors:any;
}



const initialState:UserInitialState={
    registerLoading:false,
    loginLoading:false,
    user:null,
    errors:{}
}



const userReducer=createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase
    }
})

export default userReducer.reducer;