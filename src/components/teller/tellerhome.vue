<template>
	<div>
		<el-card style="width: 400px;height: 100px;float: left;margin-left: 20px;">
			<el-image style="width: 50px; height: 50px;margin-left: 10px;float: left;" :src="require('@/assets/clock.png')">
			</el-image>
			<!-- <h3 style="margin-right: 20px;float: right;">会计日期</h3>
			<h3 style="margin-right: 20px;float: right;">2021-09-22</h3> -->
			<h3 style="margin-left: 40px;float: left;">会计日期</h3>
			<h3 style="margin-left: 20px;float: left;">{{nowtime}}</h3>
		</el-card>
		<el-card style="width: 400px;height: 100px;float: left;margin-left: 10px;">
			<el-image style="width: 50px; height: 50px;margin-left: 10px;float: left;" :src="require('@/assets/rate.png')">
			</el-image>
			<!-- <h3 style="margin-right: 20px;float: right;">会计日期</h3>
			<h3 style="margin-right: 20px;float: right;">2021-09-22</h3> -->
			<h3 style="margin-left: 40px;float: left;">当前年利率</h3>
			<h3 style="margin-left: 20px;float: left;">0.35%</h3>
		</el-card>
		<!-- <el-card style="width: 400px;height: 100px;float: left;margin-left: 10px;">
			<el-image style="width: 50px; height: 50px;margin-left: 10px;float: left;" :src="require('@/assets/user.png')">
			</el-image>
			<h3 style="margin-left: 40px;float: left;">近三个月系统流水量</h3>
			<h3 style="margin-left: 20px;float: left;">{{todayflow}}</h3>
		</el-card>
		<el-card style="float: left;margin-top: 20px;margin-left:20px;width: 500px;height: 400px;" shadow="always">
			<div class="home-index-box" style="float: left;margin-top: 20px;">
				<div class="graph-pie-warp">
					<el-row :gutter="30">
						<el-col :span="12">
							<div id="home_gathering_source" style="height: 300px; margin:30px 10px; padding: 0px;"></div>
						</el-col>
					</el-row>
				</div>
			</div>
		</el-card>
		<el-card style="float: right;margin-top: 20px;margin-right:20px;width: 700px;height: 400px;" shadow="always">
			<div class="home-index-box" v-loading="loading" style="float: left;margin-top: 40px;">
				<div class="graph-doubleLine-warp">
					<el-row :gutter="20">
						<el-col :span="24">
							<div class="selection-box">
								近七日交易流水量变化情况:
							</div>
							<div id="home_DoubleLine" style="width: 85%;height: 250px;"></div>
						</el-col>
					</el-row>
				</div>
			</div>
		</el-card> -->
	</div>
</template>

