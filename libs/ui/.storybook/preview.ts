import { withI18NProvider } from '../src/storybook/decorators/withI18NProvider';
import { withMantineProvider } from '../src/storybook/decorators/withMantineProvider';

export const decorators = [withMantineProvider, withI18NProvider];
