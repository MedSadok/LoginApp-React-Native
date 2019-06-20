import React, { Component} from 'react';
import {  SafeAreaView,
          TextInput,
          Button,
          ActivityIndicator,
          Text,
          View,
          Switch,
          StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Formik } from 'formik';
import * as yup from 'yup';



const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(2, 'Seems a bit short')
    .max(12),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    })
});

const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
    <Text style={{ marginBottom: 3 }}>{label}</Text>
    {children}
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 3,
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);


class SignUp extends Component {
  static navigationOptions = {
      title: 'Sign Up',
    }
  render(){
    return(
  <SafeAreaView style={{ marginTop: 90 }}>
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={(values, actions) => {
          actions.setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <React.Fragment>
          <StyledInput
            label="Email"
            formikProps={formikProps}
            formikKey="email"
            placeholder="Enter Your Email .."
            autoFocus
          />

          <StyledInput
            label="Password"
            formikProps={formikProps}
            formikKey="password"
            placeholder="Enter Your Password .."
            secureTextEntry
          />

          <StyledInput
            label="Confirm Password"
            formikProps={formikProps}
            formikKey="confirmPassword"
            placeholder="confirm password"
            secureTextEntry
          />

          <StyledSwitch
            label="Agree to Terms"
            formikKey="agreeToTerms"
            formikProps={formikProps}
          />

          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Submit" style={{ marginHorizontal: 20, marginVertical: 5 }} onPress={formikProps.handleSubmit} />
          )}
        </React.Fragment>
      )}
    </Formik>
  </SafeAreaView>
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
  },
  text:{
    fontSize: 16,
    fontWeight:'bold'
  },
  textInput:{
    width: '60%',
    marginBottom:20,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  error:{
    borderColor:'#FF0000'
  },
  btn:{
      backgroundColor: '#67ae55',
      borderColor:'#2c5115'
  }
});


export default SignUp;
