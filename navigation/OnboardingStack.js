import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Core from './../services/Core';
const core = new Core();

import OnboardingScreen from './../screens/OnboardingScreen';

const onboardingScreens = [
  'Username',
  'Bodytype',
  'Allergies',
]

class OnboardingStack extends React.Component {
  constructor(props) {
    super(props)
    this.name = props.navigation.state.routeName;
    this.nextIndex = onboardingScreens.indexOf(this.name) + 1
    this.nextName = onboardingScreens[this.nextIndex];
  }
  render() {
    const goToNext = this.nextName ? `Go To ${this.nextName}` : 'Done';
    return(
      <View>
        <Text>Enter Your {this.props.navigation.state.routeName}</Text>
        <Button
          onPress={this._goToNext}
          title={goToNext}
        />
      </View>
    )
  }

  _goToNext = () => {
    const goToNext = this.nextName ? this.nextName : 'Main';
    this.props.navigation.navigate(goToNext, {

    });
  }
}

export default createStackNavigator({
  Username: {
    screen: OnboardingStack,
  },
  Bodytype: {
    screen: OnboardingStack,
  },
  Allergies: {
    screen: OnboardingStack,
  },
  Finish: {
    screen: OnboardingStack,
  }
},{
  initialRouteName: 'Username',
});
