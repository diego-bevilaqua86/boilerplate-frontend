// import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';
import { FC, MouseEventHandler } from 'react';

const LoginButton: FC<unknown> = () => {
//   const { loginWithRedirect } = useAuth0();

  const handleClick: MouseEventHandler = (event) => {
    // loginWithRedirect({
    //   authorizationParams: {
    //     redirect_uri: 'http://localhost:8080/auth0-callback',
    //     scope: 'openid profile email',
    //     audience: 'task-manager-api',
    //   },
    // });
    window.location.replace('http://localhost:8000/auth/auth0/login')
  };

  return <Button onClick={handleClick}>Log In</Button>;
};

export default LoginButton;
