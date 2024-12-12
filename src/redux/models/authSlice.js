import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
  error: null,
  registrationSuccess: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: state => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isAdmin = action.payload.is_admin;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    fetchUserFailure: (state, action) => {
      state.error = action.payload;
    },
    logoutRequest: state => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.isAdmin = false;
      state.loading = false;
      localStorage.removeItem('scope-key');
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest: state => {
      state.error = null;
      state.registrationSuccess = false;
    },
    registerSuccess: state => {
      state.registrationSuccess = true;
    },
    registerEnd: state => {
      state.registrationSuccess = false;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.registrationSuccess = false;
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
  fetchUserSuccess,
  fetchUserFailure,
} = authSlice.actions;
export default authSlice.reducer;
