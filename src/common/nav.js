import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';

import BlankLayout from '../layouts/BlankLayout';

import Analysis from '../routes/Dashboard/Analysis';
import Monitor from '../routes/Dashboard/Monitor';
import Workplace from '../routes/Dashboard/Workplace';

import CardTestResultList from '../routes/Fpa/CardTestResult/CardTestResultList';
import CardTestResultProfile from '../routes/Fpa/CardTestResult/CardTestResultProfile';


import CounselorRankList from '../routes/Fpa/CounselorRank/CounselorRankList';
import CounselorRankAddForm from '../routes/Fpa/CounselorRank/CounselorRankAddForm';
import CounselorRankEditForm from '../routes/Fpa/CounselorRank/CounselorRankEditForm';

import CounselorList from '../routes/Fpa/Counselor/CounselorList';
import CounselorAddForm from '../routes/Fpa/Counselor/CounselorAddForm';
import CounselorEditForm from '../routes/Fpa/Counselor/CounselorEditForm';


import WithdrawList from '../routes/Fpa/Withdraw/WithdrawList';
import WithdrawAddForm from '../routes/Fpa/Withdraw/WithdrawAddForm';
import WithdrawEditForm from '../routes/Fpa/Withdraw/WithdrawEditForm';

import RefundList from '../routes/Fpa/Refund/RefundList';
import RefundAddForm from '../routes/Fpa/Refund/RefundAddForm';
import RefundEditForm from '../routes/Fpa/Refund/RefundEditForm';


import ServiceRecordList from '../routes/Fpa/ServiceRecord/ServiceRecordList';

import AccountList from '../routes/Fpa/Account/AccountList';
import AccountAddForm from '../routes/Fpa/Account/AccountAddForm';
import AccountEditForm from '../routes/Fpa/Account/AccountEditForm';


import CardGroupList from '../routes/Fpa/CardGroup/CardGroupList';
import CardGroupAddForm from '../routes/Fpa/CardGroup/CardGroupAddForm';

import ShareList from '../routes/Fpa/Share/ShareList';


import TransmitTemplateList from '../routes/Fpa/TransmitTemplate/TransmitTemplateList';
import TransmitTemplateAddForm from '../routes/Fpa/TransmitTemplate/TransmitTemplateAddForm';
import TransmitTemplateEditForm from '../routes/Fpa/TransmitTemplate/TransmitTemplateEditForm';

import CharacterColorList from '../routes/Fpa/Charactercolor/CharacterColorList';
import CharacterColorAddForm from '../routes/Fpa/Charactercolor/CharacterColorAddForm';
import CharacterColorEditForm from '../routes/Fpa/Charactercolor/CharacterColorEditForm';

import CustomerWordsList from '../routes/Fpa/CustomerWords/CustomerWordsList';
import CustomerWordsEditForm from '../routes/Fpa/CustomerWords/CustomerWordsEditForm';


import ThemeList from '../routes/Fpa/Theme/ThemeList';
import ThemeAddForm from '../routes/Fpa/Theme/ThemeAddForm';
import ThemeEditForm from '../routes/Fpa/Theme/ThemeEditForm';

import SceneList from '../routes/Fpa/Scene/SceneList';
import SceneAddForm from '../routes/Fpa/Scene/SceneAddForm';
import SceneEditForm from '../routes/Fpa/Scene/SceneEditForm';

import CharacterList from '../routes/Fpa/Character/CharacterList';
import CharacterAddForm from '../routes/Fpa/Character/CharacterAddForm';
import CharacterEditForm from '../routes/Fpa/Character/CharacterEditForm';

import CardUnitList from '../routes/Fpa/CardUnit/CardUnitList';
import CardUnitAddForm from '../routes/Fpa/CardUnit/CardUnitAddForm';
import CardUnitEditForm from '../routes/Fpa/CardUnit/CardUnitEditForm';

