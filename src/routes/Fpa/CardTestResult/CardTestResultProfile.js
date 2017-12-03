import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, List, Button,Icon } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import DescriptionList from '../../../components/DescriptionList';
import styles from './CardTestResultProfile.less';

const { Description } = DescriptionList;


@connect(state => ({
  profile: state.profile,
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile } = this.props;
    const { basicGoods, basicProgress, basicLoading } = profile;
    
    return (
      <PageHeaderLayout title="测试结果详情页">
        <Card bordered={false}>
          <DescriptionList size="large" title="测试信息" style={{ marginBottom: 32 }}>
            <Description term="测试人">1000000000</Description>
            <Description term="联系电话">已取货</Description>
            <Description term="测试时间">1234123421</Description>
            <Description term="测试场景">3214321432</Description>
            <Description term="测试主题">3214321432</Description>
            <Description term="测试版本号">3214321432</Description>
            <Description term="测试人备注">3214321432</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={basicLoading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['']}
            renderItem={item => (item ? (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card} >
                  <Card.Meta
                    avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                    title={<a href="#">{item.title}</a>}
                    
                  />
                </Card>
              </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
          
        
        </Card>
      </PageHeaderLayout>
    );
  }
}
