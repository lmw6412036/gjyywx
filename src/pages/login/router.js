/**
 * Created by Administrator on 2017/6/5 0005.
 */
export default [{
  path: '/login',
  component: resolve => {
    require(['./index.vue'], resolve)
  }
}, {
  path: '/register',
  component: resolve => {
    require(['./register.vue'], resolve)
  }
}, {
  path: '/next',
  name:'next',
  component: resolve => {
    require(['./next.vue'], resolve)
  }
}, {
  path: '/succeed',
  name:'succeed',
  component: resolve => {
    require(['./succeed.vue'], resolve)
  }
}, {
  path: '/forgetPassword',
  name:'forgetPassword',
  component: resolve => {
    require(['./forgetPassword.vue'], resolve)
  }
}, {
  path: '/modificationPassword',
  name:'modificationPassword',
  component: resolve => {
    require(['./modificationPassword.vue'], resolve)
  }
}, {
  path: '/inquiry',
  name:'inquiry',
  component: resolve => {
    require(['../consult/index'], resolve)
  }
}, {
  path: '/online',
  name:'online',
  component: resolve => {
    require(['../onlineDoc/onlineDoc'], resolve)
  }
}, {
  path: '/docCard/:id',
  name:'docCard',
  component: resolve => {
    require(['../onlineDoc/docCard'], resolve)
  }
}, {
  path: '/apply/:id',
  name:'apply',
  component: resolve => {
    require(['../onlineDoc/apply'], resolve)
  }
}, {
  path: '/pictureInquiry/:id',
  name:'pictureInquiry',
  component: resolve => {
    require(['../onlineDoc/pictureInquiry'], resolve)
  }
}, {
  path: '/payment',
  name:'payment',
  component: resolve => {
    require(['../onlineDoc/payment'], resolve)
  }
}, {
  path: '/myDoc',
  name:'myDoc',
  component: resolve => {
    require(['../myDoc/myDoc'], resolve)
  }
}, {
  path: '/talking/:id',
  name:'talking',
  component: resolve => {
    require(['../myDoc/talking'], resolve)
  }
}, {
  path: '/noVipTalking/:id',
  name:'noVipTalking',
  component: resolve => {
    require(['../myDoc/noVipTalking'], resolve)
  }
}, {
  path: '/myInquiry',
  name:'myInquiry',
  component: resolve => {
    require(['../consult/index'], resolve)
  }
}, {
  path: '/introduce',
  name:'introduce',
  component: resolve => {
    require(['../consult/introduce'], resolve)
  }
}, {
  path: '/qkfzInquiry',
  name:'qkfzInquiry',
  component: resolve => {
    require(['../consult/qkfzInquiry'], resolve)
  }
}, {
  path: '/addInquiry/:patId',
  name:'addInquiry',
  component: resolve => {
    require(['../consult/addInquiry'], resolve)
  }
}, {
  path: '/submitSucceed',
  name:'submitSucceed',
  component: resolve => {
    require(['../consult/submitSucceed'], resolve)
  }
}, {
  path: '/obligation/:consultId',
  name:'obligation',
  component: resolve => {
    require(['../consult/obligation'], resolve)
  }
}, {
  path: '/qkeValuate/:consultId',
  name:'qkeValuate',
  component: resolve => {
    require(['../consult/qkeValuate'], resolve)
  }
}, {
  path: '/twValuate/:consultId',
  name:'twValuate',
  component: resolve => {
    require(['../consult/twValuate'], resolve)
  }
}, {
  path: '/xing/:consultId',
  name:'xing',
  component: resolve => {
    require(['../consult/xing'], resolve)
  }
}, {
  path: '/qkeChatRecords/:consultId',
  name:'qkeChatRecords',
  component: resolve => {
    require(['../consult/qkeChatRecords'], resolve)
  }
}, {
  path: '/myCenter',
  name:'myCenter',
  component: resolve => {
    require(['../myCenter/index'], resolve)
  }
}, {
  path: '/userHelp',
  name:'userHelp',
  component: resolve => {
    require(['../myCenter/userHelp'], resolve)
  }
}, {
  path: '/detailDescription/:state',
  name:'detailDescription',
  component: resolve => {
    require(['../myCenter/detailDescription'], resolve)
  }
}, {
  path: '/myRegistration/:id',
  name:'myRegistration',
  component: resolve => {
    require(['../myCenter/myRegistration'], resolve)
  }
}, {
  path: '/users',
  name:'users',
  component: resolve => {
    require(['../myCenter/users'], resolve)
  }
}, {
  path: '/addUser/:patId',
  name:'addUser',
  component: resolve => {
    require(['../myCenter/addUser'], resolve)
  }
}, {
  path: '/editUser',
  name:'editUser',
  component: resolve => {
    require(['../myCenter/editUser'], resolve)
  }
}, {
  path: '/feedback',
  name:'feedback',
  component: resolve => {
    require(['../myCenter/feedback'], resolve)
  }
}, {
  path: '/expenseHistory',
  name:'expenseHistory',
  component: resolve => {
    require(['../myCenter/expenseHistory'], resolve)
  }
}, {
  path: '/accountAbout',
  name:'accountAbout',
  component: resolve => {
    require(['../myCenter/accountAbout'], resolve)
  }
}, {
  path: '/changePhone',
  name:'changePhone',
  component: resolve => {
    require(['../myCenter/changePhone'], resolve)
  }
}, {
  path: '/confrimPhone',
  name:'confrimPhone',
  component: resolve => {
    require(['../myCenter/confrimPhone'], resolve)
  }
}, {
  path: '/editMe',
  name:'editMe',
  component: resolve => {
    require(['../myCenter/editMe'], resolve)
  }
}, {
  path: '/about',
  name:'about',
  component: resolve => {
    require(['../myCenter/about'], resolve)
  }
}, {
  path: '/docArticle/:id',
  name:'docArticle',
  component: resolve => {
    require(['../onlineDoc/docArticle.vue'], resolve)
  }
}, {
  path: '/articleDetail/:id',
  name:'articleDetail',
  component: resolve => {
    require(['../onlineDoc/articleDetail.vue'], resolve)
  }
}, {
  path: '/docComment/:id',
  name:'docComment',
  component: resolve => {
    require(['../onlineDoc/docComment.vue'], resolve)
  }
}
];
