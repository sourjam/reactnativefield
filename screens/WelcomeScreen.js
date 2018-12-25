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
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputPassword: '',
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to an App!</Text>
        <View style={styles.inputEmail}>
          <Text style={{ width: 100 }}>Email</Text>
          <TextInput
          style={{ width: 100, backgroundColor: 'lightgray' }}
          onChangeText={(inputEmail) => this.setState({ inputEmail })}
          value={this.state.inputEmail}/>
        </View>
        <View style={styles.inputEmail}>
          <Text style={{ width: 100 }}>Password</Text>
          <TextInput
          style={{ width: 100, backgroundColor: 'lightgray' }}
          onChangeText={(inputPassword) => this.setState({ inputPassword })}
          value={this.state.inputPassword}/>
        </View>
        <Button
          onPress={this.props.onSignIn}
          title="Simulate Log In"
        />
      </View>
    )
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
  inputEmail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 20,
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
