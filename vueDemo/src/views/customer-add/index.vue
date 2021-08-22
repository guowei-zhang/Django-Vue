
<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="24">
				<el-card>
					<el-row  :gutter="15" style="border-bottom: 1px solid #e6e6e6;padding-bottom: 10px;">
						<el-col :lg="16">
							<h2 style="font-size: 20px;font-weight: bolder;">添加客户</h2>
						</el-col>
						<el-col :lg="8" :push="3">
							<el-button type="primary" @click="saveCustomer()" icon="el-icon-s-claim">保存</el-button>
							<el-button type="primary" @click="returnCustomer()" icon="el-icon-caret-left">返回</el-button>
						</el-col>
					</el-row>
					<el-form style="margin-top: 10px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="客户类型" prop="type">
							<el-radio-group v-model="ruleForm.type">
								<el-radio label="person" ><icon class="el-icon-user"></icon> 个人</el-radio>
								<el-radio label="company"><icon class="el-icon-office-building"></icon> 公司</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="客户名称" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="ruleForm.phone"></el-input>
						</el-form-item>
						
						<el-form-item label="服务地址" prop="serviceAddress">
							<el-input placeholder="请点击按钮选择地址" v-model="ruleForm.serviceAddress" :readonly="true">
								<template #append>
									<el-button  style="color: #ffffff;background-color: #409eff;border-color: #409eff;border: none;border-radius: 0px 5px 5px 0px;"
										icon="el-icon-map-location"></el-button>
								</template>
							</el-input>
						</el-form-item>
						
						
						<el-form-item label="客户来源" prop="score">
							<el-radio-group v-model="ruleForm.score">
								<el-radio label="美食/餐厅线上活动" name="score"></el-radio>
								<el-radio label="地推活动" name="score"></el-radio>
								<el-radio label="线下主题活动" name="score"></el-radio>
								<el-radio label="单纯品牌曝光" name="score"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input type="textarea" v-model="ruleForm.remark"></el-input>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	
import {useRouter} from 'vue-router'
import Qs from 'qs'
export default {
	data() {
		return {
			ruleForm: {
				type:'person',
				name: '',
				phone:'',
				serviceAddress:'',
				score:'',
				remark:''
			},
			rules: {
				name: [
					{ required: true, message: '请输入客户名称', trigger: 'blur' }
					// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' }
				]
				// date1: [
				// 	{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				// ],
				// date2: [
				// 	{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				// ],
				// type: [
				// 	{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				// ],
				// resource: [
				// 	{ required: true, message: '请选择活动资源', trigger: 'change' }
				// ],
				// desc: [
				// 	{ required: true, message: '请填写活动形式', trigger: 'blur' }
				// ]
			}
		};
	},
	setup(){
		
		var router = useRouter();
		function returnCustomer(){
			router.push('/customer');
		}
		return {
			returnCustomer
		}
		
	},
	methods: {
		saveCustomer() {
			this.$refs.ruleForm.validate((valid) => {
				if(valid){
					this.$Axios({
						method:'post',
						url:'http://101.34.160.91:8001/customer/add/',
						data:Qs.stringify(this.ruleForm),
					}).then(res=>{
						if(res.data){
							this.tableData = res.data;
							this.$message({
								type: 'success',
								message: '添加成功!'
							});
							this.returnCustomer();
						}
						console.log(res.data);
					})
					.catch(err=>{
						console.log(err);
					})
				}
			});
		}
	}
}
</script>

<style>

</style>
