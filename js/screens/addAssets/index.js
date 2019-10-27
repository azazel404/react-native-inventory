import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Linking,
  Image,
  Button,
  TextInput,
  Alert,
  ScrollView,
  View
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { LinearGradient, ImagePicker, Permissions } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';
import { InputWithShadowRadius } from '../../utils/input';
import color from '../../utils/color';
import { openDrawer } from '.././../actions/drawer';
import {
  Icon,
  Tabs,
  Tab,
  TabHeading,
  Header,
  Form,
  Spinner,
  Item,
  Picker,
  Content,
  Container
} from 'native-base';
import { API_URL } from '../../config';
class AddAssets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraGranted: true,
      mode: 'date',
      cameraStatus: true,
      cameraStatusc: true,
      result: null,
      image: '',
      no_barang: '',
      no_surat: '',
      nama_barang: '',
      description: '',
      status: '',
      merk: '',
      model: '',
      loading: false,
      serial: '',
      kategori: '',
      file: '',
      date: null,
      tahun_produksi: null,
      isDateTimePickerVisible: false
    };
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = date => {
    var dates = moment(date).format('DD YYYY MM');
    var showDate = moment(date).unix();
    this.setState({ tahun_produksi: showDate, date: dates }, () => {
      this._hideDateTimePicker();
    });
  };

  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    console.log(permission);
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === 'granted') {
        this.setState({ cameraStatus: 'granted' });
      }
    } else {
      this.setState({ cameraStatus: 'granted' });
    }
    const permissionc = await Permissions.getAsync(Permissions.CAMERA);
    console.log(permissionc);
    if (permissionc.status !== 'granted') {
      const newPermissionc = await Permissions.askAsync(Permissions.CAMERA);
      if (newPermissionc.status === 'granted') {
        this.setState({ cameraStatusc: 'granted' });
      }
    } else {
      this.setState({ cameraStatusc: 'granted' });
    }
  }
  onValueStatus(e) {
    this.setState({ status: e });
  }
  onValueKateri(e) {
    this.setState({ kategori: e });
  }
  addProduct() {
    this.setState({ loading: true });
    const token = this.props.token;
    const {
      no_barang,
      no_surat,
      nama_barang,
      description,
      status,
      merk,
      model,
      kategori,
      serial,
      tahun_produksi,
      images,
      file
    } = this.state;
    const img = {
      uri: file.uri,
      type: `${file.type}/${file.uri.slice(-3)}`,
      name: `photo${file.uri.slice(-5)}`
    };
    const formData = new FormData();
    formData.append('no_barang', no_barang);
    formData.append('no_surat', no_surat);
    formData.append('nama_barang', nama_barang);
    formData.append('description', description);
    formData.append('status', status);
    formData.append('model', model);
    formData.append('serial', serial);
    formData.append('merk', merk);
    formData.append('kategori', kategori);
    formData.append('tahun_produksi', tahun_produksi);
    formData.append('images', img);

    if (no_barang.length == 0) {
      alert('No Barang Harus di isi !');
    } else if (no_surat.length == 0) {
      alert('No Surat Harus di isi !');
    } else if (nama_barang.length == 0) {
      alert('Nama  Harus di isi !');
    } else if (description.length == 0) {
      alert('Deskripsi  Harus di isi !');
    } else if (status.length == 0) {
      alert('Status  Harus di isi !');
    } else if (merk.length == 0) {
      alert('Merk  Harus di isi !');
    } else if (model.length == 0) {
      alert('Model  Harus di isi !');
    }
    //  else if (serial.length == 0) {
    //   alert('Serial  Harus di isi !');
    // }
    // else if (tahun_produksi.length == 0) {
    //   alert('Tahun Produksi  Harus di isi !');
    // } else if (images.length == 0) {
    //   alert('Images  Harus di isi !');
    // }
    else {
      return axios
        .post(`${API_URL}products/add-product`, formData, {
          headers: {
            'x-access-token': token
          }
        })
        .then(response => {
          if (response) {
            this.setState({ loading: false });
            Actions.assets();
          }
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err);
        });
    }
  }
  useCameraHandler = async () => {
    if (this.state.cameraStatus === 'denied') {
      console.log('denied');
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    } else if (this.state.cameraStatus === 'undetermined') {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    } else if (this.state.cameraStatus === 'granted') {
      console.log('masuk sini');
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [4, 3],
        base64: false
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri, file: result });
      }
    }
  };

  render() {
    console.log(this.state);
    return (
      <Container
        style={{
          marginTop:
            Platform.OS === 'android' ? Constants.statusBarHeight : null
        }}
      >
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
            Tambah Item
          </Text>
        </Header>
        <Content
          style={{
            paddingBottom: responsiveHeight(5)
          }}
        >
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ nama_barang: e })}
              name="Nama"
            />
          </View>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ no_surat: e })}
              name="No Surat"
            />
          </View>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ no_barang: e })}
              name="No Barang"
            />
          </View>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ description: e })}
              name="Deskripsi"
            />
          </View>
          <TouchableOpacity
            onPress={() => this.useCameraHandler()}
            style={{
              marginTop: 10,
              paddingHorizontal: responsiveWidth(5)
            }}
          >
            {this.state.image.length === 0 ? (
              <View
                style={{
                  borderRadius: 8,
                  height: 100,
                  width: 110,
                  borderColor: color.Gray,
                  borderWidth: 0.8,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon name="camera" />
                <Text>Upload</Text>
              </View>
            ) : (
              <Image
                source={{ uri: this.state.image }}
                style={{
                  width: 120,
                  height: 100,
                  resizeMode: 'center'
                }}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ model: e })}
              name="Model"
            />
          </View>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ merk: e })}
              name="Merek"
            />
          </View>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Status"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.status}
                onValueChange={e => this.onValueStatus(e)}
              >
                <Picker.Item label="Bagus" value="Bagus" />
                <Picker.Item label="Rusak" value="Rusak" />
              </Picker>
            </Item>
          </View>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Kategori"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.kategori}
                onValueChange={e => this.onValueKateri(e)}
              >
                <Picker.Item label="L.Inventaris" value="L.Inventaris" />
                <Picker.Item label="L.Kerusakan" value="L.Kerusakan" />
              </Picker>
            </Item>
          </View>
          <TouchableOpacity
            onPress={this._showDateTimePicker}
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <Text
              style={{
                paddingLeft: 5,

                fontWeight: '700'
              }}
            >
              {' '}
              {this.state.tahun_produksi === null
                ? 'Tahun Produksi'
                : this.state.date}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: responsiveHeight(2)
            }}
          >
            <InputWithShadowRadius
              onChange={e => this.setState({ serial: e })}
              name="Serial"
            />
          </View>
          <View
            style={{
              marginTop: 20,
              marginBottom: 50,
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(8),
              width: '100%'
            }}
          >
            <TouchableOpacity
              onPress={() => this.addProduct()}
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
                  ADD ITEM
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Content>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={this.state.mode}
        />
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapState = state => {
  return {
    token: state.user.token
  };
};
export default connect(
  mapState,
  bindAction
)(AddAssets);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: 'white'
  }
});
