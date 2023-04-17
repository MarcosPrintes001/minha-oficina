import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/login/login';
import UserPage from './pages/user/user';
import Home from './pages/home/home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/user',
    element: <UserPage />
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


