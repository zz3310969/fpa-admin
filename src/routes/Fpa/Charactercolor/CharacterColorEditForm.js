import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {routerRedux, Link} from 'dva/router';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../Formstyle.less';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(state => ({
  charactercolor: state.charactercolor,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
    onlyread: false,
    zltshuod :0
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const optype = params.get('read'); // bar
    this.setState({
      onlyread: optype ? true : false,
    })
    const {dispatch} = this.props;
    dispatch({
      type: 'charactercolor/base',
    });
    if (this.props.match.params.id) {
      dispatch({
        type: 'charactercolor/fetchBasic',
        payload: {id: this.props.match.params.id}
      });
    }

  }

  componentWillUnmount(){
    const {dispatch} = this.props;
    dispatch({
      type: 'charactercolor/clean',
    });
  }

  componentWillReceiveProps(nextProps) {
    const {charactercolor: {formdate, colors}} = nextProps;
    if (formdate.colorId != undefined && formdate.color2Id != undefined && colors.length != 0 && this.state.zltshuod == 0) {
      colors.map((n, i) => {
        n.disabled = true;
      });
      colors.map((n, i) => {
        if (n.id == formdate.colorId) {
          n.disabled = false;
        }
        if (n.id == formdate.color2Id) {
          n.disabled = false;
        }
      });
      this.setState({
        zltshuod: 1
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'charactercolor/update',
          payload: values,
          callback: () => {
            this.props.dispatch(routerRedux.push('/character/color'));
          },
        });
      }
    });
  }

  render() {
    const {charactercolor: {regularFormSubmitting: submitting, formdate, states, colors}} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    function handleChange(value) {
      const disvals = [];
      if (value.length == 2) {
        colors.map((n, i) => {
          n.disabled = true;
        });
        colors.map((n, i) => {
          value.map((v) => {
            if (n.id == v) {
              n.disabled = false;
            }
          });
        });
      } else if (value.length < 2) {
        colors.map((n, i) => {
          n.disabled = false;
        });
      } else {
        console.log('不能了，进来就死定了');
      }
    }

    return (
      <PageHeaderLayout title="" content="">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{marginTop: 8}}
          >
            {getFieldDecorator('id', {
              initialValue: formdate.id,
              rules: [{
                required: true, message: '请输入主键',
              }],
            })(
              <Input type="hidden"/>
            )}
            <FormItem
              {...formItemLayout}
              label="性格编号"
            >
              {getFieldDecorator('numb', {
                initialValue: formdate.numb,
                rules: [{
                  required: true, message: '请输入性格编号',
                }],
              })(
                <Input placeholder="" disabled={this.state.onlyread}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性格名称"
            >
              {getFieldDecorator('name', {
                initialValue: formdate.name,
                rules: [{
                  required: true, message: '请输入性格名称',
                }],
              })(
                <Input placeholder="" disabled={this.state.onlyread}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="代表颜色"
            >
              {getFieldDecorator('colorIds', {
                initialValue: formdate.colorIds,
                rules: [{
                  required: true, message: '请输入代表颜色',
                }],
              })(
                <Select
                  mode="multiple"
                  style={{width: '100%'}}
                  placeholder="请选择代表颜色，最多选两个"
                  onChange={handleChange}
                  disabled={this.state.onlyread}
                >
                  {colors.map(d => (<Select.Option key={d.id} disabled={d.disabled}>
                    <div style={{background: d.code}}>{d.display}</div>
                  </Select.Option>))}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="定义"
            >
              {getFieldDecorator('description', {
                initialValue: formdate.description,
                rules: [{
                  required: true, message: '请输入定义',
                }],
              })(
                <TextArea style={{minHeight: 32}} placeholder="请输入定义" rows={4} disabled={this.state.onlyread}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="状态"
            >
              {getFieldDecorator('state', {
                initialValue: formdate.state !== undefined ? formdate.state + '' : '',
                rules: [{
                  required: true, message: '请选择状态',
                }],
              })(
                <Select disabled={this.state.onlyread} >
                  {states.map(d => <Select.Option key={d.code}>{d.display}</Select.Option>)}
                </Select>
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              {
                this.state.onlyread ? '' : (
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
                  </Button>
                )
              }
              <Link to={'/character/color'}><Button style={{marginLeft: 8}}>取消</Button></Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
