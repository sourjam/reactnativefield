import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';

export default class WelcomeScreen extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    authError: '',
  };

  componentDidMount() {

  }

  render() {
    // TODO break inline styles out
    return (
      <View style={styles.container}>
        <Text>Welcome to a Generic React Native Tracker App!</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputEmail}>
            <Text style={{ width: 70 }}>Email</Text>
            <TextInput
              autoCapitalize={false}
              style={{ width: 150, backgroundColor: 'lightgray' }}
              onChangeText={(inputEmail) => this.setState({ inputEmail })}
              value={this.state.inputEmail}/>
          </View>
          <View style={styles.inputEmail}>
            <Text style={{ width: 70 }}>Password</Text>
            <TextInput
              autoCapitalize={false}
              style={{ width: 150, backgroundColor: 'lightgray' }}
              secureTextEntry={true}
              onChangeText={(inputPassword) => this.setState({ inputPassword })}
              value={this.state.inputPassword}/>
          </View>
          <Button
            onPress={this._createAccount}
            title="Create Account"
          />
          <Button
            onPress={this._signInAccount}
            title="Sign In"
          />
          <Button
            color='red'
            onPress={this.props.finishSignIn}
            title="Dev: Skip Sign In"
          />
        </View>
        <View>
          <Text style={{ color: 'red', height: 50, width: 300 }}>{this.state.authError}</Text>
        </View>
      </View>
    )
  }

  _handleAuthError = (err) => {
    this.props.onError(err)
    let message = err.toString();
    this.setState({authError: message});
  }

  _createAccount = () => {
    this.props.createAccount(this.state.inputEmail, this.state.inputPassword)
      .then(success => {
        this.props.finishSignIn();
      })
      .catch(this._handleAuthError);
  }

  _signInAccount = () => {
    this.props.signInAccount(this.state.inputEmail, this.state.inputPassword)
      .then(success => {
        this.props.finishSignIn();
      })
      .catch(this._handleAuthError);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxHeight: 200,
  },
  inputEmail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 30,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
