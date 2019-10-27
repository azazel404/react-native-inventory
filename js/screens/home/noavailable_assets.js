import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  ScrollView,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { LinearGradient } from 'expo';
import SafeAreaView from 'react-native-safe-area-view';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import color from '../../utils/color';
class LastUpdate extends React.Component {
  renderContent() {
    let content = [];
    for (var i = 0; i < 2; i++) {
      content.push();
    }
    return content;
  }
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
            Data Terbaru
          </Text>
        </View>
        {this.renderContent()}
      </View>
    );
  }
}
function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}
export default connect(
  null,
  bindAction
)(LastUpdate);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: responsiveHeight(0.5)
  }
});
