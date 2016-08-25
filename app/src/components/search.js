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

import Movies from './movies';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render(){
        return (
            <ScrollView>
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
        this.props.navigator.push({
            component: Movies,
            title: this.state.searchQuery,
            passProps: {
                searchQuery: this.state.searchQuery
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        //ackgroundColor: '#F5FCFF',
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

module.exports = Search;
