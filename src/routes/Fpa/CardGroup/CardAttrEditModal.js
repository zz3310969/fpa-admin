import React, { Component } from 'react';
import { routerRedux, Link } from 'dva/router';
import { 
  Modal,Form, Input, Select, Button, Card, Icon,Row,Col,Table,Upload,Avatar 
} from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

const rightGutter = {
  'marginRight':'20px'
}

class CardAttrEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false
    });
  };


  render(){
    const { children,colors, themes } = this.props;
    const inInfo = this.props.inInfo;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };

    const okHandler = () => {
      this.hideModelHandler();
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="卡牌属性"
          visible={this.state.visible}
          onOk={okHandler}
          onCancel={this.hideModelHandler}
          width={500}
        >  
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
                  <Select size="small">
                    {colors.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)}
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
                  <Input  />
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
                  <Input size="small"/>
                )}
              </FormItem>
              {/*<FormItem style={{ marginTop: 32 }}>
                  {
                  this.state.onlyread ?'':(
                  <Button type="primary" htmlType="submit" loading={submitting}>
                      提交
                  </Button>
                  )
                  }
                  <Link to={'/cardgroup'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
              </FormItem>*/}
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(CardAttrEditModal);
