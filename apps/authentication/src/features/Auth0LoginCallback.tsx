// import { useAuth0 } from '@auth0/auth0-react';
import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { FC, useEffect } from 'react';
import { DefaultRoute } from '../routes/App.route';

export const Auth0LoginCallback: FC<unknown> = () => {
  //   const { getIdTokenClaims, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    const handlePostAuth0Login = async () => {
      const authToken = await window.cookieStore.get('auth-token');
      if (isNullOrUndefined(authToken)) {
        navigate({ to: DefaultRoute.to });
      } else {
        console.log(authToken);
      }
      // if (isAuthenticated) {
      //   const claims = await getIdTokenClaims();
      //   console.log(claims?.__raw);
      // } else {
      //   navigate({ to: DefaultRoute.to })
      // }
    };

    handlePostAuth0Login();
  }, [navigate]);

  return <Trans>Aguarde, redirecionando à aplicação...</Trans>;
};
