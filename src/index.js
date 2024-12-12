import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthPage from '@pages/AuthPage';
import TestList from '@pages/TestList';
import SuccessRegistrationPage from '@pages/SuccessRegistrationPage';
import ErrorPage from '@pages/ErrorPage';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <AuthPage />,
  },
  {
    path: '/registrationSuccess',
    element: <SuccessRegistrationPage />,
  },
  {
    path: '/tests',
    element: <TestList />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
