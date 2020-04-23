import React, {Component} from 'react';
import firebase from 'react-native-firebase'
import {Formik} from 'formik';
import * as Yup from 'yup';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Text, Icon, Input, Button, SocialIcon} from 'react-native-elements';
import { VariablesInAllowedPositionRule } from 'graphql';
 

export class ForgotPassword extends Component {

    Login = (values, navigation) => {
       

        firebase.auth().sendPasswordResetEmail(values.email )
          .then(response => {
            //let {user} = response;
            //this.setState({user});
            alert('Sent')
            console.log(response);
            setTimeout(() => {
              this.props.navigation.navigate('LoginScreen');
            }, 2000);
          })
          .catch(err => {
            alert(err);
          });
      };

    

  render() {
    return (
        <KeyboardAvoidingView
        behavior={'padding'}
        enabled
 >
 
   
     
  <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled">
     <Formik
          initialValues={{email: '' }}
          onSubmit={(values, {setSubmitting}) => {
            
            this.Login(values, this.props.navigation);
            setSubmitting(false);
          }}
          validationSchema={SignupSchema} >
          {formikProps => (
            <React.Fragment>
              <View style={styles.wrapper}>
                <Input
                  leftIcon={
                    <Icon
                      name="md-mail"
                      type="ionicon"
                      color="rgba(110, 120, 170, 1)"
                      size={25}
                    />
                  }
                  onChangeText={formikProps.handleChange('email')}
                  placeholder="Email"
                  inputContainerStyle={styles.input}
                  placeholderTextColor="grey"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                />
                {formikProps.errors.email ? (
                  <Text style={{color: 'red'}}>
                    {formikProps.errors.email}
                  </Text>
                ) : null}
                
              </View>
              <View style={styles.socialWrapper}>
                <Text style={styles.signinwith}>Sign in with</Text>
                 
                <Button
                  title="Submit"
                  loading={false}
                  loadingProps={{size: 'small', color: 'white'}}
                  buttonStyle={{
                    backgroundColor: '#7265E3',
                    borderRadius: 15,
                  }}
                  titleStyle={{fontWeight: 'bold', fontSize: 23}}
                  containerStyle={{
                    marginVertical: 10,
                    height: 50,
                    width: 300,
                  }}
                  onPress={formikProps.handleSubmit}
                  disabled={!(formikProps.isValid && formikProps.dirty)}
                  underlayColor="transparent"
                />
                
              </View>
            </React.Fragment>
          )}
        </Formik>
  </ScrollView>
 </KeyboardAvoidingView>   
    )
  }
}

export default ForgotPassword

const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is Required'),
  });

  const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        backgroundColor: '#F4F6FA',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    container: {
      backgroundColor: '#F4F6FA',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },wrapper:{
    },
    input: {
      borderWidth: 1,
      borderColor: 'white',
      borderLeftWidth: 0,
      height: 50,
      width:'90%',
      backgroundColor: 'white',
      marginBottom: 20,
    },socialWrapper: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      socialLogin: {
        flexDirection: 'row',
        marginTop: 10,
      },
}  )
