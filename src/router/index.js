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
          path: 'user',               
          name: 'user',
          component: ()=>import('@/components/main/user.vue'),
        },
        {
          path: 'user_add',               
          name: 'user_add',
          component: ()=>import('@/components/main/user_add.vue'),
        },
        {
          path: 'user_edit',               
          name: 'user_edit',
          component: ()=>import('@/components/main/user_edit.vue'),
        },
        {
          path: 'role',               
          name: 'role',
          component: ()=>import('@/components/main/role.vue'),
        },
        {
          path: 'role_add',               
          name: 'role_add',
          component: ()=>import('@/components/main/role_add.vue'),
        },
        {
          path: 'role_edit',               
          name: 'role_edit',
          component: ()=>import('@/components/main/role_edit.vue'),
        },
        {
          path: 'account',               
          name: 'account',
          component: ()=>import('@/components/main/account.vue'),
        }, 
        {
          path: 'account_add',               
          name: 'account_add',
          component: ()=>import('@/components/main/account_add.vue'),
        }, 
        {
          path: 'account_edit',               
          name: 'account_edit',
          component: ()=>import('@/components/main/account_edit.vue'),
        },
        {
          path: 'co',               
          name: 'co',
          component: ()=>import('@/components/main/co.vue'),
        }, 
        {
          path: 'co_add',               
          name: 'co_add',
          component: ()=>import('@/components/main/co_add.vue'),
        },
        {
          path: 'co_edit',               
          name: 'co_edit',
          component: ()=>import('@/components/main/co_edit.vue'),
        },
        {
          path: 'table_All',               
          name: 'table_All',
          component: ()=>import('@/components/main/table_All.vue'),
        },
        {
          path: 'report',               
          name: 'report',
          component: ()=>import('@/components/main/report.vue'),
        },
        {
          path: 'report_history',               
          name: 'report_history',
          component: ()=>import('@/components/main/report_history.vue'),
        },
        {
          path: 'shares_show',               
          name: 'shares_show',
          component: ()=>import('@/components/main/shares_show.vue'),
        },
        {
          path: 'shares_select',               
          name: 'shares_select',
          component: ()=>import('@/components/main/shares_select.vue'),
        },
        {
          path: 'shares_add',               
          name: 'shares_add',
          component: ()=>import('@/components/main/shares_add.vue'),
        },
        {
          path: 'settings/:id',               
          name: 'settings',
          component: ()=>import('@/components/main/settings.vue')
        },
        {
          path: 'set_add',               
          name: 'set_add',
          component: ()=>import('@/components/main/set_add.vue')
        },
        {
          path: 'set_show',               
          name: 'set_show',
          component: ()=>import('@/components/main/settings_show.vue')
        },
        {
          path: 'set_edit',               
          name: 'set_edit',
          component: ()=>import('@/components/main/set_edit.vue')
        },
        {
          path: 'set_time_add',               
          name: 'set_time_add',
          component: ()=>import('@/components/main/set_time_add.vue')
        },
        {
          path: 'set_time_edit',               
          name: 'set_time_edit',
          component: ()=>import('@/components/main/set_time_edit.vue')
        },
        {
          path: 'echarts',
          name: 'echarts',
          component: ()=>import('@/components/main/Charts/echart.vue') 
        },
        {
          path: 'echart2',
          name: 'echart2',
          component: ()=>import('@/components/main/Charts/echart2.vue') 
        }
        
      ]
    },
  ]
})

// // 全局路由守卫
// router.beforeEach((to, from, next) => {
//   console.log('navigation-guards', decodeURIComponent(document.cookie));
  
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由 
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

//   const nextRoute = ['goods_offer', 'good-list', 'good-detail', 'cart', 'profile'];
//   let isLogin = global.isLogin;  // 是否登录

//   // 未登录状态；当路由到nextRoute指定页时，跳转至login
//   if (nextRoute.indexOf(to.name) >= 0) {  
//     // if (!isLogin) {
//     //   console.log('what fuck');
//     //   router.push({ name: 'login' })
//     // }

//       if(!decodeURIComponent(document.cookie)){
//         v.$notify.error({
//           title: '错误',
//           message: '未登录 或者token过期'
//         });
//         // __this.$notify.error({
//         //   title: '错误',
//         //   message: '这是一条错误的提示消息'
//         // });
//       console.log('过期了')
//       router.push({ path: '/' })
//     }

//   }
//   // 已登录状态；当路由到login时，跳转至home 
//   if (to.name === 'login') {
//     if (isLogin) {
//       router.push({ name: 'home' });
//     }
//   }
//   next();
// });

export default router;
