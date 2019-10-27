import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
  ScrollView,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import color from '../../utils/color';
import { openDrawer } from '.././../actions/drawer';
import { Icon, Tabs, Tab, TabHeading, Content } from 'native-base';
import Available from './inventaris';
import NoAvailable from './kerusakan';
import { getAllProduct } from '../../actions/product';
class Assets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'inven'
    };
  }
  componentDidMount() {
    this.props.getAllProduct(this.props.token).then(res => {
      console.log(res);
    });
  }
  renderContent = page => {
    switch (page) {
      case 'inven':
        return <Available />;
        break;
      case 'kerusakan':
        return <NoAvailable />;
        break;

      default:
        return <Available />;
    }
  };

  handleContentChange(name) {
    switch (name) {
      case 'inven':
        this.setState({ content: 'inven' });
        break;
      case 'kerusakan':
        this.setState({ content: 'kerusakan' });
        break;

      default:
        this.setState({ content: 'inven' });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
            height: 50,
            // backgroundColor: color.Blue,

            marginTop: responsiveHeight(8)
          }}
        >
          <TouchableOpacity
            onPress={() => this.handleContentChange('inven')}
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: this.state.content === 'inven' ? 2 : null,
              borderColor: this.state.content === 'inven' ? color.Blue : null
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                fontWeight: '700',
                color: this.state.content === 'inven' ? color.Blue : color.Gray
              }}
            >
              L.Inventaris
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleContentChange('kerusakan')}
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',

              borderBottomWidth: this.state.content === 'kerusakan' ? 2 : null,
              borderColor:
                this.state.content === 'kerusakan' ? color.Blue : null
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                fontWeight: '700',
                color:
                  this.state.content === 'kerusakan' ? color.Blue : color.Gray
              }}
            >
              L.Kerusakan
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderContent(this.state.content)}
      </View>
    );
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
    token: state.user.token
  };
};
export default connect(
  mapState,
  bindAction
)(Assets);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: 'white'
  }
});
