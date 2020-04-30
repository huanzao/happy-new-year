import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let v = new Vue();
//3.在新的实例上使用组件
const router= new Router({
  routes: [
    {
      path:'/',
      component: ()=>import('@/components/start') 
    },
    {
      path:'/start',
      name:'start',
      component:()=>import('@/components/start'),
      // redirect:'start/login',
      children:[
        {
          path: 'login',
          name: 'login',
          component: ()=>import('@/components/start/login') 
        }
      ]
    },
    {
      path:'/main',
      name:'main',
      component:()=>import('@/components/main'),
      redirect:'main/echarts',
      children:[
        {
          path: 'echarts',
          name: 'echarts',
          component:()=>import('@/components/main/Charts/echart.vue')
        },
        {
          path: 'export',
          name: 'export',
          component:()=>import('@/components/main/export.vue')
        },
        {
          path: 'echart2',
          name: 'echart2',
          component: ()=>import('@/components/main/Charts/echart2.vue') 
        },
        {
          path: 'user',
          name: 'user',
          component: ()=>import('@/components/main/base/user.vue') 
        },
        {
          path: 'role',
          name: 'role',
          component: ()=>import('@/components/main/base/role.vue') 
        },
        // 基础设置 ///////////////////////////////////////////////////////////////////////////////////
        {
          path: 'ksgl',               
          name: 'ksgl',
          component: ()=>import('@/components/main/base/ksgl.vue'),
        },
        {
          path: 'wareHouse',               
          name: 'wareHouse',
          component: ()=>import('@/components/main/base/wareHouse.vue'),
        },
        {
          path: 'ksfl',               
          name: 'ksfl',
          component: ()=>import('@/components/main/base/ksfl.vue'),
        },
        {
          path: 'sbzd',
          name: 'sbzd',
          component: ()=>import('@/components/main/base/sbzd.vue'),
        },
        {
          path: 'ksjhmb',
          name: 'ksjhmb',
          component: ()=>import('@/components/main/base/keshishezhi/ksjhmb.vue'),
        },
        {
          path: 'kscyhcsj',
          name: 'kscyhcsj',
          component: ()=>import('@/components/main/base/keshishezhi/kscyhcsj.vue'),
        },
        {
          path: 'ssmbsj',
          name: 'ssmbsj',
          component: ()=>import('@/components/main/base/keshishezhi/ssmbsj.vue'),
        },
        {
          path: 'wyhgl',
          name: 'wyhgl',
          component: ()=>import('@/components/main/base/wyhgl.vue'),
        },
        {
          path: 'hospital',
          name: 'hospital',
          component: ()=>import('@/components/main/base/hospital.vue'),
        },
        {
          path: 'yyxxgl',
          name: 'yyxxgl',
          component: ()=>import('@/components/main/base/yyxxgl.vue'),
        },
        {
          path: 'wxzdpg',
          name: 'wxzdpg',
          component: ()=>import('@/components/main/base/wxzdpg.vue'),
        },
        {
          path: 'hcfl',
          name: 'hcfl',
          component: ()=>import('@/components/main/base/hcfl.vue'),
        },
        {
          path: 'flwh',
          name: 'flwh',
          component: ()=>import('@/components/main/base/flwh.vue'),
        },
        {
          path: 'qxfl',
          name: 'qxfl',
          component: ()=>import('@/components/main/base/keshishezhi/qxfl.vue'),
        },
        {
          path: 'hczd',
          name: 'hczd',
          component: ()=>import('@/components/main/base/hczd.vue'),
        },
        //厂商管理//////////////////////////////////////////////////////////////////////////
        {
          path: 'zjlb',
          name: 'zjlb',
          component: ()=>import('@/components/main/csgl/zjlb.vue'),
        },
        {
          path: 'htgl',
          name: 'htgl',
          component: ()=>import('@/components/main/csgl/htgl.vue'),
        },
        {
          path: 'addht',
          name: 'addht',
          component: ()=>import('@/components/main/csgl/addht.vue'),
        },
        {
          path: 'htfkgl',
          name: 'htfkgl',
          component: ()=>import('@/components/main/csgl/htfkgl.vue'),
        },
        //可是计划
        {
          path: 'ksjhsp',
          name: 'ksjhsp',
          component: ()=>import('@/components/main/haocaijihua/ksjhsp.vue'),
        },
        {
          path: 'ksjhsp_find',
          name: 'ksjhsp_find',
          component: ()=>import('@/components/main/haocaijihua/ksjhsp_find.vue'),
        },
        {
          path: 'ksjhsq',
          name: 'ksjhsq',
          component: ()=>import('@/components/main/haocaijihua/ksjhsq.vue'),
        },
        
        //耗材模块
        {
          path: 'hcgl_tksq',
          name: 'hcgl_tksq',
          component: ()=>import('@/components/main/haocaiguanli/1_hcgl_tksq.vue'),
        },
        {
          path: 'hcgl_list',
          name: 'hcgl_list',
          component: ()=>import('@/components/main/haocaiguanli/3_hcgl_list.vue'),
        },
        {
          path: 'hcgl_hcrk',
          name: 'hcgl_hcrk',
          component: ()=>import('@/components/main/haocaiguanli/4_hcgl_hcrk.vue'),
        },
        {
          path: 'hcgl_crkRecord',
          name: 'hcgl_crkRecord',
          component: ()=>import('@/components/main/haocaiguanli/6_hcgl_crkRecord.vue'),
        },
        {
          path: 'hcgl_lingqujilu',
          name: 'hcgl_lingqujilu',
          component: ()=>import('@/components/main/haocaiguanli/7_hcgl_lingqujilu.vue'),
        },
        {
          path: 'haocaiCheck',
          name: 'haocaiCheck',
          component: ()=>import('@/components/main/haocaiguanli/haocaiCheck.vue'),
        },
        //资产府库
        {
          path: 'device_list',
          name: 'device_list',
          component: ()=>import('@/components/main/zichanguanli/deviceList.vue'),
        },
        {
          path: 'zczy_crkRecord',
          name: 'zczy_crkRecord',
          component: ()=>import('@/components/main/zichanguanli/5_zczy_crkRecord.vue'),
        },
        {
          path: 'breakList',
          name: 'breakList',
          component: ()=>import('@/components/main/zichanguanli/breakList.vue'),
        },
        {
          path: 'zcrk_list',
          name: 'zcrk_list',
          component: ()=>import('@/components/main/zichanguanli/1_zcrk_list.vue'),
        },
        {
          path: 'zcrk_add',
          name: 'zcrk_add',
          component: ()=>import('@/components/main/zichanguanli/1_zcrk_add.vue'),
        },
        {
          path: 'zcrk_crkRecord',
          name: 'zcrk_crkRecord',
          component: ()=>import('@/components/main/zichanguanli/3_zcrk_crkRecord.vue'),
        },
        {
          path: 'zcru_lingqujilu',
          name: 'zcru_lingqujilu',
          component: ()=>import('@/components/main/zichanguanli/4_zcru_lingqujilu.vue'),
        },
        {
          path: 'deviceCheck',
          name: 'deviceCheck',
          component: ()=>import('@/components/main/zichanguanli/deviceCheck.vue'),
        },
      ]
    },
  ]
})

