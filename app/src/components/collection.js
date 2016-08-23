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
            showProgress: true
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
                  source={{uri: rowData.pic}}
                  style={styles.img}
              />

              <Text>
                  {rowData.name}
              </Text>
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
          <ListView style={{marginTop: 65}}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
  				/>
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
    img: {
      height: 100,
      width: 100,
      borderRadius: 20,
      margin: 20
    }
});

module.exports = Collection;

AppRegistry.registerComponent('SampleApp', () => Collection);
