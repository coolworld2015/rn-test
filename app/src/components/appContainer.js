class AppContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab: 'Clients'
        }
    }

    render(){
      return (
        <TabBarIOS style={styles.AppContainer}>
            <TabBarIOS.Item
                title="Clients"
                selected={this.state.selectedTab == 'Clients'}
        				onPress={()=> this.setState({selectedTab: 'Clients'})}
  					>
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
        				onPress={()=> this.setState({selectedTab: 'Collection'})}
  					>
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
                title="Search"
                selected={this.state.selectedTab == 'Search'}
                onPress={()=> this.setState({selectedTab: 'Search'})}
             >
 
                <NavigatorIOS
                    style={{
                        flex: 1
                    }}
                    initialRoute={{
                        component: Search,
                        title: 'Search'
                    }}
                />
            </TabBarIOS.Item>
        
        </TabBarIOS>
      );
    }
}