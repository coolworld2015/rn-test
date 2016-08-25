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

import ClientDetails from './clientDetails';

class Clients extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        var items = [];
        this.state = {
            dataSource: ds.cloneWithRows(items),
            showProgress: true,
          	resultsCount: 0
        };

      	this.getClients();
    }

    getClients(){
       fetch('http://ui-warehouse.herokuapp.com/api/clients/get', {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
 				.then((response)=> response.json())
        .then((responseData)=> {

           this.setState({
             dataSource: this.state.dataSource.cloneWithRows(responseData),
             resultsCount: responseData.length
           });
       })
         .catch((error)=> {
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

    pressRow(rowData){
        this.props.navigator.push({
            title: rowData.name,
            component: ClientDetails,
            passProps: {
                pushEvent: rowData
            }
        });
    }

    renderRow(rowData){
        return (
          	<TouchableHighlight
                onPress={()=> this.pressRow(rowData)}
                underlayColor='#ddd'
          	>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                padding: 20,
                alignItems: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                backgroundColor: '#fff'
            }}>
              <Text style={{backgroundColor: '#fff'}}>
                  {rowData.name}
              </Text>
            </View>
          </TouchableHighlight>
        );
    }

    render(){
      var errorCtrl = <View />;

        if(this.state.serverError){
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

      if(this.state.showProgress){
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                <ActivityIndicator
                    size="large"
                    animating={true} />
            </View>
        );
      }
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{marginTop: 60}}>
              <Text style={styles.countHeader}>
              	{this.state.resultsCount} entries were found.
              </Text>

          	{errorCtrl}

            </View>

            <ScrollView style={{marginTop: 0, marginBottom: 60}}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
              />
    				</ScrollView>
  			  </View>
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
    countHeader: {
      fontSize: 16,
      textAlign: 'center',
      padding: 15,
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 20,
    },
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
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
        paddingTop: 10,
        textAlign: 'center'
    }
});

module.exports = Clients;
