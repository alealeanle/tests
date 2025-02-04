import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
  error: null,
  registrationSuccess: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: state => {
      state.error = null;
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload.is_admin;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchUserRequest: state => {
      state.error = null;
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.is_admin;
      state.loading = false;
    },
    fetchUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutRequest: state => {
      state.error = null;
      state.loading = true;
    },
    logoutSuccess: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.isAdmin = false;
      state.loading = false;
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    registerRequest: state => {
      state.error = null;
      state.registrationSuccess = false;
      state.loading = true;
    },
    registerSuccess: state => {
      state.registrationSuccess = true;
      state.loading = false;
    },
    registerEnd: state => {
      state.registrationSuccess = false;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.registrationSuccess = false;
      state.loading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  registerEnd,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} = authSlice.actions;
export default authSlice.reducer;
