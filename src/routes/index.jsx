import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { LandingPage } from '../pages/LandingPage';
import { ConsumerLoginPage } from '../pages/consumer/ConsumerLoginPage';
import { ConsumerDashboardPage } from '../pages/consumer/ConsumerDashboardPage';
import { LaborerLoginPage } from '../pages/laborer/LaborerLoginPage';
import { LaborerDashboardPage } from '../pages/laborer/LaborerDashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'consumer-login', Component: ConsumerLoginPage },
      { path: 'laborer-login', Component: LaborerLoginPage },
      { path: 'consumer-dashboard', Component: ConsumerDashboardPage },
      { path: 'laborer-dashboard', Component: LaborerDashboardPage },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
