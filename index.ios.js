'use strict'

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView
} from 'react-native';

class Item extends Component {
	render() {
		return (
			<Text style={styles.welcome}>
				 {this.props.id} - {this.props.name}
			 </Text>
		);
	}
}

class Login extends Component {
  render() {
      return (
        <Text style={styles.welcome}>
          CoolWorld !!!
        </Text>
      )
  }
}

class DisplayAnImage extends Component {
  render() {
    return (
      <View>
        <Image style={styles.logo}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
        />
      </View>
    );
  }
}

class Games extends Component{
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      ds:[{AwayTeam: "TeamA", HomeTeam: "TeamB", Selection: "AwayTeam"},{AwayTeam: "TeamC", HomeTeam: "TeamD", Selection: "HomeTeam"}],
      dataSource:ds,
    }
  }

  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.ds),
    })

  }
  pressRow(rowData){

    var newDs = [];
    newDs = this.state.ds;
    newDs[0].Selection = newDs[0] == "AwayTeam" ? "HomeTeam" : "AwayTeam";
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs)
    })

  }

  renderRow(rowData){
    return (
      <TouchableHighlight
        onPress={()=> this.pressRow(rowData)}
        underlayColor = '#ddd'>
        <View style ={styles.row}>
          <Text style={{fontSize:18}}>{rowData.AwayTeam} @ {rowData.HomeTeam} </Text>
          <View style={{flex:1}}>
            <Text style={styles.selectionText}>{rowData[rowData.Selection]}</Text>
          </View>
        </View>
      </TouchableHighlight>

    )
  }
  render(){
    return (
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = {this.renderRow.bind(this)}>
      </ListView>
    );
  }
}
var styles = StyleSheet.create({
  row:{
    flex:1,
    flexDirection:'row',
    padding:18,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  selectionText:{
    fontSize:15,
    paddingTop:3,
    color:'#b5b5b5',
    textAlign:'right'
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    var items = [
     	{"id": "1", "name": "item1"},
      {"id": "2", "name": "item2"},
      {"id": "3", "name": "item3"},
      {"id": "4", "name": "item4"},
      {"id": "5", "name": "item5"}
    ];
 		this.state = {items: []};
  }

  render() {
    return (
      <View style={styles.container}>
      		<DisplayAnImage />
      		<Login/>
      					<TouchableHighlight
                    onPress={this.getClients.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Get Clients</Text>
                </TouchableHighlight>
          <Games />
		      {this.showClients()}
      </View>
    );
  }
  showClients() {
    return this.state.items.map(function(item) {
 				return <Item id={item.id} name={item.name} />
		});
	}
  getClients() {
		this.setState({items: []});
    var that = this;
    console.log('request succeeded with json response');
      fetch('http://ui-warehouse.herokuapp.com/api/clients/get', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(function(response) {
          console.log('request succeeded with json response', JSON.parse(response._bodyInit));
        	var items = JSON.parse(response._bodyInit);
        	that.setState({items: items});
        }).catch(function(error) {
          console.log('request failed', error)
        })

	}
}

const styles = StyleSheet.create({
  logo: {
    width: 166,
    height: 155,
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
    }
});

AppRegistry.registerComponent('Cool', () => App);
