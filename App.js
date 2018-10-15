
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import CodePush from "react-native-code-push";

import AppReducer from './src/reducers';
import { AppNavigator, middleware } from './src/navigators/AppNavigator';

const store = createStore(AppReducer, applyMiddleware(middleware));

class ReduxExampleApp extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('ReduxExample', () => ReduxExampleApp);

const codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.ON_NEXT_SUSPEND,
    minimumBackgroundDuration: 60 * 10,
};

const ReduxExample = CodePush(codePushOptions)(ReduxExampleApp);
export default ReduxExample;
