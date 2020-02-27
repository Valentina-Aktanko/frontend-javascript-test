import { App } from 'components/App';
import { Settings } from 'components/Settings';
import { Layout } from 'components/Layout';

export const routes = [
  {
    path: '/',
    exact: true,
    component: App,
  },
  {
    path: '/page/:pageNum',
    exact: true,
    component: Layout,
  },
  {
    path: '/settings',
    exact: true,
    component: Settings,
  },
];