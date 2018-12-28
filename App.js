import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

import WelcomeScreen from './screens/WelcomeScreen';

import Core from './services/Core'
const core = new Core();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isSignedIn: false,
  };

  componentDidMount() {
    // if (!core.getCurrentUser().isAnonymous) {
    //   this.setState({ isSignedIn: true })
    // }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else if (this.state.isLoadingComplete && !this.state.isSignedIn) {
      return (
        <WelcomeScreen
          finishSignIn={this._handleFinishSignIn}
          createAccount={this._handleCreateAccount}
          signInAccount={this._handleSignInAccount}
          onError={this._handleWelcomeError}
         />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _handleWelcomeError = (errObj) => {
    core.errorHandler('Welcome screen: ' + errObj);
  }

  _handleCreateAccount = (email, password) => {
    return core.createAccount(email, password);
  }

  _handleSignInAccount = (email, password) => {
    return core.signInAccount(email, password);
  }

  _handleFinishSignIn = () => {
    this.setState({ isSignedIn: true });
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
