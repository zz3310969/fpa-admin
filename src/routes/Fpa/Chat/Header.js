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
    switch (stateType) {
      case 'online':
        // cb(data);
        dispatch({
          type: 'websocket/changeState',
          payload: {'requestType':stateType,'token':this.state.token},
          callback: (data) => {
            dispatch({ type: 'websocket/pullNotReceivedMessage', payload: data });
          },
          dispatch:dispatch,
        });
        break;
      case 'offline':
        dispatch({
          type: 'websocket/changeState',
          payload: {'requestType':stateType,'token':this.state.token},
        });
        break;

    }
    
  }


  render() {
    const menu = (
        <Menu>
          <Menu.Item onClick={(e)=>this.changeState('online')} >
            <a target="none" rel="noopener noreferrer" href="javascript:void(0)" onClick={(e)=>this.changeState('online')}><Icon type="login" style={{marginRight:10}}/>上线</a>
          </Menu.Item>
          <Menu.Item onClick={(e)=>this.changeState('offline')} >
            <a target="none" rel="noopener noreferrer" href="javascript:void(0)" onClick={(e)=>this.changeState('offline')}><Icon type="logout" style={{marginRight:10}}/>&nbsp;下线</a>
          </Menu.Item>
        </Menu>
      );
    return (
      <div className={styles.header}>
        <Avatar shape="circle" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{backgroundColor:"#FFFFFF"}}/>
        <div className={styles.user}>
          <div>Jobs</div>
        </div>
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8}}>
            在线咨询<Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}
