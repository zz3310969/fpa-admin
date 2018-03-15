import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Modal, message,Tree } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../defaultTree.less';
import request from '../../../utils/request';
import {queryResource, } from '../../../services/Base/resource';
const FormItem = Form.Item;
const { Option } = Select;
const TreeNode = Tree.TreeNode;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');




@connect(state => ({
  resource: state.resource,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    expandForm: true,
    addInputValue: '',
    selectedRows: [],
    formValues: {},
    limit:10,
    currentPage:1,
    treeData: this.props.resource.data,
    parentId:0,
  };


  onSelect = (selectedKeys, info) => {
    const { dispatch } = this.props;
    const { resetFields } = this.props.form;
    resetFields();
    let id = info.node.props.dataRef.id;
    this.setState({
      parentId: id,
    });
    dispatch({
        type: 'resource/fetchBasic',
        payload:{id:id}
      });
    this.toggleForm();
    console.log('selected', selectedKeys, info);
  }

  onChange = () => {
    console.log('onChange');
  }




  onLoadData = (treeNode) => {
    var self = this;
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      const { dispatch } = this.props;
      dispatch({
        type: 'resource/fetch',
        treeData:this.state.treeData,
        payload:{parentId:treeNode.props.eventKey},
        callback:()=>{
          resolve(); 
        }
      });
      
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      item.title = item.name;
      item.key = item.id+"";
      let image = 'M.png';
      if(item.dtype == 'Privilege'){
        image = 'R.png'
      }
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode title={<span><img src={require('../../../assets/'+image)} />&nbsp;{item.title}</span>} key={item.key} dataRef={item} >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} title={<span><img src={require('../../../assets/'+image)} />&nbsp;{item.title}</span>} dataRef={item} />;
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'resource/fetch',
      payload:{parentId:this.state.parentId},
      treeData:this.state.treeData,
    });
  }
  componentWillReceiveProps(nextProps) {
    
  }
  componentWillUnmount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'resource/clean',
    });
  }


  reLoadTree = (parentId) => {
    const { dispatch } = this.props;
      dispatch({
        type: 'resource/fetch',
        treeData:this.state.treeData,
        payload:{parentId:parentId},
        callback:()=>{
        }
      });

  }


  toggleForm = () => {
    this.setState({
      expandForm: false,
    });
  }
  createPrivilege = () => {
    const { dispatch } = this.props;
    const { treeData } = this.state;
    console.log(treeData);
    dispatch({
        type: 'resource/add',
        payload:{parent:{id:this.state.parentId},dtype:'privilege'},
        callback: () => {
          this.reLoadTree(this.state.parentId);
        },
      });
  }

  createModule = () => {
    const { dispatch } = this.props;
    dispatch({
        type: 'resource/add',
        payload:{parent:{id:this.state.parentId},dtype:'module'},
        callback: () => {
          this.reLoadTree(this.state.parentId);
        },
      });
  }
  deleteResource = () => {
    const { dispatch } = this.props;
    if(this.state.parentId){
      dispatch({
        type: 'resource/remove',
        treeData:this.state.treeData,
        payload:{id:this.state.parentId},
      });
    }
    
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  handleUpdateSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'resource/update',
          payload: values,
          callback: () => {
            this.reLoadTree(values['parent_id']);
          },
        });
      }
    });
  }

  renderUpdateForm() {
    const { getFieldDecorator } = this.props.form;
    const { resource: { regularFormSubmitting: submitting, formdate} } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <Form
            onSubmit={this.handleUpdateSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
          <FormItem >
          <Col span={24} style={{ textAlign: 'right' }}>
              <Button  size="small" onClick={this.createModule} htmlType="button" >
              <img src={require('../../../assets/M.png')} />
                新增模块
              </Button>
              <Button style={{ marginLeft: 8 }} size="small" onClick={this.createPrivilege} htmlType="button" >
                <img src={require('../../../assets/R.png')} />
                新增资源
              </Button>
              <Button style={{ marginLeft: 8 }} size="small" onClick={this.deleteResource} htmlType="button" >
                删除
              </Button>
              </Col>
            </FormItem>
                    {getFieldDecorator('id', {
                    initialValue:formdate.id,
                    })(
                    <Input type="hidden"/>
                    )}
                <FormItem
                        {...formItemLayout}
                        label="模块名"
                >
                    {getFieldDecorator('name', {
                    initialValue:formdate.name,
                    rules: [{
                      required: true, message: '请输入模块名',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="顺序"
                >
                    {getFieldDecorator('seq', {
                    initialValue:formdate.seq,
                    rules: [{
                       message: '请输入顺序',
                    }],
                    })(
                    <Input  placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="等级"
                >
                    {getFieldDecorator('lvl', {
                    initialValue:formdate.lvl,
                    rules: [{
                      required: true, message: '请输入等级',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="标识"
                >
                    {getFieldDecorator('identify', {
                    initialValue:formdate.identify,
                    rules: [{
                      required: true, message: '请输入标识',
                    }],
                    })(
                    <Input placeholder="" onChange={this.onChange()}/>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="路径"
                >
                    {getFieldDecorator('path', {
                    initialValue:formdate.path,
                    rules: [{
                      required: true, message: '请输入路径',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="规则"
                >
                    {getFieldDecorator('pattern', {
                    initialValue:formdate.pattern,
                    rules: [{
                      required: true, message: '请输入规则',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                更新
              </Button>
                <Button onClick={this.handleReset} style={{ marginLeft: 8 }}>取消</Button>
            </FormItem>
          </Form>
    );
  }


  


  renderForm() {
    return this.state.expandForm ? '' : this.renderUpdateForm();
  }



  render() {
    const { resource: { regularFormSubmitting: submitting, data:treeData ,formdate} } = this.props;
    



    return (
      <PageHeaderLayout title="资源树">
        <Card bordered={false}  style={{height:'600px' }}>

        <Row gutter={16}>
          <Col span={6}>
            <Card title="" bordered={false} style={{ width: '100%' }}>
              <Tree loadData={this.onLoadData}
                  onSelect={this.onSelect}
                  onCheck={this.onCheck}
                  
              >
              {this.renderTreeNodes(treeData)}
              </Tree>
        
            </Card>
          </Col>
          <Col span={16}>
            <Card title="" bordered={false}>{this.renderForm()}</Card>
          </Col>
          
        </Row>

          
        </Card>
        
      </PageHeaderLayout>
    );
  }
}
