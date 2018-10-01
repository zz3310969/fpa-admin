import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, List, Button,Icon } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import BasicLayout from '../../../layouts/BasicLayout';

import DescriptionList from '../../../components/DescriptionList';
import styles from './CardTestResultProfile.less';
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../../components/Charts';
const { Description } = DescriptionList;


const salesTypeDataOnline = [
  {
    x: '红',
    y: 244,
  },
  {
    x: '黄',
    y: 321,
  },
  {
    x: '蓝',
    y: 311,
  },
  {
    x: '绿',
    y: 41,
  },
];

@connect(state => ({
  cardtestresult: state.cardtestresult,
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cardtestresult/fetchBasic',
      payload:{id:this.props.match.params.id}
    });
  }

  render() {
    const { profile } = this.props;
    const { cardtestresult: { regularFormSubmitting:submitting, formdate ,basicLoading} } = this.props;
    const { customer, cardTestResultDetailVoList,chats,result } = formdate;

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const optype = params.get('sp'); // bar

    return (
      <PageHeaderLayout title="测试结果详情页">
        <Card bordered={false}>
          <DescriptionList size="large" title="测试信息" style={{ marginBottom: 32 }}>
            <Description term="测试人">{customer.nickName}</Description>
            <Description term="联系电话">{customer.mobile}</Description>
            <Description term="测试时间">{formdate.testDate}</Description>
            <Description term="测试场景">{formdate.sceneName}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="测试人卡牌排序" style={{ marginBottom: 32 }}>

          <div className={styles.cardList}>

          <List
            rowKey="id"
            loading={basicLoading}
            grid={{ gutter: 24, lg: 4, md: 2, sm: 1, xs: 1 }}
            dataSource={[...cardTestResultDetailVoList]}
            renderItem={item => (item ? (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card}
                  cover={ <img alt="" className={styles.cardAvatar} src={item.cardUnitImage} />}>
                </Card>
              </List.Item>
              ) : (
                <List.Item>

                </List.Item>
              )
            )}
          />
          </div>
          </DescriptionList>

          <Divider style={{ marginBottom: 32 }} />

          <DescriptionList size="large" title="测试报告" style={{ marginBottom: 32 }}>
          <Pie
                hasLegend
                subTitle=""
                total={chats.reduce((pre, now) => now.y + pre, 0)}
                data={chats}
                height={248}
                lineWidth={4}
                colors={['#E7380D','#F8BD01','#0195DF','#7EBD26']}
              />
          <Divider style={{ marginBottom: 32 }} />

          <h3>{result.ruleScore}</h3>
          <h4>{result.ruleScoreMax}</h4>
          <h4>{result.ruleCharacterColorDefn}</h4>
          <h4>{result.ruleCharacterColorLows}</h4>

          <h4>{result.ruleCharacterAdvantage}{result.ruleCharacterAdvantageOther}</h4>

          <h4>{result.ruleCharacterInsufficient}{result.ruleCharacterInsufficientOther}</h4>

          <h4>{result.ruleCharacterCare}</h4>



          </DescriptionList>


        </Card>
      </PageHeaderLayout>
    );
  }
}
