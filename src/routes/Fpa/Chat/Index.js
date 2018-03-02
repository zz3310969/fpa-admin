import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Layout,Row,Col,Form, Input, Tabs, Button, Icon, Checkbox, Alert } from 'antd';

import ChatList from "./ChatList";
import Header from "./Header";
import Dialogue from "./Dialogue";
import Send from "./Send";
import styles from './Index.less';
import Tool from "./Tool";

const FormItem = Form.Item;
const { TabPane } = Tabs;

@connect(state => ({

}))


// @Form.create()


export default class ChatIndex extends Component {
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

// style={{backgroundColor:"#4b5866",border:'1px solid #FFFFFF',height:'100%'}}
  render() {
    return (
      <div style={{width:'100%'}}>
        <Header />
        <Row className={styles.chat}>
          <Col span={4} className={styles.list}>
            <ChatList />
          </Col>
          <Col span={16}>
            <Dialogue />
            <Send />
          </Col>
          <Col span={4} className={styles.tool}>
            <Tool />
          </Col>
        </Row>
      </div>

    );
  }
}
