import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  TextInput,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

import firebaseSDK from '../config/firebaseSDK';

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      auth_data: [],
      matches: [],
      uid: '',
      uname: '',
      uemail: '',
    };
    // if (firebaseSDK.signedIn()) {
    //   this._retrieveData();
    //   this.getAllMatches();
    // }
    // console.log();
  }

  UNSAFE_componentWillMount = () => {
      this._retrieveData();
      this.getAllMatches();
  }

  _retrieveData = async () => {
    console.log(this.props.route.params.name)
    // console.log("A");
    // console.log(this.props);
    // console.log("B");
    //console.log(this.props.route.params.email);
    let name = this.props.route.params.name;
    //console.log(name);
    // Probably change email to username or screen name
    let email = this.props.route.params.email;
    let avatar = this.props.route.params.avatar;
    let u_id = firebaseSDK.uid;
    let _id = firebaseSDK.uid;
  };

  getAllMatches() {
    var name = this.props.route.params.name;
//    console.log('in get user interests');
//    console.log(firebaseSDK.displayName);
    var data;
    let apiEndpoint =
      'http://mobile-app.ddns.uark.edu/CRUDapis/interaction/getMatches?USER_id=' + name;
    console.log(apiEndpoint);
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint)
      .then((response) => response.text())
      .then((json) => {
        // parse the response & extract data
        data = JSON.parse(json);
        console.log(data);
        this.setState({ matches: data.result });
        console.log("----------------")
 //       console.log(this.state.matches)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (data.isError === false) {
          console.log('we got the data!');
        }
        //   this.setState({interestsLoaded: true})
        // if successful addition to db, navigate to create profile
        console.log('finally block');
      });
  }

  render() {
    
    var matches = this.state.matches;
    console.log("IN RENDER");
    console.log(this.props.route.params.name);
    //console.log(matches instanceof Array);
    let Data = this.state.auth_data;
    let User = matches.map((match) => {
      return (
        <View style={styles.backarrow}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Chat', {
                name: this.props.route.params.name,
                avatar: this.props.route.params.avatar,
                uname: match
              })
            }>
            <View style={styles.list}>
              <View style={styles.forwidth_left}>
                <TouchableOpacity>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 87,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                    source={require('../Images/no_image.jpg')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.forwidth_right}>
                <Text style={styles.price}> {match} </Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    });

    console.log(User);


    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.top_header}>
            <TouchableOpacity>
              <Image
                style={styles.nav_icon}
                source={require('../Images/nav.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.search_header}>
                <Image
                  style={styles.search_icon}
                  source={require('../Images/search.png')}
                />
                <TextInput
                  style={styles.search_box}
                  keyboardType="web-search"
                  placeholder="search name"
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.home_padding}>
          {/* // SCROLLVIEW HERE */}
          <ScrollView>{User}</ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  backarrow: {
    paddingBottom: 50,
    flexDirection: 'row',
  },
  top_header: {
    backgroundColor: '#ffffff',
    padding: 10,
    flexDirection: 'row',
  },
  nav_icon: {
    width: 40,
    height: 40,
  },
  search_header: {
    width: screenWidth - 100,
    flexDirection: 'row',
  },
  search_icon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  search_box: {
    //height: 40,
    paddingTop: 10,
    //paddingBottom: 5,
    borderBottomColor: '#fff',
    color: '#000000',
    fontSize: 15,
    opacity: 1,
    width: screenWidth - 200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    //fontFamily:"Poppins"
  },
  home_padding: {
    padding: 10,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  forwidth_left: {
    width: '30%',
    //paddingBottom:30
  },
  forwidth_right: { width: '50%' },
  price: { color: '#0b85bd', fontSize: 18 /* paddingTop:20 */ },
  carname: { color: '#010000', fontSize: 10 },
  list: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#e3e3e1',
    // borderBottomWidth:2 ,
    paddingTop: 0,
    paddingBottom: 0,
    //marginTop: 3,
    //width: screenWidth / 2 - 30,
    //marginRight: 20
  },
});
