//系统路由

import layout from '../views/Layout.vue'

const routes = [
	{
		path: '/',
		name: 'Layout',
		redirect: '/dashboard',
		component: layout,
		children:[
		{
			path: '/home',
			name: 'home',
			meta:{
				tagTitle:'首页',
				title:'首页'
			},
			component: () => import(/* webpackChunkName: "home" */ '@/views/other/empty'),
			children:[
				{
					path: "/dashboard",
					name: 'dashboard',
					meta: {
						tagTitle: "控制台",
						title: "控制台",
						icon: "el-icon-menu",
						affix: true
					},
					component: () => import(/* webpackChunkName: "home" */ '@/views/dashboard'),
				},
				{
					path: "/usercenter",
					name: 'usercenter',
					meta: {
						tagTitle: "个人信息",
						title: "个人信息",
						icon: "el-icon-user",
					},
					component: () => import(/* webpackChunkName: "usercenter" */ '@/views/userCenter'),
				}
				
			]
		}
		
	]
	
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

export default routes;