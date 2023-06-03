import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginInput, RegisterInput } from '../types/auth';
import axiosApiInstance from '../axios';

interface UserInitialState {
  registerLoading: boolean;
  loginLoading: boolean;
  user: any;
  errors: any;
  allUsers: any[];
  usersLoading: boolean;
}

const initialState: UserInitialState = {
  registerLoading: false,
  loginLoading: false,
  user: null,
  errors: {},
  allUsers: [],
  usersLoading: false,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { input, onSuccess }: { input: RegisterInput; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post('/auth/register', input);
      onSuccess && onSuccess();
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { input, onSuccess }: { input: LoginInput; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post('/auth/login', input);
      onSuccess && onSuccess();
      return response.data;
    } catch (err:any) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk('user/all', async (_, thunkApi) => {
  try {
    const response = await axiosApiInstance.get('/user');
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export const changeStatus= createAsyncThunk('user/status',async({ids,status}:{ids:string[],status:string},thunkApi)=>{
    try{
    const response=await axiosApiInstance.put(`/user/status`,{status,ids});
    if(status==='deleted') {
        thunkApi.dispatch(getAllUsers());
    }
    return response.data;
    }catch(err) {
        return thunkApi.rejectWithValue(err);
    }
});

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    clearErrors:(state)=>{
        state.errors={};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerLoading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginLoading = false;
      state.errors=action.payload;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.usersLoading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.usersLoading = false;
    });
    builder.addCase(changeStatus.fulfilled,(state,action)=>{
        state.allUsers=state.allUsers.map((user:any)=>action.meta.arg.ids.includes(user._id)?{...user,status:action.meta.arg.status}:user);
    })
  },
});

export const { logoutUser, clearErrors } = userReducer.actions;

export default userReducer.reducer;