// // 全局路由守卫
// router.beforeEach((to, from, next) => {
  
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由 
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//   console.log(to.name)
//   const nextRoute = ['goods_offer', 'good-list', 'good-detail', 'cart', 'profile'];
//   let isLogin = global.isLogin;  // 是否登录
// var arr = ['a','s','d','f'];
// console.info(arr.indexOf('a'))
//   // 未登录状态；当路由到nextRoute指定页时，跳转至login
//   // if (nextRoute.indexOf(to.name) >= 0) {  
//   //   // if (!isLogin) {
//   //   //   console.log('what fuck');
//   //   //   router.push({ name: 'login' })
//   //   // }

//   //     if(!decodeURIComponent(document.cookie)){
//   //       v.$notify.error({
//   //         title: '错误',
//   //         message: '未登录 或者token过期'
//   //       });
//   //       // __this.$notify.error({
//   //       //   title: '错误',
//   //       //   message: '这是一条错误的提示消息'
//   //       // });
//   //     console.log('过期了')
//   //     router.push({ path: '/' })
//   //   }

//   // }
//   // // 已登录状态；当路由到login时，跳转至home 
//   // if (to.name === 'login') {
//   //   if (isLogin) {
//   //     router.push({ name: 'home' });
//   //   }
//   // }
//   next();
// });

export default router;
