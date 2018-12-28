import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Core from './../services/Core';
const core = new Core();
import WelcomeScreen from './../screens/WelcomeScreen';

class AuthStack extends React.Component {
  constructor(props) {
    super(props);
    let user = core.getCurrentUser();
    this.state = {
      uid: user.uid
    }
  }

  render() {
    if (this.state.uid) {
      this._handleFinishSignIn();
      return null;
    } else if (!this.state.uid) {
      return (
        <WelcomeScreen
          finishSignIn={this._handleFinishSignIn}
          createAccount={this._handleCreateAccount}
          signInAccount={this._handleSignInAccount}
          onError={this._handleWelcomeError}
         />
      )
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
    this.props.navigation.navigate('Main');
  }

  _getUserDataAsync = async () => {
    let uid = core.getCurrentUser().uid;
    // check if user has user data and init if not
    let result = await core.getUserData(uid);
    if (!result.data) {
      core.initUserData(uid);
    }
  }
}

export default createStackNavigator({ Welcome: AuthStack })
