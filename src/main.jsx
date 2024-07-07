import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home';
import AboutUsSection from './components/pages/AboutUsPage'; 
import App from './App';
import LoginPage from './components/pages/Login-Page'
import SignInPage from './components/pages/Sign-in-page';
import AdminInventory from './components/pages/AdminInventory';
import AdminDeliveryMan from './components/pages/AdminDeliveryMan';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path: 'acerca-de-nosotros',
        element: <AboutUsSection />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'admin-inventory',
        element: <AdminInventory />,
      },
      {
        path: 'admin-deliveryman',
        element: <AdminDeliveryMan />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);