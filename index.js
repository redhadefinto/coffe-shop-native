import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import App from './App';
// import LandingPage from './src/screen/LandingPage';
import {name as appName} from './app.json';
// import WelcomePage from './src/screen/WelcomePage';
// import SignUp from './src/screen/SignUp';
// import Login from './src/screen/Login';
// import Forgot from './src/screen/Forgot';
import App from './App';
// import Router from './router';

AppRegistry.registerComponent(appName, () => App);
