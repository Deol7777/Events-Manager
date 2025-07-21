import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Layouts
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';

// Pages
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import EventsPage from './pages/Events';
import EventDetailPage from './pages/EventDetail';
import EditEventPage from './pages/EditEvent';
import NewEventPage from './pages/NewEvent';
import AuthenticationPage from './pages/Authentication';

// Actions and Loaders
import { action as manipulateEventAction } from './components/EventForm';
import {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import { loader as eventsLoader } from './pages/Events';
import { action as authAction } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';

// Using React Router v6.4+ with data APIs
const routerConfig = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'events',
        Component: EventsRootLayout,
        children: [
          {
            index: true,
            Component: EventsPage,
            loader: eventsLoader,
          },
          {
            path: 'new',
            Component: NewEventPage,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                Component: EventDetailPage,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                Component: EditEventPage,
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
        ],
      },
      {
        path: 'auth',
        Component: AuthenticationPage,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={routerConfig} />;
}
