import React, { Component } from 'react';
import {SafeAreaView,
        TextInput,
        Text,
        Button,
        View,
        TouchableOpacity,
        AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import Profile from './Profile'

class Login extends Component {
  static navigationOptions = {
      title: 'Login',
    };

    constructor(props){
      super(props);
      this.state =  {
        email: '',
        password: ''
      };
    }
  render(){
    return(
      <SafeAreaView style={{ marginTop: 90, padding: 20 }}>

          <React.Fragment>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text style={{ marginBottom: 3 }}>Email</Text>
              <TextInput
                placeholder="Enter Your Email .."
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 10,
                  marginBottom: 3,
                }}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                autoFocus
              />
              <Text style={{ color: 'red' }}>
              </Text>
            </View>

            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text style={{ marginBottom: 3 }}>Password</Text>
              <TextInput
                placeholder="Enter Your Password .."
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 10,
                  marginBottom: 3,
                }}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry
              />
            </View>
            <Button title="Submit" style={{ flex:1, alignItems:'center', justifyContent:'center', width:100}} onPress={this.login}>
                  <Text>Login</Text>
            </Button>
          </React.Fragment>
          <TouchableOpacity style={{ flex:1, alignItems:'center', justifyContent:'center', marginTop:20 }} onPress = {() => this.props.navigation.navigate('SignUp')}>
              <Text>Not a member ? <Text style={{fontWeight: 'bold'}}>Sign Up Now</Text> </Text>
          </TouchableOpacity>
    </SafeAreaView>
  )
  login = () => {

    fetch('exp://cn-tdj.mohamedsadok.loginapp.exp.direct:80/users',{
      method: 'POST',
          headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
      },
          body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
          })
    })

    .then((response) => response.json())
    .then((res) => {

        if (res.success === true) {
          var email = res.message;
          AsyncStorage.setItem('email', email);
          this.props.Navigation.push(this.props.componentId, {
              component: {
                name: 'UserProfile',
                passProps: {
                  text: 'Pushed screen'
                },
                options: {
                  topBar: {
                    title: {
                      text: {email}
                    }
                  }
                }
              }
          });
        } else {
          alert(res.message);
        }
    })
    .done();
  }
}
}
export default Login;
