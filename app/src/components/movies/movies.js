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

import MoviesDetails from './moviesDetails';

class Movies extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            searchQuery: props.searchQuery,
            showProgress: true,
						resultsCount: 0
        };

      	this.getMovies();
    }

    getMovies(){
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
               responseData: responseData.results
             });
         /*
         this.props.navigator.replace({
               component: Movies,
               title: this.state.resultsCount
             });
				*/
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
            title: rowData.trackName,
            component: MoviesDetails,
            rightButtonTitle: 'Cancel',
            onRightButtonPress: () => {
                this.props.navigator.pop()
            },
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
                  source={{uri: rowData.artworkUrl100.replace('100x100bb.jpg', '500x500bb.jpg')}}
                  style={styles.img}
              />
                <View style={{
                             flex: 1,
                             flexDirection: 'column',
                             justifyContent: 'space-between'
                            }}>
                    <Text>{rowData.trackName}</Text>
              			<Text>{rowData.releaseDate.split('-')[0]}</Text>
                    <Text>{rowData.country}</Text>
                    <Text>{rowData.primaryGenreName}</Text>
                    <Text>{rowData.artistName}</Text>
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
              <TextInput style={{
                  height: 45,
                  marginTop: 5,
                  padding: 5,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 0,
          				}}
              onChangeText={(text)=> {
                  var arr = [].concat(this.state.responseData);
                  var items = arr.filter((el) => el.trackName.indexOf(text) >= 0);
                  this.setState({
                     dataSource: this.state.dataSource.cloneWithRows(items),
                     resultsCount: items.length,
                  })
                }}
                placeholder="Search">
              </TextInput>

          	{errorCtrl}

            </View>

          <ScrollView style={{marginTop: 0, marginBottom: 0}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />
  				</ScrollView>

          <View style={{marginBottom: 49}}>
            <Text style={styles.countFooter}>
              {this.state.resultsCount} entries were found.
            </Text>
          </View>

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
  	countFooter: {
      fontSize: 16,
      textAlign: 'center',
      padding: 10,
      borderColor: '#D7D7D7',
      backgroundColor: 'whitesmoke'
    },
    img: {
      height: 95,
      width: 75,
      borderRadius: 20,
      margin: 20
    },
    error: {
      color: 'red',
      paddingTop: 10,
      textAlign: 'center'
    }
});

module.exports = Movies;
