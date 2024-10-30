import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';
import { Games } from './pages/Games';
import Genre from './pages/Genre';
import { GameDetail } from './pages/GameDetail';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Games />,
      },
      {
        path: '/genre',
        element: <Genre />,
      },
      {
        path: '/games/:id',
        element: <GameDetail />,
      },
    ],
  },
];
export const router = createBrowserRouter(routes);
