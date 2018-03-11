// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link, Route } from 'dva/router';
// import DocumentTitle from 'react-document-title';
// import { Icon } from 'antd';
// import GlobalFooter from '../components/GlobalFooter';
// import { getRouteData } from '../utils/utils';


// const copyright = '<div>Copyright <Icon type="copyright" /> 2017 上海乐嘉性格色彩管理咨询有限公司出品</div>';

// class CustomerLayout extends React.PureComponent {
//   static childContextTypes = {
//     location: PropTypes.object,
//   }
//   getChildContext() {
//     const { location } = this.props;
//     return { location };
//   }
//   getPageTitle() {
//     const { location } = this.props;
//     const { pathname } = location;
//     let title = 'FPA性格色彩卡牌测试系统1';
//     getRouteData('UserLayout').forEach((item) => {
//       if (item.path === pathname) {
//         title = `${item.name} - FPA性格色彩卡牌测试系统2`;
//       }
//     });
//     return title;
//   }
//   render() {
//     return (

      
//     );
//   }
// }

// export default CustomerLayout;
