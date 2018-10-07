import React, { Component } from 'react';
import { connect } from 'dva';
import { Row} from 'antd';
import styles from './Home.less';


@connect(state => ({
}))
export default class Home extends Component {
  state = {

  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'chart/fetch',
    // }).then(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    
  }

 

  render() {
    


    return (
      <div className={styles.home}>
        <img src={require('../assets/logo.jpg')} alt="logo" />
      </div>
    );
  }
}
