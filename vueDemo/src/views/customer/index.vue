<template>
	<router-view  :class="$store.state.keepAlive.treeRouteShow?'showDom':'hideDom'"></router-view>
	<div :class="secondRouteShow?'showDom':'hideDom'">
	<el-main >
		<el-row :gutter="15">
			<el-col :lg="24">
				<el-card shadow="never">
					<el-row :gutter="15">
						<el-col :lg="8">
							<el-input v-model="searchTxt" v-on:keyup.enter="search()" placeholder="请输入内容">
								<template #append>
									<el-button @click="search()" 
										style="color: #ffffff;background-color: #409eff;border-color: #409eff;border: none;border-radius: 0px 5px 5px 0px;" icon="el-icon-search">
										搜索
									</el-button>
								</template>
							</el-input>
						</el-col>
						
						<el-col :lg="8">
							<el-button type="primary" icon="el-icon-edit-outline" @click="addCustomer()">
								添加
							</el-button>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		
		<el-row style="margin-top: 10px;" :gutter="15">
			<el-col :lg="24">
				<el-card shadow="never">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column label="客户名称">
							<template #default="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column prop="status" label="客户状态" sortable width="120">
							<template #default="scope">
								<p :class="scope.row.status=='启用'?'color-green':'color-red'">{{scope.row.status}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="phone" label="联系方式"></el-table-column>
						<el-table-column prop="serviceAddress" label="服务地址" show-overflow-tooltip></el-table-column>
						<el-table-column prop="createAt" label="创建日期" show-overflow-tooltip></el-table-column>
						<el-table-column label="操作">
							<template #default="scope">
								
								<!-- <el-button icon="el-icon-lock" v-if="scope.row.status=='启用'"
									size="mini" type="danger"
									@click="handleEdit(scope.$index, scope.row)">禁用</el-button>
									
								<el-button icon="el-icon-unlock" v-if="scope.row.status=='未启用'"
									size="mini"
									@click="handleEdit(scope.$index, scope.row)">启用</el-button> -->
								<el-button icon="el-icon-edit-outline"
									size="mini"
									@click="editCustomer(scope.row.id)">编辑</el-button>
								<el-button icon="el-icon-delete"
									size="mini"
									type="danger"
									@click="handleDelete(scope.row.id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					
				</el-card>
			</el-col>
		</el-row>
		
	</el-main>
	</div>
	
</template>

<script>
	
	import {useRouter} from 'vue-router'
	export default {
		data(){
			return {
				searchTxt:'',
				secondRouteShow:this.$store.state.keepAlive.secondRouteShow,
				tableData:[{id:2}]
			}
		},
		setup() {
			const router = useRouter();
			function addCustomer(){
				router.push({
					//传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定 
					path:'/customer-add',
					query:{
						num:1
					}
				});
			}
			function editCustomer(id){
				router.push({
					//传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定 
					path:'/customer-edit',
					query:{
						'id':id
					}
				});
				
			}
			return{
				addCustomer,
				editCustomer//一定要要放在return里才能在模板上面使用
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			search(){
				var searchTxt = this.searchTxt;
				let param = new URLSearchParams();
				param.append('searchTxt', searchTxt);
				this.$Axios({
					method:'post',
					headers: {"X-Requested-With": "XMLHttpRequest"},
					url:'http://127.0.0.1:8000/customer/search/',
					data:param,
				}).then(res=>{
						this.tableData = res.data.data;
						console.log(res.data);
				})
				.catch(err=>{
					console.log(err);
				})
				
			},
			getList(){
				this.$Axios({
					method:'get',
					url:'http://127.0.0.1:8000/customer/lists',
				}).then(res=>{
					this.tableData = res.data.data;
					console.log(res.data);
				})
				.catch(err=>{
					console.log(err);
				})
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleDelete(id){
				var searchTxt = this.searchTxt;
				let param = new URLSearchParams();
				param.append('id', id);
				this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					this.$Axios({
						method:'post',
						headers: {"X-Requested-With": "XMLHttpRequest"},
						url:'http://127.0.0.1:8000/customer/delete/',
						data:param,
					}).then(res=>{
						this.getList();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
					.catch(err=>{
						console.log(err);
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				
			},
		}
	}
	
</script>

<style>
	.color-green{
		color: #29ee29;
	}
	
	.color-red{
		color: #ee2b58;
	}
	
	
	
</style>
