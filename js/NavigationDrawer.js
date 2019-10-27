import React from 'react';
import { Platform } from 'react-native';
import { Drawer } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from './screens/sidebar';
import { View } from 'react-native';
import { closeDrawer } from './actions/drawer';
class NavigationDrawer extends React.Component {
  static propTypes = {
    drawerState: PropTypes.string,
    closeDrawer: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.drawerState === 'open') {
      this._drawer._root.open();
    } else if (nextProps.drawerState === 'close') {
      this._drawer._root.close();
    }
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'open') {
      this.props.closeDrawer();
    }
  }

  render() {
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<SideBar navigator={this.navigator} />}
        type="overlay"
        tapToClose
        acceptPan={Platform.OS === 'ios' ? true : false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.3}
        panCloseMask={0.2}
        // styles={
        //   this._drawer
        //     ? { mainOverlay: { backgroundColor: 'black', opacity: 0.6 } }
        //     : {}
        // }
        negotiatePan
      >
        {this.props.children}
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return { closeDrawer: () => dispatch(closeDrawer()) };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState
});

export default connect(
  mapStateToProps,
  bindAction
)(NavigationDrawer);
