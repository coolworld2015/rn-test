class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render(){
        var errorCtrl = <View />;

        if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>;
        }

        if(!this.state.success && this.state.unknownError){
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>;
        }

        return (
            <View style={styles.container}>
                <Image style={styles.logo} 
          				source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          			/>
                <Text style={styles.heading}>RX-Base</Text>
                <TextInput
                    onChangeText={(text)=> this.setState({username: text})}
                    style={styles.loginInput}
                    placeholder="Login"></TextInput>
                <TextInput
                    onChangeText={(text)=> this.setState({password: text})}
                    style={styles.loginInput}
                    placeholder="Password" secureTextEntry={true}></TextInput>
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>

                {errorCtrl}

                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                 />
            </View>
        )
    }

    onLoginPressed(){
        console.log('Attempting to log in with username ' + this.props.onLogin);
				this.props.onLogin();
    }
}