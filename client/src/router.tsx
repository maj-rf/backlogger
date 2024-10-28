import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';

export const routes: RouteObject[] = [
  { path: '/', element: <RootLayout />, errorElement: <ErrorPage /> },
];
export const router = createBrowserRouter(routes);
