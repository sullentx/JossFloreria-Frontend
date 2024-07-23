import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home';
import AboutUsSection from './components/pages/AboutUsPage'; 
import App from './App';
import SearchPage from './components/pages/SearchPage';
import LoginPage from './components/pages/LoginPage';
import SignInPage from './components/pages/Sign-in-page';
import BuyNowPage from './components/pages/BuyNowPage';
import ReservedProducts from './components/pages/ReservedProducts';
import FavouriteProducts from './components/pages/FavouriteProducts';
import NotFound from './components/pages/NotFound';
import AdminPage from './components/pages/AdminPage';
import DeliveryPage from './components/pages/DeliveryPage';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />
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
        path: 'Comprar-ahora',
        element: <BuyNowPage />,
      },
      {
        path: 'reserved-products',
        element: <ReservedProducts />,
      },
      {
        path: 'favourite-products',
        element: <FavouriteProducts />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: 'delivery',
        element: <DeliveryPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
