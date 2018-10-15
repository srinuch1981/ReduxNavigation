import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const RootNavigator = createStackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen },
},
    {
        initialRouteName: "Main",
        headerMode: "none",
    },);



const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

// create nav component
class ReduxNavigation extends PureComponent {

    render() {
        const { dispatch, state } = this.props;
        return <AppWithNavigationState dispatch={dispatch} state={state} />;
    }
}


const mapNavStateProps = state => ({
    state: state.nav
});

const  AppNavigator = connect(mapNavStateProps)(ReduxNavigation);


export { RootNavigator, AppNavigator, middleware };
