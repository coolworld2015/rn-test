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
     var that = this;
       fetch('http://ui-collection.herokuapp.com/api/items/get', {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
        .then(function(response) {
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