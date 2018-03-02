import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';
// import CustomerLayout from './layouts/CustomerLayout';

const fakeAuth = {
  isAuthenticated: sessionStorage.getItem('token') == null ?false:true,
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (

    (sessionStorage.getItem('token') == null ?false:true) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/user/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


function RouterConfig({ history }) {


  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history} >
        <Switch>
          <Route path="/user" component={UserLayout} />
          <Route path="/user/login" component={UserLayout} />
          <PrivateRoute path="/" component={BasicLayout} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}



export default RouterConfig;
