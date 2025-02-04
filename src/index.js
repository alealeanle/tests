import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProtectedRoute from '@commons/RouteComponents/ProtectedRoute';
import IsAuthenticatedRoute from '@commons/RouteComponents/IsAuthenticatedRoute';
import store from './redux/store';
import AuthPage from '@pages/AuthPage';
import TestListPage from '@TestListPage';
import SuccessRegistrationPage from '@pages/SuccessRegistrationPage';
import EditPage from '@EditPage';
import TestPassingPage from '@TestPassingPage';
import ErrorPage from '@pages/ErrorPage';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <IsAuthenticatedRoute>
        <AuthPage />
      </IsAuthenticatedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: (
      <IsAuthenticatedRoute>
        <AuthPage />
      </IsAuthenticatedRoute>
    ),
  },
  {
    path: '/registrationSuccess',
    element: <SuccessRegistrationPage />,
  },
  {
    path: '/tests',
    element: (
      <ProtectedRoute admin={false}>
        <TestListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create_test',
    element: (
      <ProtectedRoute admin={true}>
        <EditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/edit_test/:testId',
    element: (
      <ProtectedRoute admin={true}>
        <EditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/passing_test/:testId',
    element: (
      <ProtectedRoute admin={false}>
        <TestPassingPage />
      </ProtectedRoute>
    ),
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
