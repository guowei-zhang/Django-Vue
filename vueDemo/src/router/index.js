import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { ElNotification } from 'element-plus';
import 'nprogress/nprogress.css'
import systemRouter from './systemRouter';
import api from '../api'

//系统路由
const routes = systemRouter;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


//判断是否已加载过API路由
var isGetApiRouter = false;

router.beforeEach(async (to, from, next) => {
	NProgress.start();
	
	if(!isGetApiRouter){
		//加载API路由
		var apiRouter = await api.menu.list.get();
		var Router = filterAsyncRouter(apiRouter.data);
		
		console.log(Router);
		
		Router.forEach(item => {
			router.addRoute("Layout", item)
		});
		
		if (to.matched.length == 0) {
			router.push(to.fullPath);
		}
	}
	isGetApiRouter = true;
	
	next();
console.log(router.getRoutes());
});



router.afterEach(() => {
	NProgress.done()
});


router.onError((error) => {
	NProgress.done();
	ElNotification.error({
		title: '路由错误',
		message: error.message
	});
});


//转换
function filterAsyncRouter(routerMap) {
	const accessedRouters = []
	routerMap.forEach(item => {
		item.meta = item.meta?item.meta:{};
		
		if(item.name!='home'){
			
			//MAP转路由对象
			var route = {
				path: item.path,
				name: item.name,
				meta: item.meta,
				redirect: item.redirect,
				children: item.children ? filterAsyncRouter(item.children) : null,
				component: loadComponent(item.component)
			}
			
			if(item.model){
				//添加增查改路由
				route.children = route.children || [];
				var addChidren =  {
					path: item.path+'-add',
					name: item.name+'-add',
					meta: {
						parentName:item.name,
						tagTitle:item.meta.tagTitle,
						title:'添加'+item.meta.title,
						icon:item.meta.icon
					},
					component: loadComponent(item.component+'-add')
				};
				route.children.push(addChidren);
				
				var editChidren =  {
					path: item.path+'-edit',
					name: item.name+'-edit',
					meta: {
						parentName:item.name,
						tagTitle:item.meta.tagTitle,
						title:'修改'+item.meta.title,
						icon:item.meta.icon
					},
					component: loadComponent(item.component+'-edit')
				};
				route.children.push(editChidren);
			}
			
			accessedRouters.push(route);
		}
	})
	return accessedRouters
}


function loadComponent(component){
	if(component){
		return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}`)
	}else{
		return () => import(`../views/other/empty.vue`)
	}

}

export default router
