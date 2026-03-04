import { FC } from 'react';
import { DEFAULT_DASHBOARD_TEMPLATE } from '../../../../utils/src/constants/template';
import { WidgetTemplate } from '../WidgetTemplate/WidgetTemplate';

export const DashboardTemplate: FC = () => (
  <WidgetTemplate layouts={DEFAULT_DASHBOARD_TEMPLATE} />
);