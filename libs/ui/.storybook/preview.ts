import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { withContentRequestProvider } from '../src/storybook/decorators/withContentRequestProvider';
import { withI18NProvider } from '../src/storybook/decorators/withI18NProvider';
import { withMantineProvider } from '../src/storybook/decorators/withMantineProvider';
import { withRequestHooksProvider } from '../src/storybook/decorators/withRequestHooksProvider';

export const decorators = [withMantineProvider, withI18NProvider, withContentRequestProvider, withRequestHooksProvider];
