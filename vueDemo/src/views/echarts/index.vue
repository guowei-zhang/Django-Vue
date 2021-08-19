<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never">
					<div id="bar_echarts" style="width: 100%; height: 280px;"></div>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never">
					<div id="pie_echarts" style="width: 100%; height: 280px;"></div>
				</el-card>
			</el-col>
		</el-row>
		
		
		<el-row :gutter="15">
			<el-col :lg="24">
				<el-card shadow="never">
					<div id="line_echarts" style="width: 100%; height: 280px;"></div>
				</el-card>
			</el-col>
			
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name:'echarts',
		mounted(){
			console.log('------------------');
			this.$nextTick(function () {
				this.getEcharts();
			})
		},
		methods:{
			getEcharts(){
				let bar_echarts = this.$Echarts.init(document.getElementById("bar_echarts"));
				if(bar_echarts != null && bar_echarts != "" ){
					bar_echarts.dispose();
				}
				bar_echarts = this.$Echarts.init(document.getElementById("bar_echarts"));
				
				let pie_echarts = this.$Echarts.init(document.getElementById("pie_echarts"));
				if(pie_echarts != null && pie_echarts != "" ){
					pie_echarts.dispose();
				}
				pie_echarts = this.$Echarts.init(document.getElementById("pie_echarts"));
				
				let line_echarts = this.$Echarts.init(document.getElementById("line_echarts"));
				if(line_echarts != null && line_echarts != "" ){
					line_echarts.dispose();
				}
				line_echarts = this.$Echarts.init(document.getElementById("line_echarts"));
				
				var bar_option = {
					title:{
						text:'订单数量'
					},
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [
							120, 
							{
								value: 200,
								itemStyle: {
									color: '#a90000',
								}
							}, 
							150, 
							80, 
							70, 
							110, 
							130
						],
						type: 'bar'
					}]
				};
				bar_echarts.setOption(bar_option);
				
				var pie_option = {
					title: {
						text: '订单来源',
						subtext: '纯属虚构',
						left: 'center'
					},
					tooltip: {
						trigger: 'item'
					},
					legend: {
						orient: 'vertical',
						left: 'left',
					},
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: '50%',
							label: {
								show: false
							},
							data: [
								{value: 1048, name: '搜索引擎'},
								{value: 735, name: '直接访问'},
								{value: 580, name: '邮件营销'},
								{value: 484, name: '联盟广告'},
								{value: 300, name: '视频广告'}
							],
							emphasis: {
								itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				};
				pie_echarts.setOption(pie_option);
				
				var colors = ['#5470C6', '#29ee29'];
				var line_option = {
					color: colors,
					legend: {
						data:['成交单量', '成交金额']
					},
					xAxis: {
						type: 'category',
						data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
					},
					yAxis: [
						{
							name:'成交单量',
							type: 'value',
							axisLine: {
								onZero: false,
								lineStyle: {
									color: colors[0]
								}
							},
						},
						{
							name:'成交金额',
							type: 'value',
							axisLine: {
								lineStyle: {
									color: colors[1]
								}
							},
						},
					],
					series: [
						{
							data:[1,2,3,2,4,6,5,7,8,10,15,10],
							name:'成交单量',
							type:'line',
							//曲线设置
							smooth: true,
							//数据对应哪条Y轴
							yAxisIndex: 0,
						},
						{
							data:[10,20,30,20,40,60,35,55,65,80,100,80],
							name:'成交金额',
							type:'line',
							//曲线设置
							smooth: true,
							//数据对应哪条Y轴
							yAxisIndex: 1,
						}
					]
					
					
				}
				line_echarts.setOption(line_option);
			}
			
			
			
			
			
		}
		
		
		
	}
	
	
	
</script>

<style>
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>