import CustomerList from '../routes/Fpa/Customer/CustomerList';
import CustomerAddForm from '../routes/Fpa/Customer/CustomerAddForm';
import CustomerEditForm from '../routes/Fpa/Customer/CustomerEditForm';

import OrderList from '../routes/Fpa/Order/OrderList';
import OrderAddForm from '../routes/Fpa/Order/OrderAddForm';
import OrderEditForm from '../routes/Fpa/Order/OrderEditForm';
import OrderProfile from '../routes/Fpa/Order/OrderProfile';


import UserList from '../routes/Base/User/UserList';
import UserAddForm from '../routes/Base/User/UserAddForm';
import UserEditForm from '../routes/Base/User/UserEditForm';


import CacheList from '../routes/Base/Cache/CacheList';
import TableList from '../routes/List/TableList';
import CoverCardList from '../routes/List/CoverCardList';
import CardList from '../routes/List/CardList';
import FilterCardList from '../routes/List/FilterCardList';
import SearchList from '../routes/List/SearchList';
import BasicList from '../routes/List/BasicList';

import BasicProfile from '../routes/Profile/BasicProfile';
import AdvancedProfile from '../routes/Profile/AdvancedProfile';

import BasicForm from '../routes/Forms/BasicForm';
import AdvancedForm from '../routes/Forms/AdvancedForm';
import StepForm from '../routes/Forms/StepForm';
import Step2 from '../routes/Forms/StepForm/Step2';
import Step3 from '../routes/Forms/StepForm/Step3';

import Exception403 from '../routes/Exception/403';
import Exception404 from '../routes/Exception/404';
import Exception500 from '../routes/Exception/500';

import Success from '../routes/Result/Success';
import Error from '../routes/Result/Error';

import Login from '../routes/User/Login';
import Register from '../routes/User/Register';
import RegisterResult from '../routes/User/RegisterResult';


import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

