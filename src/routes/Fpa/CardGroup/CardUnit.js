import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,Row,Col,Table,Upload
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import style from './CardUnit.less';
import ThemeTable from './ThemeTable'


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  cardgroup: state.cardgroup,
}))
@Form.create()



export default class BasicForms extends PureComponent {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;

  }

  render(){

    const { getFieldDecorator } = this.props.form;

    const dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
      }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
      }];
    let CardThemeHandle = function(record){
      console.log(record)
      return (
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12}>
            <p className={style.themeTitle}>主题配置</p>
            <ThemeTable />
          </Col>
          <Col md={12}>
            <p className={style.themeTitle}>主题配置</p>
            <ThemeTable />
          </Col>
        </Row>
      )
    }
// beforeUpload={beforeUpload}
// onChange={this.handleChange}
    const columns = [{
            title: '卡牌正面',
            dataIndex: 'name1',
            key: 'name1',
            render:function(text,index,record){
              let imageUrl = text;
              return (
                <Upload
                  className={style.avatarUploader}
                  name="avatar"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                >
                  {
                    imageUrl ?
                      <img src={imageUrl} alt="" className={style.avatar} /> :
                      <Icon type="plus" className={style.avatarUploaderTrigger} />
                  }
                </Upload>
              );
            }
        }, {
            title: '正面属性',
            dataIndex: 'frontAttr',
            key: 'frontAttr',
            render:function(text,index,record){
              return (
                <Form >
                  <FormItem
                    label="颜色"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{marginBottom:10,width:'100%'}}
                  >
                    {getFieldDecorator('colorId', {
                      rules: [{ required: true, message: '请选择颜色' }],
                    })(
                      <Select >
                        <Option value="red">红色</Option>
                        <Option value="yellow">黄色</Option>
                        <Option value="blue">蓝色</Option>
                        <Option value="green">绿色</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label="分值"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{marginBottom:10}}
                  >
                    {getFieldDecorator('score', {
                      rules: [{ required: true, message: '请输入分值!' }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    label="名称"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{marginBottom:10}}
                  >
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入名称' }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Form>
              )
            }
        }, {
            title: '卡牌反面',
            dataIndex: 'name2',
            key: 'name2',
            render:function(text,index,record){
              let imageUrl = text;
              return (
                <Upload
                  className={style.avatarUploader}
                  name="avatar"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                >
                  {
                    imageUrl ?
                      <img src={imageUrl} alt="" className={style.avatar} /> :
                      <Icon type="plus" className={style.avatarUploaderTrigger} />
                  }
                </Upload>
              );
            }
        }, {
            title: '反面属性',
            dataIndex: 'backAttr',
            key: 'backAttr',
            render:function(text,index,record){
              return (
                <Form >
                  <FormItem
                    label="颜色"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{marginBottom:10,width:'100%'}}
                  >
                    {getFieldDecorator('colorId', {
                      rules: [{ required: true, message: '请选择颜色' }],
                    })(
                      <Select >
                        <Option value="red">红色</Option>
                        <Option value="yellow">黄色</Option>
                        <Option value="blue">蓝色</Option>
                        <Option value="green">绿色</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label="分值"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{marginBottom:10}}
                  >
                    {getFieldDecorator('score', {
                      rules: [{ required: true, message: '请输入分值!' }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    label="名称"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{marginBottom:10}}
                  >
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入名称' }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Form>
              )
            }
        }
    ];
    return (
      <Table
        bordered={true}
        dataSource={dataSource}
        expandedRowRender={CardThemeHandle}
        className="components-table-demo-nested"
        columns={columns}
      />
    )
  }
}