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
      redirect:'start/login',
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
      requireAuth:true,
      children:[
        {
          path: 'goods',               //商品报价
          name: 'goods',
          component: ()=>import('@/components/main/00_goods.vue'), 
        },
        {
          path: 'goods_add',               //商品报价
          name: 'goods_add',
          component: ()=>import('@/components/main/00_goods_add.vue'), 
        },
        {
          path: 'goods_offer',               //商品报价
          name: 'goods_offer',
          component: ()=>import('@/components/main/01_goods_offer.vue'), 
        },
        {
          path: 'goods_offer_add',
          name: 'goods_offer_add',
          component: ()=>import('@/components/main/01_goods_offer_add.vue') 
        },
        {
          path: 'goods_offer_edit',
          name: 'goods_offer_edit',
          component: ()=>import('@/components/main/01_goods_offer_edit.vue') 
        },
        {
          path: 'goods_offer_detail',
          name: 'goods_offer_detail',
          component: ()=>import('@/components/main/01_goods_offer_detail.vue') 
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

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('navigation-guards', decodeURIComponent(document.cookie));
  
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由 
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  const nextRoute = ['goods_offer', 'good-list', 'good-detail', 'cart', 'profile'];
  let isLogin = global.isLogin;  // 是否登录

  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {  
    // if (!isLogin) {
    //   console.log('what fuck');
    //   router.push({ name: 'login' })
    // }

      if(!decodeURIComponent(document.cookie)){
        v.$notify.error({
          title: '错误',
          message: '未登录 或者token过期'
        });
        // __this.$notify.error({
        //   title: '错误',
        //   message: '这是一条错误的提示消息'
        // });
      console.log('过期了')
      router.push({ path: '/' })
    }

  }
  // 已登录状态；当路由到login时，跳转至home 
  if (to.name === 'login') {
    if (isLogin) {
      router.push({ name: 'home' });
    }
  }
  next();
});

export default router;
