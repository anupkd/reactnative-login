import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
  ,TextInput,FlatList
} from 'react-native';
import {Text, Icon,  Button, SocialIcon} from 'react-native-elements';
export class TestScreen extends Component {
 
     
    render() {
        return (
            <View style = {styles.container}>
            <TextInput  
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
              />
               </View>
        );
        }
        }
export default TestScreen

        const styles = StyleSheet.create({
            container: {
              backgroundColor: '#F4F6FA',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
            }});

