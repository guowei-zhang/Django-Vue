<template>
  <div class="aminui">
	<section class="aminui-wrapper">
		<!-- 侧边主菜单导航 -->
		<div class="aminui-side-split">
			<div class="adminui-side-split-scroll">
				<ul>
					<li v-for="item in menuList" v-bind:key="item.name" :class="pmenu.path==item.path?'active':''"
			@click="showMenu(item)">
						<span :class="item.meta.icon || 'fa fa-home'"></span>
						<p>{{item.meta.title}}</p>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- 侧边明细菜单导航 -->
		<div :class="menuIsCollapse?'aminui-side isCollapse':'aminui-side'">
			<div v-if="!menuIsCollapse" class="adminui-side-top">
				<h2>{{ pmenu.meta.title }}</h2>
			</div>
			<div class="adminui-side-scroll">
				<el-menu :default-active="this.fullPath" router :collapse="menuIsCollapse">
					<NavMenu :navMenus="pmenu.children"></NavMenu>
				</el-menu>
				
			</div>
		</div>
		
		<div class="aminui-body">
			<Topbar>
				<userbar></userbar>
			</Topbar>
			
			<Tags></Tags>
			
			<div class="adminui-main">
				<router-view/>
			</div>
			
		</div>
	</section>
	
</div>
</template>

<script>

import Topbar from '../components/Topbar.vue';
import userbar from '../components/userbar.vue';
import Tags from '../components/Tags.vue';
import NavMenu from '../components/NavMenu.vue';

export default {
	name: 'home',
	components: {
		Topbar,
		userbar,
		Tags,
		NavMenu
	},
	data() {
		return {
			fullPath:'',
			menuList:[],
			pmenu:{
				meta:{
					title:''
				},
				children:[]
			}
				
		}
	},
	computed:{
		menuIsCollapse(){
			return this.$store.state.global.menuIsCollapse
		}
	},
	created() {
		this.getMenu();
		if(this.$route.name.indexOf('-')!=-1){
			this.$store.commit("setSecondRouteShow", false)
			this.$store.commit("setTreeRouteShow", true)
		}else{
			this.$store.commit("setSecondRouteShow", true)
			this.$store.commit("setTreeRouteShow", false)
		}
	},
	
	watch: {
		$route() {
			this.getMenu();
			if(this.$route.name.indexOf('-')!=-1){
				this.$store.commit("setSecondRouteShow", false)
				this.$store.commit("setTreeRouteShow", true)
			}else{
				this.$store.commit("setSecondRouteShow", true)
				this.$store.commit("setTreeRouteShow", false)
			}
		}
	},
	methods:{
		//加载树数据
		async getMenu(){
			var res = await this.$API.menu.list.get();
			this.menuList = res.data;
			var route = this.$route.matched[1];
			for(var i in this.menuList){
				if(route.name == this.menuList[i].name){
					this.pmenu = this.menuList[i];
					continue;
				}
			}
			
			this.fullPath = this.setFullPath(this.$route.fullPath);
			
			
			console.log(this.fullPath);
			
		},
		showMenu:function(route){
			this.pmenu = route;
		},
		
		setFullPath: function(Path){
			if(Path.indexOf('-')!=-1){
				Path = Path.substr(0,Path.indexOf('-'));
			}
			
			return Path;
		}
	}
  
}
</script>
