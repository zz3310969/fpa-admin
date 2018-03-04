import { Cascader } from 'antd';
import { connect } from 'dva';

const options = []

@connect(state => ({
  area: state.area,
}))
export default class LazyOptions extends React.Component {
  constructor(props) {
    super(props);


  }

  state = {
    options,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'area/fetch',
    });
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value || [];
      this.setState({'value':value});
    }
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }


  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    this.triggerChange(value);
  }


  render() {
  	const { area: { tree} } = this.props;

    const value = this.state.value || [];

    return (
      <Cascader
      	value={value}
        options={tree}
        placeholder={''}
        onChange={this.onChange}
        changeOnSelect
      />
    );
  }
}