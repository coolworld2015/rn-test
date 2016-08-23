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

class Movies extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        var items = [];
        this.state = {
            dataSource: ds.cloneWithRows(items),
            searchQuery: props.searchQuery,
            showProgress: true
        };

      	this.getCollection();
    }

    getCollection(){
       fetch('https://itunes.apple.com/search?media=movie&term='
             + this.state.searchQuery, {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then((response)=> response.json())
          .then((responseData)=> {
						 console.log(responseData.results)
             this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.results),
               resultsCount: responseData.results.length,
               showProgress: false
             });
       })
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
            <View style={styles.imgsList}>
              <Image
                  source={{uri: rowData.artworkUrl100}}
                  style={styles.img}
              />
                <View>
                    <Text>{rowData.trackName}</Text>
                    <Text>{rowData.country}</Text>
                    <Text>{rowData.primaryGenreName}</Text>
                    <Text>{rowData.artistName}</Text>
              </View>
            </View>
          </TouchableHighlight>
        );
    }

    render(){
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
              	Have founded {this.state.resultsCount} items.
              </Text>
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
    }
});

module.exports = Movies;
