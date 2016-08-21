class ClientDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            pushEvent: props.pushEvent
        };
    }
	
  render() {
    return (
      <View style={{
          flex: 1,
          paddingTop: 80,
          justifyContent: 'flex-start',
          alignItems: 'center'
      }}>
 
        <Text style={styles.welcome}>
          {this.state.pushEvent.id}
        </Text>

        <Text style={styles.welcome}>
          {this.state.pushEvent.name}
        </Text>

        <Text style={styles.welcome}>
          {this.state.pushEvent.address}
        </Text>      

        <Text style={styles.welcome}>
          {this.state.pushEvent.cv}
        </Text>         

        <Text style={styles.welcome}>
          {this.state.pushEvent.description}
        </Text>  
 
      </View>
    );
  }
}