<script>
	import Qs from 'qs';
	import API from '../../../API/api.js';
	import moment from 'moment';
	import ECharts from 'echarts'
	//、折线图
	let lineDefaultOpt = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			bottom: 0,
			left: 'center'
		},
		grid: {
			left: 30,
			bottom: 50,
			containLabel: true
		},
	
		xAxis: {
			type: 'category',
			boundaryGap: false,
			axisLine: {
				lineStyle: {
					color: ['#666666'],
					width: 1,
					type: 'solid'
				}
			}
		},
		yAxis: {
			type: 'value',
			boundaryGap: ['0%', '20%'],
			axisLine: {
				lineStyle: {
					color: ['#666666'],
					width: 1,
					type: 'solid'
				}
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#C4C4C4',
					width: 1,
					type: 'dashed'
				}
			}
		},
		series: []
	}
	let gatheringSourceOption = {
		title: {
			text: '最近三个月交易流水占比图:',
			left: 'left'
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)'
		},
		legend: {
			type: 'scroll',
			orient: 'vertical',
			right: 0,
			top: 'center',
			icon: 'circle',
			selectedMode: 'multiple',
			formatter: (name) => { //legend显示数据格式化,每一个 legend 渲染都会回调这个函数
				let data = gatheringSourceOption.series[0].data //获取当前对象的series.data
				let total = 0 //数据对象总和存放
				let tarValue = 0 // 当前对象的value 值
				for (let i = 0, l = data.length; i < l; i++) { //循环饼状图数据对象
					total += data[i].value //计算出当前对象总和
					if (data[i].name == name) {
						tarValue = data[i].value //存放当前渲染的legend 对象
					}
				}
				let p = (tarValue / total * 100).toFixed(2) //百分比保留小数点后两位
				return `${name}  |  ${p}%  `
			}
		},
		series: [{
			name: '请查收您的交易流水统计',
			type: 'pie',
			radius: '60%',
			center: ['35%', '55%'],
			selectedMode: 'single',
			data: [],
			label: {
				show: false
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	}

	export default {
		name: 'index',
		data() {
			return {
				nowtime: '2021-9-27',
				todayflow:'',
				//饼状图
				gatheringSourceOption,
				//折线图
				doubleLineOption: lineDefaultOpt,
				selectGatheringTime: [],
				amountfinal: [0, 0, 0, 0, 0, 0, 0],
				dateamount: [],
			}
		},
		mounted() {
			
				this.getTime();
				    window.setInterval(() => {
				        setTimeout(()=>{
				        	console.log("获取当前时间");
							this.getTime();
				        },0);
				        }, 60*1000)	
			
			// this.getnewcircleData()
			// this.getnewLineData() //收款折线数据
		},
		methods: {
			getTime() {
				this.$axios.post(API.getTime)
					.then(
						successResponse => {
							console.log(successResponse);
							var time = successResponse.data.substring(0, 10);
							console.log(time);
							this.nowtime = time;
						})
			},
			//饼状图搜数据
			getnewcircleData() {
				var ss = 24 * 60 * 60 * 1000;
				this.startTime = new Date(new Date().getTime() - ss * 90);
				this.endTime = new Date();
				var stime = moment(this.startTime.toLocaleString('zh', {
					hour12: false
				}).split('/').join('-'));
				var etime = moment(this.endTime.toLocaleString('zh', {
					hour12: false
				}).split('/').join('-'));
				console.log(stime._i);
				console.log(etime._i);
				this.$axios.post(API.queryallflow, {
						startTime: stime._i,
						endTime: etime._i,
						type: '1023',
					})
					.then(
						successResponse => {
							var dealflowdata = successResponse.data.data;
							this.todayflow=dealflowdata.length;
							var sourceList = [{
									value: 0,
									name: '存款'
								},
								{
									value: 0,
									name: '取款'
								},
								{
									value: 0,
									name: '转账'
								},
								{
									value: 0,
									name: '利息结算'
								},
							]
							for (var i = 0; i < dealflowdata.length; i++) {
								if (dealflowdata[i].type == 1) {
									sourceList[0].value += dealflowdata[i].amount;
								} else if (dealflowdata[i].type == 2) {
									sourceList[1].value += dealflowdata[i].amount;
								} else if (dealflowdata[i].type == 16) {
									sourceList[3].value += dealflowdata[i].amount;
								} else {
									sourceList[2].value += dealflowdata[i].amount;
								}
							}
							this.gatheringSourceOption.series[0].data = sourceList;
							this.eChartsInit('home_gathering_source', 'light', this.gatheringSourceOption)
						})
					.catch(
						error => {
							console.log(error);
							if (error.response.status === 302) {
								console.log("报错了");
								this.$confirm('登录状态异常，请重新登录', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消'
								}).then(() => {
									this.$router.push({
										path: '/'
									});
								}).catch(() => {
			
								});
							}
						});
			},
			getProportionData() {
				let _this = this;
				var sourceList = [{
						value: 10,
						name: '存款'
					},
					{
						value: 2,
						name: '取款'
					},
					{
						value: 2,
						name: '转账'
					},
					{
						value: 3,
						name: '利息结算'
					},
				]
				this.gatheringSourceOption.series[0].data = sourceList
				this.eChartsInit('home_gathering_source', 'light', this.gatheringSourceOption)
			},
			eChartsInit(domId, theme, opt) {
				ECharts.init(document.getElementById(domId), theme).setOption(opt)
				window.addEventListener('resize', () => {
					ECharts.init(document.getElementById(domId), theme).resize()
				})
			},
			getnewLineData() {
				var ss = 24 * 60 * 60 * 1000;

				for (var n = 0; n < 7; n++) {
					var endTime = new Date(new Date().getTime() - ss * n);
					var etime = moment(endTime.toLocaleString('zh', {
						hour12: false
					}).split('/').join('-'));
					var todaydate = etime._i.split(' ')[0];
					this.dateamount.push(todaydate);
				}
				var startacctime = this.dateamount[6] + " 00:00:01";
				var endacctime = this.dateamount[0] + " 23:59:59";
				this.$axios.post(API.queryallflow, {
						startTime: startacctime,
						endTime: endacctime,
						type: '1023',
					})
					.then(
						successResponse => {
							console.log("dealflowdata:");
							console.log(successResponse);
							var dealflowdata = successResponse.data.data;

							var amounttoday = 0;
							for (var i = 0; i < dealflowdata.length; i++) {
								for (var j = 0; j < 7; j++) {
									if (new Date(dealflowdata[i].time.split('T')[0]).getTime() == new Date(this.dateamount[j]).getTime()) {
										this.amountfinal[j] ++;
									}
								}

							}
							//this.amountfinal.push(amounttoday);

							var list = [{
									name: '交易发生次数',
									type: 'line',
									symbol: 'circle',
									symbolSize: [5, 5],
									data: this.amountfinal
								}
							]
							this.doubleLineOption.series = list
							this.doubleLineOption.xAxis.data = this.dateamount
							this.eChartsInit('home_DoubleLine', 'light', this.doubleLineOption)
						})
					.catch(
						error => {
							console.log(error);
							if (error.response.status === 302) {
								console.log("报错了");
								this.$confirm('登录状态异常，请重新登录', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消'
								}).then(() => {
									this.$router.push({
										path: '/'
									});
								}).catch(() => {

								});
							}
						});
			},
		}
	}
</script>

<style lang="sass" scoped>

</style>
