import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Modal, message,Tree,TreeSelect } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../defaultTree.less';
import request from '../../../utils/request';
const FormItem = Form.Item;
const { Option } = Select;
const TreeNode = Tree.TreeNode;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');




@connect(state => ({
  menu: state.menu,
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
    treeData: this.props.menu.data,
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
        type: 'menu/fetchBasic',
        payload:{id:id}
      });
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
        type: 'menu/fetch',
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
      item.isLeaf = item.leaf;
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} title={item.title} dataRef={item} />;
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/fetch',
      payload:{parentId:this.state.parentId},
      treeData:this.state.treeData,
    });
    dispatch({
      type: 'menu/base',
    });
  }
  componentWillReceiveProps(nextProps) {
    
  }
  componentWillUnmount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/clean',
    });

  }


  reLoadTree = (parentId) => {
    const { dispatch } = this.props;
      dispatch({
        type: 'menu/fetch',
        treeData:this.state.treeData,
        payload:{parentId:parentId},
        callback:()=>{
        }
      });

  }


  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }
  createPrivilege = () => {
    const { dispatch } = this.props;
    const { treeData } = this.state;
    console.log(treeData);
    dispatch({
        type: 'menu/add',
        payload:{parent_id:this.state.parentId,name:'未命名'},
        callback: () => {
          this.reLoadTree(this.state.parentId);
        },
      });
  }

  deleteMenu = () => {
    const { dispatch } = this.props;
    if(this.state.parentId){
      dispatch({
        type: 'menu/remove',
        treeData:this.state.treeData,
        payload:{id:this.state.parentId},
      });
    }
    
  }

  handleUpdateSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'menu/update',
          payload: values,
          callback: () => {
            this.reLoadTree(values['parent'].id);
          },
        });
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }


  renderUpdateForm() {
    const { getFieldDecorator } = this.props.form;
    const { menu: { regularFormSubmitting: submitting, formdate,resources,menuTypes} } = this.props;
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
              <Button  size="small" onClick={this.createPrivilege} htmlType="button" >
                新增
              </Button>
              
              <Button style={{ marginLeft: 8 }} size="small" onClick={this.deleteMenu} htmlType="button" >
                删除
              </Button>
              </Col>
            </FormItem>
                    {getFieldDecorator('id', {
                    initialValue:formdate.id,
                    })(
                    <Input type="hidden"/>
                    )}
                    {getFieldDecorator('parent.id', {
                    initialValue:formdate.parent !== undefined ? formdate.parent.id :'',
                    })(
                    <Input type="hidden"/>
                    )}
                    {getFieldDecorator('leaf', {
                    initialValue:formdate.leaf,
                    })(
                    <Input type="hidden"/>
                    )}
                <FormItem
                        {...formItemLayout}
                        label="名称"
                >
                    {getFieldDecorator('name', {
                    initialValue:formdate.name,
                    rules: [{
                      required: true, message: '请输入名称',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="目标"
                >
                    {getFieldDecorator('target', {
                    initialValue:formdate.target,
                    rules: [{
                      required: true, message: '请输入目标',
                    }],
                    })(
                    <Input  placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="菜单类型"
                >
                    {getFieldDecorator('menuType', {
                    initialValue:formdate.menuType !== undefined ? formdate.menuType.code :'',
                    rules: [{
                      required: true, message: '请输入菜单类型',
                    }],
                    })(
                    <Select >
                      {menuTypes.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="图标"
                >
                    {getFieldDecorator('icon', {
                    initialValue:formdate.icon,
                    rules: [{
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="序列"
                >
                    {getFieldDecorator('lvl', {
                    initialValue:formdate.lvl,
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="前台路径"
                >
                    {getFieldDecorator('path', {
                    initialValue:formdate.path,
                    rules: [{
                      required: true, message: '请输入前台路径',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
                
                <FormItem
                        {...formItemLayout}
                        label="关联资源"
                >
                    {getFieldDecorator('module.id', {
                    initialValue:formdate.module !== undefined ? formdate.module.id+'': '',
                    rules: [{
                    }],
                    })(
                    <TreeSelect
                      treeData={resources}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      treeDefaultExpandAll
                    />
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
    return this.state.expandForm ? this.renderUpdateForm() : this.renderUpdateForm();
  }



  render() {
    const { menu: { regularFormSubmitting: submitting, data:treeData ,formdate} } = this.props;
    



    return (
      <PageHeaderLayout title="组织架构">
        <Card bordered={false}>

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
