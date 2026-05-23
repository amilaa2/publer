import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { InboxPage } from '../pages/InboxPage';
import { ComposePage } from '../pages/ComposePage';
import { SchedulePage } from '../pages/SchedulePage';
import { PostsPage } from '../pages/PostsPage';
import { BestTimesPage } from '../pages/BestTimesPage';
import { CompetitorsPage } from '../pages/CompetitorsPage';
import { CampaignsPage } from '../pages/CampaignsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/inbox" replace /> },
      { path: 'inbox', element: <InboxPage /> },
      { path: 'compose', element: <ComposePage /> },
      { path: 'compose/:postId', element: <ComposePage /> },
      { path: 'schedule', element: <SchedulePage /> },
      { path: 'posts', element: <PostsPage /> },
      { path: 'analytics/best-times', element: <BestTimesPage /> },
      { path: 'analytics/competitors', element: <CompetitorsPage /> },
      { path: 'campaigns', element: <CampaignsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
