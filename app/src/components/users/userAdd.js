'use strict'

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

import Users from './users';

class UserAdd extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false,
          	name: 'ed'
        }
    }

    addUser(){
      this.setState({
       showProgress: true
      });

      var id = (Math.random() * 1000000).toFixed();

 			fetch('http://ui-base.herokuapp.com/api/users/add/', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                name: this.state.name,
                pass: this.state.pass,
                description: this.state.description
              }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
          })
 				.then((response)=> response.json())
        .then((responseData)=> {

          this.props.navigator.push({
              title: 'Users',
              component: Users
          });
            //  this.props.navigator.pop();
       })
         .catch((error)=> {
           console.log(error);
             this.setState({
               serverError: true
             });
       })
         .finally(()=> {
           this.setState({
             showProgress: false
           });
 				});
    }

    render(){
        var errorCtrl = <View />;

        if(this.state.serverError){
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        return (
          <ScrollView>
            <View style={styles.container}>

            <Text style={{
                fontSize: 24,
            		textAlign: 'center',
            		marginTop: 0
            }}>
          				Add user
                </Text>

                <TextInput
                    onChangeText={(text)=> this.setState({name: text})}
                    style={styles.loginInput}
                    placeholder="Name"></TextInput>
                <TextInput
                    onChangeText={(text)=> this.setState({pass: text})}
                    style={styles.loginInput}
                    placeholder="Password"></TextInput>
                <TextInput
                    onChangeText={(text)=> this.setState({description: text})}
                    style={styles.loginInput}
                    placeholder="Description"></TextInput>

                <TouchableHighlight
                    onPress={()=> this.addUser()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>

                {errorCtrl}

                <ActivityIndicator
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                 />
            </View>
          </ScrollView>
        )
    }

    onLoginPressed(){
				this.props.onLogin();
    }
}

const styles = StyleSheet.create({
    AppContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 20,
    },
    container: {
        //backgroundColor: '#F5FCFF',
        paddingTop: 10,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height: 65
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

module.exports = UserAdd;
