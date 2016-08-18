'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
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
 		this.state = {items: items};
  }

  render() {
    return (
      <View style={styles.container} onClick={this.getClients}>
      		<DisplayAnImage />
      		<Login onPress={this.getClients.bind(this)}/>
      					<TouchableHighlight
                    onPress={this.getClients.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>
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
    console.log('request started ...');
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
        	//that.setState({items: [{"id": "1", "name": "item1"}]});
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
