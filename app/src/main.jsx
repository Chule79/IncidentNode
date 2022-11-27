import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './GlobalStyle';
import Home from './routes/Home';
import Login from './routes/Login';
import Root from './routes/Root';
import theme from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },

      {
        path: 'login',
        element: <Login />,
      },
      /* {

        path: 'admin',
        element: <Admin />,
      },
      {
        path: 'admin/incident',
        element: <AdminIncident />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },*/
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
