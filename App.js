import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Profile from './components/profile';
import SignUp from './components/SignUp'
import Login from './components/login';


const Application = StackNavigator({
  Home: { screen: Login },
  Profile: { screen: Profile },
  SignUp: { screen: SignUp }
  }, {
        navigationOptions: {
            header: false
  }
});

const MainApp = createAppContainer(Application);

export default class App extends Component {
  render() {
    return (
      <MainApp />
    );
  }
}


export default Main;
