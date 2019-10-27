import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight
} from 'react-native-responsive-dimensions';

const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  drawerContent: {
    backgroundColor: 'white'
  },
  cardStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 30,
    // alignItems: 'center',
    paddingHorizontal: responsiveWidth(6),
    justifyContent: 'center',
    height: deviceHeight / 3 - 26
  },
  txtname: {
    fontSize: 16
  },
  txtmobile: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  listItem: {
    backgroundColor: 'white',
    height: deviceHeight - (deviceHeight / 3 - 30)
  },
  link: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkText: {
    // paddingLeft: responsiveWidth(5),
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    width: '100%'
  }
});
