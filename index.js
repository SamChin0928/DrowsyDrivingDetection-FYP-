/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// AppRegistry.registerHeadlessTask('Example', () => ExampleTask);
AppRegistry.registerComponent(appName, () => App);
