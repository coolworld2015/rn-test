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
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

import Movies from './movies';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false
        }
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
            <View style={styles.container}>
          			<TouchableHighlight
                    style={styles.button}>
                    <Text style={styles.buttonText}>Search movies</Text>
                </TouchableHighlight>
          			<TextInput
                    onChangeText={(text)=> this.setState({searchQuery: text})}
                    style={styles.loginInput}
                    placeholder="Search movies">
                </TextInput>

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
        )
    }

    onSearchPressed(){
        this.props.navigator.push({
            component: Movies,
            title: 'Results for ' + this.state.searchQuery,
            passProps: {
                searchQuery: this.state.searchQuery
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginTop: 65
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

module.exports = Search;
