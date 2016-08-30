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

import PhoneSearchResults from './phoneSearchResults';

class PhoneSearch extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render(){
      var errorCtrl = <View />;

      if(this.state.serverError){
          errorCtrl = <Text style={styles.error}>
              Something went wrong.
          </Text>;
      }

      var validCtrl = <View />;

      if(this.state.invalidValue){
          validCtrl = <Text style={styles.error}>
              Value required - please provide.
          </Text>;
      }

        return (
            <ScrollView>
            <View style={styles.container}>
          			<TouchableHighlight
                    style={styles.button}>
                    <Text style={styles.buttonText}>Search phones</Text>
                </TouchableHighlight>
          			<TextInput
                    onChangeText={(text)=> this.setState({
                      searchQuery: text,
                      invalidValue: false
                  })}
                    style={styles.loginInput}
                    placeholder="Search phones">
                </TextInput>

                {validCtrl}

                <TouchableHighlight
                    onPress={this.onSearchPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Search</Text>
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

    onSearchPressed(){
      if (this.state.searchQuery == undefined) {
        this.setState({
            invalidValue: true
        });
      return;
      }

      this.props.navigator.push({
          component: PhoneSearchResults,
          title: this.state.searchQuery,
          rightButtonTitle: 'Cancel',
          onRightButtonPress: () => {
              this.props.navigator.pop()
          },
          passProps: {
              searchQuery: this.state.searchQuery
          }
      });
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginTop: 10
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: 'gray'
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

module.exports = PhoneSearch;
