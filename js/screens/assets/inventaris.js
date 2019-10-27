import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
  TextInput,
  Image,
  View
} from 'react-native';
import { API_URL } from '../../config';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { Actions } from 'react-native-router-flux';
import color from '../../utils/color';
import moment from 'moment';
class Available extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
            Terbaru
          </Text>
        </View>
        {this.props.product.length !== 0 ? (
          this.props.product.map((data, i) => {
            if (data.kategori === 'L.Inventaris') {
              return (
                <TouchableOpacity
                  onPress={() => Actions.detail_asets(data)}
                  key={i}
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
            } else {
              return (
                <Text
                  style={{
                    fontSize: 12,
                    color: color.Gray,
                    fontWeight: '500'
                  }}
                >
                  Tidak ada data
                </Text>
              );
            }
          })
        ) : (
          <Text
            style={{
              fontSize: 12,
              color: color.Gray,
              fontWeight: '500'
            }}
          >
            Tidak ada data
          </Text>
        )}
      </View>
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
    product: state.product.list
  };
};
export default connect(
  mapState,
  bindAction
)(Available);

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
});
