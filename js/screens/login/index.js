import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Linking,
  Button,
  TextInput,
  Alert,
  ScrollView,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { LinearGradient, ImagePicker, Permissions } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { Spinner } from 'native-base';
import { InputWithShadowRadius } from '../../utils/input';
import { signin } from '../../actions/user';
import color from '../../utils/color';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    };
  }
  onSubmit() {
    this.setState({ loading: true });
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props
      .signin(data)
      .then(res => {
        this.setState({ loading: false });
        if (res.data.first_login === true) {
          Actions.detailUser();
        } else {
          if (res.resp) {
            Actions.home();
          } else {
            alert('Login gagal');
          }
        }
      })
      .catch(err => {
        alert('Ada kesalahan !');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(10)
          }}
        >
          <Text
            style={{
              fontSize: responsiveFontSize(5)
            }}
          >
            Login{' '}
          </Text>
        </View>
        <View
          style={{
            width: '100%'
          }}
        >
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ email: e })}
              type="text"
              name="Username"
            />
          </View>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ password: e })}
              type="password"
              name="Password"
            />
          </View>
          <View
            style={{
              zIndex: 1,
              marginTop: responsiveHeight(2),
              justifyContent: 'center',
              alignItems: 'center',

              width: '100%'
            }}
          >
            <TouchableOpacity
              onPress={() => this.onSubmit()}
              style={{
                backgroundColor: color.Blue,
                justifyContent: 'center',
                width: '100%',
                paddingVertical: 13,
                borderRadius: 20,
                alignItems: 'center'
              }}
            >
              {this.state.loading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30
                  }}
                >
                  <Spinner size="small" color="white" />
                </View>
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,

                    fontWeight: '700'
                  }}
                >
                  MASUK
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    signin: data => dispatch(signin(data))
  };
}
export default connect(
  null,
  bindAction
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
