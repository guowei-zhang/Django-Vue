/**
 * 所有接口集合
 * 每个接口对象需含有以下字段
 * @url 接口的URL地址
 * @name 接口名称
 * @get|post 返回请求接口的函数
 */

const api = {
	menu: {
		list: {
			name:'菜单列表',
			get: async function(){
				return {
					data:[
						{
							name:'home',
							path:'/home',
							meta:{
								icon:'el-icon-s-home',
								title:'首页',
								tagTitle:'首页'
							},
							children:[
								{
									name:'dashboard',
									path:'/dashboard',
									meta:{
										title:"控制台",
										tagTitle:"控制台",
										affix:true,
										icon:'el-icon-menu',
									}
								},
								{
									name:'user',
									path:'/userCenter',
									meta:{
										title:"个人信息",
										tagTitle:"个人信息",
										icon:'el-icon-user',
									}
								}
							]
						},
						{
							name:'element',
							path:'/element',
							component:'',
							meta:{
								icon:'el-icon-takeaway-box',
								title:'组件',
								tagTitle:'组件'
							},
							children:[
								{
									name:'echarts',
									path:'/echarts',
									component:'echarts',
									meta:{
										title:"图表 Echarts",
										tagTitle:"图表 Echarts",
										icon:'el-icon-s-data',
									}
								},
								{
									name:'customer',
									path:'/customer',
									model:true,
									component:'customer',
									meta:{
										title:"客户",
										tagTitle:"客户",
										icon:'el-icon-user',
									}
								},
								{
									name:'upload',
									path:'/element/upload',
									meta:{
										title:"上传",
										tagTitle:"上传",
										icon:'fa fa-cloud-upload',
									}
								},
								{
									name:'form',
									path:'/element/form',
									meta:{
										title:"表单表格",
										tagTitle:"表单表格",
										icon:'fa fa-file-text-o',
									}
								},
								{
									name:'formselect',
									path:'/element/formselect',
									meta:{
										title:"表格选择器",
										tagTitle:"表格选择器",
										icon:'fa fa-tasks',
									}
								}
							]
						},
						{
							name:'muban',
							path:'/muban',
							meta:{
								icon:'el-icon-files',
								title:'模板',
								tagTitle:'模板'
							},
							children:[]
						},
						{
							name:'other',
							path:'/other',
							meta:{
								icon:'el-icon-more',
								title:'其他',
								tagTitle:'其他'
							},
							children:[]
						},
						{
							name:'configure',
							path:'/configure',
							meta:{
								icon:'el-icon-setting',
								title:'配置',
								tagTitle:'配置'
							},
							children:[]
						}
					],
				}
			}
		},
	},
}


export default api;