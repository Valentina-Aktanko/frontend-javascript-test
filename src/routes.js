import { App } from 'components/App';
// import { Settings } from 'components/Settings';
import { Layout } from 'components/Layout';
import { Settings } from 'components/Settings';

export const routes = [
  {
    path: '/',
    exact: true,
    component: App,
    // render: (props) => {return <App {...props} addr={"bigDataSet"} />}
  },
  {
    path: '/pages/:pageNum',
    exact: true,
    component: App,
  },
  {
    path: '/settings',
    exact: true,
    component: Settings,
  },
];