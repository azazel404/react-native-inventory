import React from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { getAllUser, deleteUser } from '../../actions/user';
import {
  Container,
  Header,
  Content,
  SwipeRow,
  Button,
  Left,
  Body,
  Spinner,
  Icon,
  List,
  ListItem
} from 'native-base';

import color from '../../utils/color';
import { Actions } from 'react-native-router-flux';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      loading: true
    };
  }
  componentDidMount() {
    this.props.getAllUser({ data: this.props.token }).then(res => {
      if (res.resp) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (
  //     this.props.user.deletedUser !== nextProps.user.deletedUser &&
  //     nextProps.user.deletedUser
  //   ) {
  //     this.setState({ loading: false });
  //   }
  // }
  deleteRow(id) {
    this.setState({ loading: true });
    const data = {
      id: id,
      token: this.props.token
    };
    this.props.deleteUser(data).then(res => {
      if (res.resp) {
        this.props.getAllUser({ data: this.props.token }).then(res => {
          if (res.resp) {
            this.setState({ loading: false });
          } else {
            this.setState({ loading: false });
          }
        });
      }
    });
  }
  render() {
    console.log(this.props.list);

    return (
      // <View style={styles.container}>

      <Container
        style={{
          marginTop:
            Platform.OS === 'android' ? Constants.statusBarHeight : null
        }}
      >
        <TouchableOpacity
          onPress={() => Actions.add_users()}
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            bottom: 50,
            right: 15,
            zIndex: 1,
            backgroundColor: color.Blue,
            height: 60,
            width: 60,
            borderRadius: 30,
            shadowOpacity: 0.3,
            shadowRadius: 5,
            shadowOffset: { width: 3, height: 3 },
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Icon
            name="add"
            style={{
              color: 'white',
              fontSize: responsiveFontSize(5)
            }}
          />
        </TouchableOpacity>
        <Header
          style={{
            backgroundColor: color.Blue,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() => Actions.pop()}
            activeOpacity={0.8}
            style={{
              position: 'absolute',
              left: 15,
              backgroundColor: color.Blue,
              height: 44,
              width: 44,
              borderRadius: 22,
              shadowOpacity: 0.3,
              shadowRadius: 5,
              shadowOffset: { width: 3, height: 3 },
              elevation: 5,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon
              name="arrow-back"
              style={{
                color: 'white',
                fontSize: responsiveFontSize(3)
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              color: 'white'
            }}
          >
            Pengguna
          </Text>
        </Header>
        <Content>
          {this.state.loading ? (
            <Spinner color="blue" />
          ) : (
            this.props.list.map(data => {
              if (data._id === this.props.user.me.id) {
                return;
              } else {
                console.log('masuk heh');
                console.log(data);
                return (
                  <SwipeRow
                    key={data._id}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    left={
                      <Button success onPress={() => alert('Add')}>
                        <Icon active name="add" />
                      </Button>
                    }
                    body={
                      <View
                        style={{
                          paddingHorizontal: 10,
                          flexDirection: 'row',
                          marginVertical: 3,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Icon name="contact" />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontWeight: '600',
                            letterSpacing: 1
                          }}
                        >
                          {data.name}
                        </Text>
                      </View>
                    }
                    right={
                      <Button danger onPress={() => this.deleteRow(data._id)}>
                        <Icon active name="trash" />
                      </Button>
                    }
                  />
                );
              }
            })
          )}
        </Content>
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
    getAllUser: data => dispatch(getAllUser(data)),
    deleteUser: data => dispatch(deleteUser(data))
  };
}
const mapState = state => {
  return {
    token: state.user.token,
    list: state.user.list,
    user: state.user
  };
};
export default connect(
  mapState,
  bindAction
)(Accounts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
