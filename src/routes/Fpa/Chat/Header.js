import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Layout,Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Menu,Dropdown ,Avatar } from 'antd';

import styles from "./Header.less";
import '../../../common.less'; // 引入字体样式文件


console.log("iconfont")
console.log(styles)

const FormItem = Form.Item;
const { TabPane } = Tabs;



const menu = (
  <Menu>
    <Menu.Item>
      <a target="none" rel="noopener noreferrer" href="javascript:void(0)"><Icon type="login" style={{marginRight:10}}/>签入</a>
    </Menu.Item>
    <Menu.Item>
      <a target="none" rel="noopener noreferrer" href="javascript:void(0)"><Icon type="logout" style={{marginRight:10}}/>&nbsp;签出</a>
    </Menu.Item>
  </Menu>
);

@connect(state => ({

}))

// @Form.create()

export default class Header extends Component {
  state = {
    count: 0,
    type: 'account',
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.login.status === 'ok') {
    //   this.props.dispatch(routerRedux.push('/'));
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
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
