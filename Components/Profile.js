import React, { Component } from 'react';
import {Text,
        StyleSheet,
        View,
        AsyncStorage,
        TouchableOpacity
      } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Login from './Login';


class Profile extends Component {
  static navigationOptions = {
      title: 'Profile',
    }

    state = {
      email: [],
    }

    componentDidMount(){
      this.loadinitialState().done();
    }

    loadinitialState = async() => {
      var value = await AsyncStorage.getItem('email');
      if( value !==null ) {
        this.setState({email: value});
      }
    }

  render(){
    return(
      <View style = { styles.container }>
        <View>
        <TouchableOpacity style={{ flex:1, alignItems:'center', justifyContent:'center', marginTop:20 }} onPress = {() => this.props.navigation.navigate('Login')}>
            <Text style={{fontWeight: 'bold'}}>Home</Text>
        </TouchableOpacity>
        </View>
        <Text style = { styles.header }>Welcome {this.state.email}</Text>
      </View>
    );
  }
}

const styles= StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight:40
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
    color: '#fff'
  }
});


export default Profile;
