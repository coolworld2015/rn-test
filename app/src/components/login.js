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

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false,
        }
    }

    getUser(){
           this.setState({
             showProgress: true
           });

      console.log('starting geting user...');
 			fetch('http://ui-warehouse.herokuapp.com/api/users/findByName/'
       + 	this.state.username, {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
 				.then((response)=> response.json())
        .then((responseData)=> {

   				if (this.state.password == responseData.pass) {

               this.setState({
                 badCredentials: false
               });

            	this.props.onLogin().bind(this);

          } else {
             	this.setState({
                 badCredentials: true
             });
          }
       })
         .catch((error)=> {
             this.setState({
               badCredentials: true
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

        if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>;
        }

        if(!this.state.success && this.state.unknownError){
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>;
        }

        return (
          <ScrollView>
            <View style={styles.container}>
                <Image style={styles.logo}
          				source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          			/>
                <Text style={styles.heading}>RX-Test</Text>
                <TextInput
                    onChangeText={(text)=> this.setState({username: text})}
                    style={styles.loginInput}
                    placeholder="Login"></TextInput>
                <TextInput
                    onChangeText={(text)=> this.setState({password: text})}
                    style={styles.loginInput}
                    placeholder="Password" secureTextEntry={true}></TextInput>
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    //onPress={()=> this.getUser()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Log in</Text>
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
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 20,
    },
    container: {
        //backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 150,
        height: 150,
        paddingTop: 140
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
        paddingTop: 10,
        textAlign: 'center'
    }
});

module.exports = Login;
