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

class UserDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            pushEvent: props.pushEvent,
            name: props.pushEvent.name,
            pass: props.pushEvent.pass,
            description: props.pushEvent.description
        };
    }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>

      <Text style={{
          fontSize: 24,
      		textAlign: 'center',
      		marginTop: 0
      }}>
      		{this.state.name}
      </Text>

      <TextInput
        onChangeText={(text)=> this.setState({name: text})}
        style={styles.loginInput}
        value={this.state.name}
        placeholder="Name">
      </TextInput>

      <TextInput
        style={styles.loginInput}
        value={this.state.pushEvent.id}>
      </TextInput>

      <TextInput
        onChangeText={(text)=> this.setState({name: text})}
        style={styles.loginInput}
        value={this.state.pass}
        placeholder="Password">
      </TextInput>

      <TextInput
        onChangeText={(text)=> this.setState({name: text})}
        style={styles.loginInput}
        value={this.state.description}
        placeholder="Description">
      </TextInput>

      <TouchableHighlight
        //onPress={this.onLoginPressed.bind(this)}
        //onPress={()=> this.addUser()}
        style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableHighlight>

        </View>
      </ScrollView>
    );
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
        backgroundColor: '#F5FCFF',
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

module.exports = UserDetails;
