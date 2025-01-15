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
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.is_admin;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
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
      // localStorage.removeItem('scope-key');
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
  fetchUserSuccess,
  fetchUserFailure,
} = authSlice.actions;
export default authSlice.reducer;
