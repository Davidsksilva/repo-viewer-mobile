import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from './pages/Main';
import User from './pages/User';
import WebViewer from './pages/WebViewer';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      WebViewer,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#1890ff',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
