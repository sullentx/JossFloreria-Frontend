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
import AdminInventory from './components/pages/AdminInventory';
import AdminDeliveryMan from './components/pages/AdminDeliveryMan';
import AdminBackorders from './components/pages/AdminBackorders';
import ReservedProducts from './components/pages/ReservedProducts';
import FavouriteProducts from './components/pages/FavouriteProducts';
import NotFound from './components/pages/NotFound';
import Catalog from './components/pages/Catalog';
import MakeYourBouquet from './components/pages/MakeYourBouquet';
import AdminOrder from './components/pages/AdminOrder';
import DeliveryOrder from './components/pages/DeliveryOrder';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<NotFound/>,
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
        path: 'admin-inventory',
        element: <AdminInventory />,
      },
      {
        path: 'admin-deliveryman',
        element: <AdminDeliveryMan />,
      },
      {
        path: 'admin-backorders',
        element: <AdminBackorders />,
      },
      {
        path: 'admin-order',
        element: <AdminOrder />,
      },
      {
        path: 'delivery-order',
        element: <DeliveryOrder />,
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
        path: 'catalog',
        element: <Catalog />,
      },
      {
        path: 'custom',
        element: <MakeYourBouquet />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);