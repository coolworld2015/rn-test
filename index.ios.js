/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

var Login = require('./login');

class DisplayAnImage extends Component {
  render() {
    return (
      <View>
      <Image style={styles.logo}
        source={require('./logo.jpg')}
      />

      </View>
    );
  }
}

class Cool extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Login />
        <DisplayAnImage />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 55,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Cool', () => Cool);