const data = [{
  component: BasicLayout,
  layout: 'BasicLayout',
  name: '首页', // for breadcrumb
  path: '',
  children: [{
    name: '卡牌测试管理',
    path: 'test',
    icon: 'credit-card',
    children: [{
      name: '测试场景',
      path: 'scene',
      component: SceneList,
    },{
      name: '卡牌管理',
      path: 'cardgroup',
      component: CardGroupList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: CardGroupAddForm,
      }]
    },{
      name: '测试结果',
      path: 'result',
      component: CardTestResultList,
      children: [{
        breadname: '详情',
        path: 'profile/:id',
        component: CardTestResultProfile,
      },],
    },],
  },{
    name: '性格管理',
    path: 'character',
    icon: 'pie-chart',
    children: [{
      name: '性格色彩列表',
      path: 'color',
      component: CharacterColorList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: CharacterColorAddForm,
      }, {
        breadname: '编辑',
        path: 'edit/:id',
        component: CharacterColorEditForm,
      },],
    },{
      name: '主题列表',
      path: 'theme',
      component: ThemeList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: ThemeAddForm,
      }, {
        breadname: '编辑',
        path: 'edit/:id',
        component: ThemeEditForm,
      },],
    },{
      name: '性格主题配置',
      path: 'charactertheme',
      component: CharacterList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: CharacterAddForm,
      }, {
        breadname: '编辑',
        path: 'edit/:id',
        component: CharacterEditForm,
      },],
    },],
  }, {
    name: '客户管理',
    path: 'customer',
    icon: 'team',
    children: [{
      name: '客户资料',
      path: 'info',
      component: CustomerList,
    },{
      name: '客户订单',
      path: 'order',
      component: OrderList,
      children: [{
        breadname: '详情',
        path: 'profile/:id',
        component: OrderProfile,
      },],
    },],
  },{
    name: '营销管理',
    path: 'scheme',
    icon: 'notification',
    children: [{
      name: '分享记录',
      path: 'share',
      component: ShareList,
    },{
      name: '分享模板管理',
      path: 'transmittemplate',
      component: TransmitTemplateList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: TransmitTemplateAddForm,
      }, {
        breadname: '编辑',
        path: 'edit/:id',
        component: TransmitTemplateEditForm,
      },],
    },],
  }, {
    name: '咨询师服务管理',
    path: 'counsel',
    icon: 'customer-service',
    children: [{
      name: '咨询师等级管理',
      path: 'rank',
      component: CounselorRankList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: CounselorRankAddForm,
      }, {
        breadname: '编辑',
        path: 'edit/:id',
        component: CounselorRankEditForm,
      },],
    },{
      name: '咨询师管理',
      path: 'counselor',
      component: CounselorList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: CounselorAddForm,
      }, {
        breadname: '编辑',
        path: 'edit/:id',
        component: CounselorEditForm,
      },],
    },{
      name: '客户留言管理',
      path: 'words',
      component: CustomerWordsList,
      children: [{
        breadname: '编辑',
        path: 'edit/:id',
        component: CustomerWordsEditForm,
      },],
    },],
  },{
    name: '财务',
    path: 'finance',
    icon: 'pay-circle',
    children: [{
      name: '咨询师账户管理',
      path: 'account',
      component: AccountList,
      children: [{
        breadname: '编辑',
        path: 'edit/:id',
        component: AccountEditForm,
      }],
    },{
      name: '提现申请',
      path: 'withdraw/apply',
      component: WithdrawList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: WithdrawAddForm,
      }, {
        breadname: '编辑',
        path: 'edit/:id',
        component: WithdrawEditForm,
      }],
    },{
      name: '提现审核',
      path: 'withdraw/audit',
      component: WithdrawList,
      children: [{
        breadname: '编辑',
        path: 'edit/:id',
        component: WithdrawEditForm,
      }],
    },{
      name: '提现记录',
      path: 'withdraw/list',
      component: WithdrawList,
      children: [ {
        breadname: '编辑',
        path: 'edit/:id',
        component: WithdrawEditForm,
      }],
    },{
      name: '退款申请',
      path: 'refund/apply',
      component: RefundList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: RefundAddForm,
      }, {
        breadname: '编辑',
        path: 'edit/:id',
        component: RefundEditForm,
      }],
    },{
      name: '退款审核',
      path: 'refund/audit',
      component: RefundList,
      children: [ {
        breadname: '编辑',
        path: 'edit/:id',
        component: RefundEditForm,
      }],
    },{
      name: '退款记录',
      path: 'refund/list',
      component: RefundList,
      children: [{
        breadname: '编辑',
        path: 'edit/:id',
        component: RefundEditForm,
      }],
    },],
  },{
    name:'系统管理',
    path:'sysm',
    icon:'windows-o',
    children: [{
      name: '缓存列表',
      path: 'cache-list',
      component: CacheList,
    },{
      name: '用户列表',
      path: 'user-list',
      component: UserList,
      children: [{
        breadname: '新增',
        path: 'add',
        component: UserAddForm,
      }]
    }],
  }, {
      name: 'Dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      children: [{
        name: '分析页',
        path: 'analysis',
        component: Analysis,
      }, {
        name: '监控页',
        path: 'monitor',
        component: Monitor,
      }, {
        name: '工作台',
        path: 'workplace',
        component: Workplace,
      }],
    },],
}, {
  component: UserLayout,
  layout: 'UserLayout',
  children: [{
    name: '帐户',
    icon: 'user',
    path: 'user',
    children: [{
      name: '登录',
      path: 'login',
      component: Login,
    }, {
      name: '注册',
      path: 'register',
      component: Register,
    }, {
      name: '注册结果',
      path: 'register-result',
      component: RegisterResult,
    }],
  }],
}, {
  component: BlankLayout,
  layout: 'BlankLayout',
  children: {
    name: '使用文档',
    path: 'http://pro.ant.design/docs/getting-started',
    target: '_blank',
    icon: 'book',
  },
}];

export function getNavData() {
  return data;
}

export default data;
