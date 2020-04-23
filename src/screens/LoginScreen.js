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
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';

export class LoginScreen extends Component {
  
    async googleLogin() {
       

        try {
          // add any configuration settings here:
          await GoogleSignin.configure(
              {
                webClientId: '764358555998-8l2qjjds8eugovlo2cd9tq7rupgml69c.apps.googleusercontent.com',
               // webClientId:'764358555998-5dkvf464mbig00bd9ig1b00asu6ufvra.apps.googleusercontent.com'
              }
          );
          const data = await GoogleSignin.signIn();
          console.log(data);
          // create a new firebase credential with the token
              
          const credential = firebase.auth.GoogleAuthProvider.credential(
            data.idToken,
            data.accessToken,
          );
          // login with credential
          const firebaseUserCredential = await firebase
            .auth()
            .signInWithCredential(credential);
          console.log(firebaseUserCredential.user.toJSON());
          setTimeout(() => {
            this.props.navigation.navigate('HomeScreen');
        }, 2000);
        } catch (e) {
          console.error(e);
        }
      }

    async FacebookLogin() {
        const result = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
        if (result.isCancelled) {
          throw new Error('User cancelled the login process');
        }
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          throw new Error('Something went wrong obtaining access token');
        }
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken,
        );
        await firebase.auth().signInWithCredential(credential);
        alert('Registration success');
        setTimeout(() => {
            this.props.navigation.navigate('HomeScreen');
        }, 2000);
      }
    Login = (values, navigation) => {
       

        firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then(response => {
            let {user} = response;
            this.setState({user});
            //alert('Registration success');
            setTimeout(() => {
              this.props.navigation.navigate('HomeScreen');
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
         initialValues={{email: '', password: ''}}
         onSubmit={(values, {setSubmitting}) => {
           this.Login(values, this.props.navigation);
           setSubmitting(false);
         }}
         validationSchema={LoginSchema}>
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
               <Input
                 leftIcon={
                   <Icon
                     name="lock"
                     color="rgba(110, 120, 170, 1)"
                     size={25}
                   />
                 }
                 onChangeText={formikProps.handleChange('password')}
                 inputContainerStyle={styles.input}
                 placeholderTextColor="grey"
                 placeholder="Password"
                 autoCapitalize="none"
                 secureTextEntry={true}
                 autoCorrect={false}
                 keyboardType="default"
                 returnKeyType="next"
               />
               {formikProps.errors.password ? (
                 <Text style={{color: 'red'}}>
                   {formikProps.errors.password}
                 </Text>
               ) : null}
             </View>
             <View style={styles.socialWrapper}>
               <Text style={styles.signinwith}>Sign in with</Text>
               <View style={styles.socialLogin}>
               <TouchableOpacity onPress={() => this.FacebookLogin()}>
                      <SocialIcon type="facebook" light />
                    </TouchableOpacity>
                <TouchableOpacity onPress={() => this.googleLogin()}>
                        <SocialIcon type="google" light />
                </TouchableOpacity>
               </View>
               <Button
                 title="Login"
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
               <TouchableOpacity
                 onPress={() =>
                   this.props.navigation.navigate('ForgotPassword')
                 }>
                 <Text h5 style={{textAlign: 'center', color: 'blue'}}>
                   Forgot Password?
                 </Text>
               </TouchableOpacity>
               <TouchableOpacity
                 onPress={() =>
                   this.props.navigation.navigate('EmailInputscreen')
                 }>
                 <Text h5 style={{textAlign: 'center', color: 'blue'}}>
                   Sign up using Email
                 </Text>
               </TouchableOpacity>
             </View>
           </React.Fragment>
         )}
       </Formik>
 </ScrollView>
</KeyboardAvoidingView>   
 
            )
    }
}

const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is Required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
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

export default LoginScreen