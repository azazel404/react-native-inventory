import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
  Image,
  ScrollView,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import Drawer from '../../NavigationDrawer';
import SafeAreaView from 'react-native-safe-area-view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import moment from 'moment';
import color from '../../utils/color';
import { Actions } from 'react-native-router-flux';
import { openDrawer } from '.././../actions/drawer';
import Login from '../login';
import {
  Icon,
  Tabs,
  Left,
  Right,
  ListItem,
  Body,
  Tab,
  TabHeading,
  Content
} from 'native-base';
import NoAvailable from './noavailable_assets';
import { getAllProduct } from '../../actions/product';
import { API_URL } from '../../config';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: [],
      data: [],
      searchActive: false
    };
  }
  componentDidMount() {
    this.props.getAllProduct(this.props.token).then(res => {});
  }
  _handleSearch(e) {
    this.setState(
      {
        data: this.props.product,

        searchActive: true
      },
      () => {
        this.setState({
          searchData: this.state.data.filter(
            item => item.nama_barang.toUpperCase().indexOf(e.toUpperCase()) > -1
          )
        });
      }
    );
  }
  render() {
    if (this.props.token === null) {
      return <Login />;
    } else {
      var arr = this.props.product.reverse();
      var newArr = arr.length > 2 ? arr.slice(0, 2) : arr;

      return (
        <Drawer>
          <View style={styles.container}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color.Blue,
                zIndex: 1,
                borderBottomEndRadius: responsiveWidth(5),
                borderBottomStartRadius: responsiveWidth(5),
                paddingHorizontal: responsiveWidth(5),
                height: responsiveHeight(25)
              }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 40,
                  left: 15,
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
                activeOpacity={0.8}
                onPress={() => this.props.openDrawer()}
              >
                <Icon
                  name="menu"
                  style={{
                    color: 'white',
                    fontSize: responsiveFontSize(5)
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Actions.add_assets()}
                activeOpacity={0.8}
                style={{
                  position: 'absolute',
                  top: 40,
                  right: 15,
                  backgroundColor: 'white',
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
                  name="add"
                  style={{
                    color: color.Black,
                    fontSize: responsiveFontSize(5)
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  position: 'absolute',
                  backgroundColor: 'white',
                  zIndex: 1,
                  shadowColor: '#000000',
                  borderRadius: 8,
                  shadowOffset: { width: 0, height: 3 },
                  shadowRadius: 5,
                  shadowOpacity: 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: responsiveWidth(5),
                  bottom: -responsiveHeight(6),
                  height: responsiveHeight(12)
                }}
              >
                <View
                  style={{
                    width: '100%',
                    paddingVertical: 5,
                    flexDirection: 'row',
                    borderColor: color.Gray,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    borderWidth: 1
                  }}
                >
                  <Icon
                    name="search"
                    style={{
                      color: color.Gray,
                      fontSize: responsiveFontSize(4)
                    }}
                  />
                  <View
                    style={{
                      paddingLeft: 20,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <TextInput
                      placeholder="Search"
                      ref={input => {
                        this.textInput = input;
                      }}
                      onFocus={() =>
                        this.setState({
                          searchActive: true
                        })
                      }
                      onChangeText={e => this._handleSearch(e)}
                      style={{
                        fontSize: responsiveFontSize(2),

                        zIndex: 1
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.textInput.clear();
                      this.setState({
                        searchActive: false,
                        searchData: []
                      });
                    }}
                    style={{
                      position: 'absolute',
                      right: 20
                    }}
                  >
                    <Icon
                      name="close-circle-outline"
                      style={{
                        color: color.Gray,
                        fontSize: responsiveFontSize(4)
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  position: 'absolute',
                  backgroundColor: 'white',
                  height: this.state.searchActive ? 400 : 0,
                  paddingHorizontal: responsiveWidth(5),
                  top: responsiveHeight(28),
                  zIndex: 3
                }}
              >
                {this.state.searchData.map((data, i) => {
                  return (
                    <ListItem
                      onPress={() => Actions.detail_asets(data)}
                      key={i}
                      style={{
                        height: 50
                      }}
                      icon
                    >
                      <Left>
                        <Icon
                          style={{
                            fontSize: 22,
                            color: color.Gray,
                            fontWeight: '700'
                          }}
                          active
                          name="archive"
                        />
                      </Left>
                      <Body>
                        <Text
                          style={{
                            fontSize: 22,
                            color: color.Gray,
                            fontWeight: '700'
                          }}
                        >
                          {data.nama_barang}
                        </Text>
                      </Body>
                      <Right>
                        <Icon active name="arrow-forward" />
                      </Right>
                    </ListItem>
                  );
                })}
              </View>
            </View>

            <View
              style={{
                width: '100%',
                marginTop: responsiveHeight(6.5),
                paddingHorizontal: responsiveWidth(5),
                paddingBottom: responsiveHeight(10)
              }}
            >
              <ScrollView contentContainerStyle={{}}>
                <View
                  style={{
                    paddingBottom: 15
                  }}
                >
                  <Text
                    style={{
                      color: color.Gray,
                      fontWeight: '700'
                    }}
                  >
                    Data Terbaru
                  </Text>
                </View>
                {newArr.map((data, key) => {
                  return (
                    <TouchableOpacity
                      onPress={() => Actions.detail_asets(data)}
                      key={key}
                      style={{
                        width: '100%',
                        height: responsiveHeight(15),
                        marginTop: responsiveHeight(2),
                        backgroundColor: 'white',
                        shadowColor: '#000000',
                        borderRadius: 8,

                        marginVertical: 8,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 5,
                        shadowOpacity: 0.4
                      }}
                    >
                      <View
                        style={{
                          flex: 3
                        }}
                      >
                        <Image
                          source={{
                            uri: `${API_URL}images/${data.images.slice(
                              25,
                              data.images.length
                            )}`
                          }}
                          style={{
                            width: null,
                            borderRadius: 10,
                            height: null,
                            flex: 1
                          }}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            top: 1,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderTopRightRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            borderBottomRightRadius: 8,
                            backgroundColor: 'white'
                          }}
                        >
                          <View
                            style={{
                              width: 8,
                              height: 8,
                              right: 4,
                              marginLeft: 3,
                              borderRadius: 4,
                              backgroundColor: 'green'
                            }}
                          />
                          <Text
                            style={{
                              color: color.Gray
                            }}
                          >
                            {data.status}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 4,
                          padding: 8
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: color.Gray,
                            fontWeight: '600',
                            marginBottom: 8
                          }}
                        >
                          {data.nama_barang}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: color.Gray,
                            fontWeight: '500'
                          }}
                        >
                          {data.description}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: color.Gray,
                            fontWeight: '500'
                          }}
                        >
                          {data.model}
                        </Text>
                        <View
                          style={{
                            width: '100%',
                            paddingVertical: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              backgroundColor: colors.tabBlue,
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                              borderRadius: 6
                            }}
                          >
                            <Text
                              style={{
                                color: 'red'
                              }}
                            >
                              {moment
                                .unix(Number(data.tahun_produksi))
                                .format('DD/MM/YYYY')}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => Actions.detail_asets(data)}
                            style={{
                              paddingHorizontal: 20,
                              paddingVertical: 5,
                              borderWidth: 1,
                              borderColor: color.Blue,
                              borderRadius: 6
                            }}
                          >
                            <Text
                              style={{
                                color: color.Blue
                              }}
                            >
                              Detail
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View
              style={{
                position: 'absolute',
                bottom: 20,
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: responsiveWidth(8),
                width: '100%'
              }}
            >
              <TouchableOpacity
                onPress={() => Actions.assets()}
                style={{
                  backgroundColor: color.Blue,
                  justifyContent: 'center',
                  width: '100%',
                  paddingVertical: 13,
                  borderRadius: 20,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,

                    fontWeight: '700'
                  }}
                >
                  SEMUA ASET
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Drawer>
      );
    }
  }
}
function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    getAllProduct: data => dispatch(getAllProduct(data))
  };
}
const mapState = state => {
  return {
    token: state.user.token,
    me: state.user.me,
    product: state.product.list
  };
};
export default connect(
  mapState,
  bindAction
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
    alignItems: 'center'
  }
});
