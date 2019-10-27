import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import { Content, List, Icon, ListItem, Left } from 'native-base';
import styles from './styles';
import color from '../../utils/color';
import { signout } from '../../actions/user';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import { closeDrawer } from '../../actions/drawer';
const screenH = Dimensions.get('window').height;

class SideBar extends React.Component {
  state = {
    image: null
  };

  static propTypes = {
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func
  };

  render() {
    console.log(this.props.me);
    return (
      <View style={{ flex: 1 }}>
        <Content
          bounces={false}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          style={styles.drawerContent}
        >
          <LinearGradient
            colors={[color.Blue, color.Blue, color.Blue, color.Blue]}
            style={styles.cardStyle}
          >
            <Text style={styles.txtname} numberOfLines={1} ellipsizeMode="tail">
              {this.props.me.length === 0
                ? 'g'
                : this.props.me.name !== undefined
                ? this.props.me.name
                : 'o'}
            </Text>
            <Text
              style={styles.txtmobile}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
            <Text style={styles.txtname} numberOfLines={1} ellipsizeMode="tail">
              {/* {this.props.me.email} */}
            </Text>
          </LinearGradient>
          <List foregroundColor={'white'} style={styles.listItem}>
            {this.props.me.kategori_user === 'admin' ? (
              <ListItem
                button
                iconLeft
                onPress={() => {
                  this.props.closeDrawer();
                  Actions.users();
                }}
                style={styles.link}
              >
                <Left style={{ alignItems: 'center' }}>
                  <Icon
                    name="person-add"
                    size={26}
                    style={{
                      paddingTop: 2,
                      marginRight: 11
                    }}
                  />
                  <Text style={styles.linkText}>Pengguna</Text>
                </Left>
              </ListItem>
            ) : null}

            <ListItem button iconLeft style={styles.link}>
              <Left style={{ alignItems: 'center' }}>
                <Icon
                  name="help-circle"
                  style={{
                    paddingTop: 2,
                    marginRight: 11
                  }}
                />
                <Text style={styles.linkText}>Bantuan</Text>
              </Left>
            </ListItem>
            <ListItem button iconLeft style={styles.link}>
              <Left style={{ alignItems: 'center' }}>
                <Icon
                  name="settings"
                  style={{
                    paddingTop: 2,
                    marginRight: 11
                  }}
                />
                <Text style={styles.linkText}>Pengaturan</Text>
              </Left>
            </ListItem>
            <View
              style={{
                zIndex: 1,
                marginTop: responsiveHeight(8),
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: responsiveWidth(8),
                width: '100%'
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.signout()}
                style={{
                  justifyContent: 'center',
                  width: '100%',
                  paddingVertical: 13,
                  borderRadius: 20,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    color: color.Blue,
                    fontSize: 16,

                    fontWeight: '700'
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0.03 * screenH
              }}
            >
              <Text>Versi 0.0.1(B)</Text>
            </View>
          </List>
        </Content>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    signout: () => dispatch(signout())
  };
}

function mapStateToProps(state) {
  return {
    me: state.user.me
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(SideBar);
