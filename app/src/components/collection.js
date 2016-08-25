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

import CollectionDetails from './collectionDetails';

class Collection extends Component {
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

      	this.getCollection();
    }

    getCollection(){
       fetch('http://ui-collection.herokuapp.com/api/items/get', {
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
             })
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
            component: CollectionDetails,
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
                padding: 0,
                alignItems: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                backgroundColor: '#fff'
            }}>
              <Image
                  source={{uri: rowData.pic}}
                  style={{
                         height: 100,
                         width: 100,
                         borderRadius: 20,
                         margin: 20
                        }}
              />
                <View style={{
                             flex: 1,
                             flexDirection: 'column',
                             justifyContent: 'space-between'
                            }}>
                    <Text>{rowData.name}</Text>
              </View>
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
      )
	}
}

const styles = StyleSheet.create({
    imgsList: {
      flex: 1,
      flexDirection: 'row',
      padding: 0,
      alignItems: 'center',
      borderColor: '#D7D7D7',
      borderBottomWidth: 1,
      backgroundColor: '#fff'
    },
    countHeader: {
      fontSize: 16,
      textAlign: 'center',
      padding: 15,
      backgroundColor: '#F5FCFF',
    },
    img: {
      height: 100,
      width: 100,
      borderRadius: 20,
      margin: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

module.exports = Collection;

AppRegistry.registerComponent('SampleApp', () => Collection);
