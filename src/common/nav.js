import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';

import BlankLayout from '../layouts/BlankLayout';

import Analysis from '../routes/Dashboard/Analysis';
import Monitor from '../routes/Dashboard/Monitor';
import Workplace from '../routes/Dashboard/Workplace';


import CharacterColorList from '../routes/Fpa/Charactercolor/CharacterColorList';
import CharacterColorAddForm from '../routes/Fpa/Charactercolor/CharacterColorAddForm';
import CharacterColorEditForm from '../routes/Fpa/Charactercolor/CharacterColorEditForm';

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

import CacheList from '../routes/List/CacheList';
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
  }, {
    name: '表单页',
    path: 'form',
    icon: 'form',
    children: [{
      name: '基础表单',
      path: 'basic-form',
      component: BasicForm,
    }, {
      name: '分步表单',
      path: 'step-form',
      component: StepForm,
      children: [{
        path: 'confirm',
        component: Step2,
      }, {
        path: 'result',
        component: Step3,
      }],
    }, {
      name: '高级表单',
      path: 'advanced-form',
      component: AdvancedForm,
    }],
  }, {
    name: '列表页',
    path: 'list',
    icon: 'table',
    children: [{
      name: '缓存列表',
      path: 'cache-list',
      component: CacheList,
    },{
      name: '查询表格',
      path: 'table-list',
      component: TableList,
    }, {
      name: '标准列表',
      path: 'basic-list',
      component: BasicList,
    }, {
      name: '卡片列表',
      path: 'card-list',
      component: CardList,
    }, {
      name: '搜索列表（项目）',
      path: 'cover-card-list',
      component: CoverCardList,
    }, {
      name: '搜索列表（应用）',
      path: 'filter-card-list',
      component: FilterCardList,
    }, {
      name: '搜索列表（文章）',
      path: 'search',
      component: SearchList,
    }],
  },{
    name: '性格管理',
    path: 'character',
    icon: 'table',
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
    name: '顾客管理',
    path: 'customer',
    icon: 'table',
    children: [{
      name: '顾客资料',
      path: 'info',
      component: CustomerList,
    },],
  }, {
    name: '详情页',
    path: 'profile',
    icon: 'profile',
    children: [{
      name: '基础详情页',
      path: 'basic',
      component: BasicProfile,
    }, {
      name: '高级详情页',
      path: 'advanced',
      component: AdvancedProfile,
    }],
  }, {
    name: '结果',
    path: 'result',
    icon: 'check-circle-o',
    children: [{
      name: '成功',
      path: 'success',
      component: Success,
    }, {
      name: '失败',
      path: 'fail',
      component: Error,
    }],
  }, {
    name: '异常',
    path: 'exception',
    icon: 'warning',
    children: [{
      name: '403',
      path: '403',
      component: Exception403,
    }, {
      name: '404',
      path: '404',
      component: Exception404,
    }, {
      name: '500',
      path: '500',
      component: Exception500,
    }],
  }],
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
