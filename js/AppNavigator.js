import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Home from './screens/home';
import Assets from './screens/assets';
import AddAsets from './screens/addAssets';
import Login from './screens/login';
import Users from './screens/accounts';
import AddUser from './screens/addUser';
import DetailAsets from './screens/detailAssets';
import DetailUser from './screens/userDetail';
import NavigationDrawer from './NavigationDrawer';

const RouterWithRedux = connect()(Router);
class AppNavigator extends React.Component {
  render() {
    return (
      <RouterWithRedux>
        <Stack key="root" hideNavBar>
          <Scene key="home" component={Home} />
          <Scene key="login" component={Login} />
          <Scene key="assets" component={Assets} />
          <Scene key="add_assets" component={AddAsets} />
          <Scene key="users" component={Users} />
          <Scene key="add_users" component={AddUser} />
          <Scene key="detail_asets" component={DetailAsets} />
          <Scene key="detailUser" component={DetailUser} />
        </Stack>
      </RouterWithRedux>
    );
  }
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AppNavigator);
