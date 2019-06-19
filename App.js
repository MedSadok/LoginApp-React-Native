import React, { Component } from 'react';
import { Navigator } from 'react-native';

import Login from './Components/Login';
import Profile from './Components/Profile';
import SignUp from './Components/SignUp';



class Main extends Component {
  render() {
    return (

        <Navigator initialRoute = {{ id: 'Login'}}
         renderScene = {this.navigatorRenderScene}/>

    );
  }

  navigartorRenderScene ( route, navigator ) {
    _navigator = navigator;
    switch (route.id) {
      case 'Login' :
          return (<Login navigator = { navigator } />);
      case 'SignUp' :
          return(<SignUp navigator = { navigator } />);
      case 'Profile' :
          return(<Profile navigator = { navigator } />);
    }
  }
}


export default Main;
