import { Outlet, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { Auth0LoginCallback } from '../features/Auth0LoginCallback';
import { LoginWithAuth0 } from '../features/LoginWithAuth0';

export const AuthRoute = createRootRoute({
  component: Outlet,
});


export const DefaultRoute = createRoute({
  getParentRoute: () => AuthRoute,
  path: '/',
  component: LoginWithAuth0,
});

export const Auth0Callback = createRoute({
    getParentRoute: () => AuthRoute,
    path: 'auth0-callback',
    component: Auth0LoginCallback,
})

export const AuthRouteTree = AuthRoute.addChildren([
  DefaultRoute,
  Auth0Callback
]);

export const AuthRouter = createRouter({ routeTree: AuthRouteTree });
