<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<div class="user-info">
						<div class="user-info-top">
							<el-avatar :size="80" :src="avatarUrl"></el-avatar>
							<h2>{{ form.name||'-' }}</h2>
							<p>{{ form.about||'无签名' }}</p>
							<el-button type="primary" round icon="el-icon-collection-tag" size="medium">Administrator</el-button>
						</div>
						<div class="user-info-main">
							<ul>
								<li><label><i class="el-icon-user"></i></label><span>81883387@qq.com</span></li>
								<li><label><i class="el-icon-present"></i></label><span>1988-05-07</span></li>
								<li><label><i class="el-icon-male"></i></label><span>男</span></li>
								<li><label><i class="el-icon-location-outline"></i></label><span>中国/上海/金山</span></li>
								<li><label><i class="el-icon-office-building"></i></label><span>集团/上海分公司/软件研发部/摸鱼组</span></li>
								<li><label><i class="el-icon-coin"></i></label><span>超级管理员</span></li>
							</ul>
						</div>
						<div class="user-info-bottom">
							<h2>当前账号权限</h2>
							<el-space wrap>
								<el-tag>user.add</el-tag>
								<el-tag>user.edit</el-tag>
								<el-tag>user.delete</el-tag>
								<el-tag>list.add</el-tag>
								<el-tag>list.edit</el-tag>
								<el-tag>list.delete</el-tag>
							</el-space>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :lg="16">
				<el-card shadow="never">
					<el-tabs tab-position="top">
						<el-tab-pane label="近期动态">
							<el-timeline style="margin-top:20px;padding-left:10px;">
								<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" placement="top">
									<div class="activity-item">
										<el-avatar class="avatar" :size="24" :src="avatarUrl"></el-avatar>
										<label>{{activity.operate}}</label><el-tag v-if="activity.mod" size="mini">{{activity.mod}}</el-tag>{{activity.describe}}
									</div>
								</el-timeline-item>
							</el-timeline>
						</el-tab-pane>
						<el-tab-pane label="基本信息">
							<el-form ref="form" :model="form" label-width="80px" style="width: 460px;margin-top:20px;">
								<el-form-item label="账号">
									<el-input v-model="form.user" disabled></el-input>
									<div class="el-form-item-msg">账号信息用于登录，系统不允许修改</div>
								</el-form-item>
								<el-form-item label="姓名">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
								<el-form-item label="性别">
									<el-select v-model="form.sex" placeholder="请选择">
										<el-option label="保密" value="0"></el-option>
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="2"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="个性签名">
									<el-input v-model="form.about" type="textarea"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">保存</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="个人设置">
							<el-form ref="form" :model="form" label-width="120px" style="width: 460px;margin-top:20px;">
								<el-form-item label="布局">
									<el-select v-model="config.theme" placeholder="请选择">
										<el-option label="常规" value="0"></el-option>
										<el-option label="分栏" value="1"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="控制台自由布局">
									<el-switch v-model="config.diy"></el-switch>
								</el-form-item>
								<el-form-item label="多标签">
									<el-switch v-model="config.tags"></el-switch>
								</el-form-item>
								<el-form-item label="系统通知">
									<el-switch v-model="config.msg"></el-switch>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">保存</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name: 'userCenter',
		data() {
			return {
				avatarUrl:require('../../assets/images/avatar.jpg'),
				activities: [
					{
						operate: '更改了',
						mod: '系统配置',
						describe: 'systemName 为 SCUI',
						type: 'edit',
						timestamp: '刚刚'
					},
					{
						operate: '删除了',
						mod: '用户',
						describe: 'USER',
						type: 'del',
						timestamp: '5分钟前'
					},
					{
						operate: '禁用了',
						mod: '用户',
						describe: 'USER',
						type: 'del',
						timestamp: '5分钟前'
					},
					{
						operate: '创建了',
						mod: '用户',
						describe: 'USER',
						type: 'add',
						timestamp: '5分钟前'
					},
					{
						operate: '审核了',
						mod: '用户',
						describe: 'lolowan 为 通过',
						type: 'add',
						timestamp: '10分钟前'
					},
					{
						operate: '登录',
						mod: '',
						describe: '成功',
						type: 'do',
						timestamp: '1小时前'
					},
				],
				form: {
					user: "81883387@qq.com",
					name: "Sakuya",
					sex: "1",
					about: "正所谓富贵险中求"
				},
				config: {
					theme: '1',
					diy: true,
					tags: true,
					msg: true
				}
			}
		}
	}
</script>

<style scoped>
	.el-card {margin-bottom:15px;}
	.activity-item {font-size: 13px;color: #999;display: flex;align-items: center;}
	.activity-item label {color: #333;margin-right:10px;}
	.activity-item .el-avatar {margin-right:10px;}
	.activity-item .el-tag {margin-right:10px;}
	
	
	
	/* USERCENTER */
	.user-info {padding:20px 40px;}
	.user-info-top {text-align: center;}
	.user-info-top h2 {margin-top:10px;font-size: 24px;}
	.user-info-top p {color: #999;margin-top:5px;}
	.user-info-top button {margin-top:10px;}
	.user-info-main {padding:20px 0;}
	.user-info-main li {list-style-type:none;line-height: 2;font-size: 14px;}
	.user-info-main li i {margin-right: 10px;}
	.user-info-bottom {border-top: 1px solid #e6e6e6;}
	.user-info-bottom h2 {font-size: 14px;margin:15px 0;}
</style>
