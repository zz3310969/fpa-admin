import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Layout,Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Menu,Dropdown ,Avatar } from 'antd';

import styles from "./Header.less";
import '../../../common.less'; // 引入字体样式文件


const FormItem = Form.Item;
const { TabPane } = Tabs;





@connect(state => ({
  websocket: state.websocket,
}))
export default class Header extends Component {
  state = {
    count: 0,
    type: 'account',
    token:'zlt',
    status:'下线'
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.login.status === 'ok') {
    //   this.props.dispatch(routerRedux.push('/'));
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeState = (stateType) => {
    const {dispatch } = this.props;
    const self = this;
    switch (stateType) {
      case 'online':
        // cb(data);
        dispatch({
          type: 'websocket/changeState',
          payload: {'requestType':stateType,'token':this.state.token},
          callback: (data) => {
            //dispatch({ type: 'websocket/pullNotReceivedMessage', payload: data });
            self.setState({status:'上线'})
          },
          dispatch:dispatch,
        });
        break;
      case 'offline':
        dispatch({
          type: 'websocket/changeState',
          payload: {'requestType':stateType,'token':this.state.token},
        });
        self.setState({status:'下线'})
        break;

    }
    
  }


  render() {
    const {websocket:{ user} } = this.props;

    const menu = (
        <Menu>
          <Menu.Item  >
            <a target="none" rel="noopener noreferrer" href="javascript:void(0)" onClick={(e)=>this.changeState('online')}><Icon type="login" style={{marginRight:10}}/>上线</a>
          </Menu.Item>
          <Menu.Item  >
            <a target="none" rel="noopener noreferrer" href="javascript:void(0)" onClick={(e)=>this.changeState('offline')}><Icon type="logout" style={{marginRight:10}}/>&nbsp;下线</a>
          </Menu.Item>
          <Menu.Item  >
            <a target="none" rel="noopener noreferrer" href="javascript:void(0)" onClick={(e)=>this.changeState('hide')}><Icon type="logout" style={{marginRight:10}}/>&nbsp;隐身</a>
          </Menu.Item>
        </Menu>
      );
    return (

      <div className={styles.header}>
        <Avatar shape="circle" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{backgroundColor:"#FFFFFF"}}/>
        <div className={styles.user}>
          <div>{user.name}</div>
        </div>
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8}}>
            {this.state.status}<Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}
