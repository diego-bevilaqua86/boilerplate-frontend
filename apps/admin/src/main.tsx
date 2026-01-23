import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');

if (isNullOrUndefined(container)) {
  throw new Error('No application container was provided.');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
