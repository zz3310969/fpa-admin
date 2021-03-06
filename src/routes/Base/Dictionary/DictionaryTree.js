import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Modal, message,Tree } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../defaultTableList.less';
import request from '../../../utils/request';

const FormItem = Form.Item;
const { Option } = Select;
const TreeNode = Tree.TreeNode;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


function loop(data, type) {
  var result;
   data.filter((item, index, arr) => {
    debugger;
      if (item.val == type) {
        result = item.val;
        return item.val;;
      }
      if (item.children) {
        var re = loop(item.children, type);
        if(re){
          return re;
        }
      }
    });
   return result;
 }

/*const loop = (data, type) => {
    
  };*/

@connect(state => ({
  dictionary: state.dictionary,
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
    treeData: this.props.dictionary.data,
    parentType:"",
    id:0,
  };


  onSelect = (selectedKeys, info) => {
    const { dispatch } = this.props;
    let id = info.node.props.dataRef.id;
    let parentType = loop(this.state.treeData,info.node.props.dataRef.val)
        debugger;

    this.setState({
      parentType:parentType,
      id:id
    })
    dispatch({
        type: 'dictionary/fetchBasic',
        payload:{id:id}
      });
    console.log('selected', selectedKeys, info);
  }


  onLoadData = (treeNode) => {
    
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      request('api/base/dictionary/read?type='+treeNode.props.eventKey)
        .then(result => {
          if(result.state =='success') {
            treeNode.props.dataRef.children = result.data;
            this.setState({
              treeData: [...this.state.treeData],
            });
          }
          resolve(); 
        })

      
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionary/fetch',
      payload:{type:this.state.parentType},
      treeData:this.state.treeData,
    });
  }
  componentWillReceiveProps(nextProps) {

  }

  reLoadTree = (parentType) => {
    const { dispatch } = this.props;
      dispatch({
        type: 'dictionary/fetch',
        treeData:this.state.treeData,
        payload:{type:parentType},
        callback:()=>{
        }
      });
  }




  handleUpdateSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'dictionary/update',
          payload: values,
          callback: () => {
            debugger;
            this.reLoadTree(this.state.parentType);
          },
        });
      }
    });
  }


  

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictionary/add',
      payload: {parentId:this.state.id,text:'未命名',val:'initialValue'},
      callback:()=>{
        this.reLoadTree(this.state.parentType);
      }
    });
  }

  renderUpdateForm() {
    const { getFieldDecorator } = this.props.form;
    const { dictionary: { regularFormSubmitting: submitting, formdate} } = this.props;
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
              <Button  size="small" onClick={this.handleAdd} htmlType="button" >
                新增
              </Button>
              <Button style={{ marginLeft: 8 }} size="small" htmlType="button" >
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
                        label="类型"
                >
                    {getFieldDecorator('type', {
                    initialValue:formdate.type,
                    rules: [{
                      required: true, message: '请输入类型',
                    },{
                      validator: this.usernameExists
                    }],
                    })(
                    <Input placeholder="" disabled={true}/>
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="值"
                >
                    {getFieldDecorator('val', {
                    initialValue:formdate.val,
                    rules: [{
                      required: true, message: '请输入值',
                    }],
                    })(
                    <Input  placeholder="" />
                    )}
                </FormItem>
                <FormItem
                        {...formItemLayout}
                        label="文本"
                >
                    {getFieldDecorator('text', {
                    initialValue:formdate.text,
                    rules: [{
                      required: true, message: '请输入文本',
                    }],
                    })(
                    <Input placeholder="" />
                    )}
                </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                更新
              </Button>
                <Link to={'/list/user-list'}><Button style={{ marginLeft: 8 }}>取消</Button></Link>
            </FormItem>
          </Form>
    );
  }




  renderForm() {
    return this.state.expandForm ? this.renderUpdateForm() : this.renderUpdateForm();
  }



  render() {
    const { dictionary: { regularFormSubmitting: submitting, data:treeData ,formdate} } = this.props;
    



    return (
      <PageHeaderLayout title="字典树">
        <Card bordered={false}>

        <Row gutter={16}>
          <Col span={4}>
            <Card title="" bordered={false} style={{ width: 300 }}>
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
