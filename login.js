'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var Login = React.createClass({
  render: function() {
      return (
        <Text style={styles.login}>
          CoolWorld !!!
        </Text>
      )
  }
});

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    color: 'white',
    alignItems: 'center',
    backgroundColor: 'blue',
  }
});
module.exports = Login;
