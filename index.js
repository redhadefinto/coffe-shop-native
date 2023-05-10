/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import App from './App';
// import LandingPage from './src/screen/LandingPage';
import {name as appName} from './app.json';
// import WelcomePage from './src/screen/WelcomePage';
// import SignUp from './src/screen/SignUp';
// import Login from './src/screen/Login';
// import Forgot from './src/screen/Forgot';
<<<<<<< HEAD
// import App from './App';
import Router from './router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/store';
const AppWithRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithRedux);
=======
import App from './App';
// import Router from './router';

AppRegistry.registerComponent(appName, () => App);
>>>>>>> 8a77d586cc030efa552b475fd6b08084f6b73dcd
