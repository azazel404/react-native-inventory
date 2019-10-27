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
import { updateUser } from '../../actions/user';
import { Spinner } from 'native-base';
import { InputWithShadowRadius } from '../../utils/input';
import color from '../../utils/color';
class DetailUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      loading: false
    };
  }
  onSubmit() {
    this.setState({ loading: true });
    const data = {
      name: this.state.name,
      password: this.state.password,
      id: this.props.me.id,
      token: this.props.token
    };
    this.props.updateUser(data).then(res => {
      this.setState({ loading: false });
      if (res.resp) {
        alert('Berhasil ');
        setTimeout(() => {
          Actions.home();
        }, 300);
      } else {
        alert(' Gagal');
      }
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
            Tambah Pengguna{' '}
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
              onChange={e => this.setState({ name: e })}
              name="Nama"
            />
          </View>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ password: e })}
              name="Password Baru"
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
                  UPDATE
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
    updateUser: data => dispatch(updateUser(data))
  };
}
const mapState = state => {
  return {
    token: state.user.token,
    me: state.user.me
  };
};
export default connect(
  mapState,
  bindAction
)(DetailUser);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
