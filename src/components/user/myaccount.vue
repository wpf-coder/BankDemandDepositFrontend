<template>
	<div>
		<el-card class="box-card" shadow="always">
			<h2>我的账户信息</h2>
			<div class="block" style="width: 400px;height: 200px;float: left;margin-top: 50px;">
				<el-image style="width: 58px; height: 40px;margin-left: 5%;float: left;margin-top: 30px;" :src="require('@/assets/blue_card.png')"></el-image>
				<!-- 		<el-tag>{{card}}</el-tag>	-->
				<h4 style="margin-left: 150px;margin-top: 20px;color: #00a0e9;width: 150px;">银行卡状态：{{cardstate}}</h4>
				<h4 style="margin-left: 150px;color: #263e89;width: 200px;">{{card}}</h4>
			</div>
			<div class="block" style="width: 200px;height: 200px;float: left;margin-top: 50px;">
				<h4 style="margin-left: 150px;margin-top: 20px;color: #838383;width: 150px;">币种</h4>
				<span style="margin-left: 150px;">人民币</span>
			</div>
			<div class="block" style="width: 200px;height: 200px;float: left;margin-top: 50px;margin-left: 150px;">
				<h4 style="margin-top: 20px;color: #838383;width: 150px;">余额</h4>
				<span style="">{{cardbalance}}</span>
			</div>
			<div class="block" style="width: 200px;height: 200px;float: left;margin-top: 50px;">
				<el-button style="margin-top: 10px;color: #333333;" @click="searchflow()" type="info" plain>明细</el-button><br>
				<el-button style="margin-top: 10px;color: #333333;" @click="transfer()" type="info" plain>转账</el-button>
			</div>
		</el-card>
		<!-- <el-card style="margin-top: 50px;margin-left:100px;width: 400px;"> -->
		<el-card style="margin-top: 20px;margin-left:120px;width: 500px;float: left;" shadow="always">
			<div class="home-index-box" style="float: left;margin-top: 20px;">
				<!--饼状图and环形图-->
				<div class="graph-pie-warp">
					<el-row :gutter="30">
						<el-col :span="12">
							<div id="home_gathering_source" style="height: 300px; margin:30px 10px; padding: 0px;"></div>
						</el-col>
					</el-row>
				</div>
			</div>
		</el-card>
		<el-card style="float: right;margin-top: 20px;margin-right:120px;width: 700px;height: 400px;" shadow="always">
			<div class="home-index-box" v-loading="loading" style="float: left;margin-top: 40px;">
				<!--折线趋势图-->
				<div class="graph-doubleLine-warp">
					<el-row :gutter="20">
						<el-col :span="24">
							<div class="selection-box">
								近七日交易金额变化情况:
							</div>
							<div id="home_DoubleLine" style="width: 85%;height: 250px;"></div>
						</el-col>
					</el-row>
				</div>
			</div>
		</el-card>
	</div>

</template>

<script>
	import Qs from 'qs';
	import API from '../../../API/api.js';
	import moment from 'moment';
	import ECharts from 'echarts';
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
				cardstate: '正常',
				card: "8888880000000000000",
				cardbalance: 999999,
				//饼状图
				gatheringSourceOption,
				//折线图
				doubleLineOption: lineDefaultOpt,
				selectGatheringTime: [],
				amountfinal: [0, 0, 0, 0, 0, 0, 0],
				dateamount: [],
			};
		},
		mounted: function() {

			this.searchcard();
			this.queryall();
			this.getnewLineData();


		},
		methods: {
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
				this.$axios.post(API.transactionFlow, {
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

								if (dealflowdata[i].type == 1) {
									amounttoday += dealflowdata[i].amount;
								} else if (dealflowdata[i].type == 2) {
									amounttoday -= dealflowdata[i].amount;
								} else if (dealflowdata[i].type == 16) {
									amounttoday += dealflowdata[i].amount;
								} else if (dealflowdata[i].type == 4) {
									amounttoday -= dealflowdata[i].amount;
								} else {
									amounttoday += dealflowdata[i].amount;
								}
								console.log("jjj" + amounttoday);
								for (var j = 0; j < 7; j++) {
									if (new Date(dealflowdata[i].time.split('T')[0]).getTime() == new Date(this.dateamount[j]).getTime()) {
										this.amountfinal[j] = amounttoday;
									}
								}

							}
							//this.amountfinal.push(amounttoday);

							var list = [{
									name: '交易金额',
									type: 'line',
									symbol: 'circle',
									symbolSize: [5, 5],
									data: this.amountfinal
								},
								{
									name: '日期',
									type: 'line',
									symbol: 'circle',
									symbolSize: [5, 5],
									data: this.dateamount
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
							}
						});
			},

			//饼状图搜数据
			queryall() {
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
				this.$axios.post(API.transactionFlow, {
						startTime: stime._i,
						endTime: etime._i,
						type: '1023',
					})
					.then(
						successResponse => {
							var dealflowdata = successResponse.data.data;
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
								
							}
						});
			},
			searchflow() {
				console.log("2021.9.22:     " + this.amountfinal);
				this.$router.push({
					path: '/dealflow'
				});
			},
			transfer() {
				this.$router.push({
					path: '/transfer'
				});
			},
			eChartsInit(domId, theme, opt) {
				ECharts.init(document.getElementById(domId), theme).setOption(opt)
				window.addEventListener('resize', () => {
					ECharts.init(document.getElementById(domId), theme).resize()
				})
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

			searchcard() {
				this.$axios.post(API.querycard)
					.then(
						successResponse => {
							if (successResponse.data.state == 0) {
								console.log(successResponse.data.message);
								this.cardbalance = successResponse.data.data.balance;
								this.card = successResponse.data.data.id;

								if (successResponse.data.data.state == 1) {
									this.cardstate = "正常";
								} else if (successResponse.data.data.state == 2) {
									this.cardstate = "久悬";
								} else {
									this.cardstate = "冻结";
								}
							} else {
								console.log(successResponse.data.message);
							}

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
										path: '/userlogin'
									});
								}).catch(() => {

								});
								// this.sessionStorage.clear(); //清空缓存


							}
						});


			}
		}
	}
</script>

<style>
	.home-index-box {
		width: 800px;
	}

	.el-main {
		height: 650px;
	}

	.el-card__header {
		background-color: #f5faff;
	}

	.box-card {
		width: 1200px;
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
