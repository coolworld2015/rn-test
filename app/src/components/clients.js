class Clients extends Component {
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
      
      	this.fetchFeed();
    }

    fetchFeed(){
     var that = this;
       fetch('http://ui-warehouse.herokuapp.com/api/clients/get', {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
        .then(function(response) {
   				console.log('request succeeded !!!');
        	var items = JSON.parse(response._bodyInit);
         
           that.setState({
             dataSource: that.state.dataSource.cloneWithRows(items),
             showProgress: false
           });
       })
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
      if(this.state.showProgress){
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                <ActivityIndicatorIOS
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