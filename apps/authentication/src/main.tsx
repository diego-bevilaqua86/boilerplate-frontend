import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@mantine/core/styles.css';

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
