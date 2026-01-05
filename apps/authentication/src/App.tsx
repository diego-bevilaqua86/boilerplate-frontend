import { Auth0Provider } from '@auth0/auth0-react';
import { I18NProvider } from '@boilerplate-frontend/i18n';
import { BeehusTheme } from '@boilerplate-frontend/ui';
import { MantineProvider } from '@mantine/core';
import { RouterProvider } from '@tanstack/react-router';
import { FC } from 'react';
import { AuthRouter } from './routes/App.route';

export const App: FC<unknown> = () => {
  return (
    <MantineProvider theme={BeehusTheme} key="teste">
      <I18NProvider locale="pt">
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <RouterProvider router={AuthRouter} />
        </Auth0Provider>
      </I18NProvider>
    </MantineProvider>
  );
};
