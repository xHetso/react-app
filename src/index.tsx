import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Error } from './pages/Error';
import { Wiz } from './pages/Wiz';
import { Main } from './pages/Main';
import { Profile } from './pages/Profile';
import { Layout } from './layout/Layout';

const Education = lazy(() => import('./pages/Education/Education'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<>Загрузка...</>}><Education /></Suspense>
      },
      {
        path: '/wiz',
        element: <Wiz />,
      },
      {
        path: 'Main',
        element: <Main />
      },
      {
        path: 'profile',
        element: <Profile />,
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
