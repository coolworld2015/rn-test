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
    ActivityIndicatorIOS,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

import Login from './login';
import Clients from '../clients/clients';
import Collection from '../collection/collection';
import Search from '../movies/search';
import Phones from '../phones/phones';
import PhoneSearch from '../phones/phoneSearch';
import Users from '../users/users';
import UserAdd from '../users/userAdd';

class AppContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab: 'Users'
        }
    }

    render(){
      return (
        <TabBarIOS style={styles.AppContainer}>
            <TabBarIOS.Item
                title="Clients"
                selected={this.state.selectedTab == 'Clients'}
        				onPress={()=> this.setState({selectedTab: 'Clients'})}>

        				<NavigatorIOS
                    style={{
                        flex: 1
                    }}
                    initialRoute={{
                        component: Clients,
                        title: 'Clients'
                    }}
                />
            </TabBarIOS.Item>

            <TabBarIOS.Item
                title="Collection"
                selected={this.state.selectedTab == 'Collection'}
        				onPress={()=> this.setState({selectedTab: 'Collection'})}>

                <NavigatorIOS
                    style={{
                        flex: 1
                    }}
                    initialRoute={{
                        component: Collection,
                        title: 'Collection'
                    }}
                />
            </TabBarIOS.Item>

            <TabBarIOS.Item
                 title="Phones"
                 selected={this.state.selectedTab == 'Phones'}
         				 onPress={()=> this.setState({selectedTab: 'Phones'})}>

                 <NavigatorIOS
                     style={{
                         flex: 1
                     }}
                     ref="phones"
                     initialRoute={{
                         component: Phones,
                         title: 'Phones',
                         rightButtonTitle: 'Search',
                         onRightButtonPress: () => {
                             this.refs.phones.navigator.push({
                                 title: "Search",
                                 component: PhoneSearch,
                                 rightButtonTitle: 'Cancel',
                                 onRightButtonPress: () => { this.refs.phones.navigator.pop(); }
                               });
 												}
                     }}
                 />
             </TabBarIOS.Item>

             <TabBarIOS.Item
                  title="Users"
                  selected={this.state.selectedTab == 'Users'}
          				 onPress={()=> this.setState({selectedTab: 'Users'})}>

                  <NavigatorIOS
                      style={{
                          flex: 1
                      }}
                      ref="users"
                      initialRoute={{
                          component: Users,
                          title: 'Users',
                          leftButtonTitle: 'Add',
                          onLeftButtonPress: () => {
                              this.refs.users.navigator.push({
                                  title: "Add",
                                  component: UserAdd,
                                  rightButtonTitle: 'Cancel',
                                  onRightButtonPress: () => { this.refs.users.navigator.pop(); }
                                });
  												}
                      }}
                  />
              </TabBarIOS.Item>

            <TabBarIOS.Item
                title="Movies"
                selected={this.state.selectedTab == 'Movies'}
                onPress={()=> this.setState({selectedTab: 'Movies'})}>

                <NavigatorIOS
                    style={{
                        flex: 1
                    }}
                    ref="search"
                    initialRoute={{
                        component: Search,
                        title: 'Movies',
                        leftButtonTitle: 'Add',
                        rightButtonTitle: 'New',
                        onRightButtonPress: () => {
                            this.refs.search.navigator.push({
                              title: "Users",
                              component: Users,
                              rightButtonTitle: 'Cancel',
                              onRightButtonPress: () => { this.refs.search.navigator.pop(); }
                            });
                       }
                		}}
               />
            </TabBarIOS.Item>

        </TabBarIOS>
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
        paddingTop: 10
    }
});

module.exports = AppContainer;
