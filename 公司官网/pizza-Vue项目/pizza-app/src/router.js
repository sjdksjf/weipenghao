import Header from './component/Header'
import Main from './component/Main'
import Manager from './component/Manager'
import Menu from './component/Menu'
import Login from './component/Login'
import Register from './component/Register'
import About from './component/about/About'

// 二级路由
import NewCenter from './component/about/NewCenter'
import ContactUs from './component/about/ContactUs'
import OrderFile from './component/about/OrderFile'
import ExpressDelivery from './component/about/ExpressDelivery'

// 三级路由
import Phone from './component/about/contact/Phone'
import PersonName from './component/about/contact/PersonName'

export const routes = [
    {path: '/', name: 'mainLink', components: {
            default: Main,
            'orderingGuide': OrderFile,
            'delivery': ExpressDelivery,
            'newCenter': NewCenter
        } 
    },
    {path: '/manager', name: 'managerLink', component: Manager/*beforeEnter: (to, from, next) => {
        // 路由独享守卫
        alert('非登录状态，禁止访问');
        next(false);
        if(to.path === '/login' || to.path === '/register') {
	      next();
	    } else {
	      alert('尚未登录，请先登录！');
	      next('/login');
	    }
      }*/
  },
    {path: '/menu', name: 'menuLink', component: Menu},
    {path: '/login', name: 'loginLink', component: Login},
    {path: '/register', name: 'registerLink', component: Register},
    {path: '/about', name: 'aboutLink', redirect: '/about/newcenter', component: About, children: [
        {path: '/about/newcenter', name: 'newLink', component: NewCenter},
        {path: '/about/contactus', redirect: '/phone', name: 'contactLink', component: ContactUs, children: [
            {path: '/phone', name: 'phoneLink', component: Phone},
            {path: '/personname', name: 'personNameLink', component: PersonName}
        ]},
        {path: '/about/orderfile', name: 'orderLink', component: OrderFile},
        {path: '/about/express', name: 'expressLink', component: ExpressDelivery}
    ]},
    {path: '*', redirect: '/'}
]