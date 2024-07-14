<template>
	<!-- <el-card class="box-card" shadow="always">
		<div class="block">
			<el-carousel trigger="click" height="380px">
				<el-carousel-item v-for="(img,index) in imgList" :key="index">
					<img :src="img.url" width="100%" height="100%">
				</el-carousel-item>
			</el-carousel>
		</div>
	</el-card> -->
	<div class="home-index-box">
		<!--饼状图and环形图-->
		<div class="graph-pie-warp">
			<el-row :gutter="30">
				<el-col :span="12">
					<div id="home_gathering_source"
						 style="height: 300px; margin:30px 10px; padding: 0px;"></div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import API from '../../../API/api.js';
	import Qs from 'qs'
	import moment from 'moment'
  import ECharts from 'echarts'
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
          total += data[i].value  //计算出当前对象总和
          if (data[i].name == name) {
            tarValue = data[i].value //存放当前渲染的legend 对象
          }
        }
        let p = (tarValue / total * 100).toFixed(2) //百分比保留小数点后两位
        return `${name}  |  ${p}%  `
      }
    },
    series: [
      {
        name: '请查收您的交易流水统计',
        type: 'pie',
        radius: '60%',
        center: ['25%', '55%'],
        selectedMode: 'single',
        data: [ ],
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
      }
    ]
  }
  export default {
	  name: 'index',
    data() {
      return {
		  	imgList: [{
		  			url: require('@/assets/bus.png')
		  		},
		  		{
		  			url: require('@/assets/constru.jpg')
		  		},
		  		{
		  			url: require('@/assets/nong.jpg')
		  		}
		  	],
        gatheringSourceOption,
      }
    },
	 mounted() {
	    this.queryall();
				//this.getProportionData()//收款的饼图的数据
	},
    methods: {
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
					
					console.log(dealflowdata);
					var sourceList=[
					  { value: 0, name: '存款' },
					  { value: 0, name: '取款' },
					  { value: 0, name: '转账' },
					  { value: 0, name: '利息结算' },
					]
					console.log("!!!!!!!!!!!!"+dealflowdata.length);
					
					for(var i=0;i<dealflowdata.length;i++)
					{
						console.log("dealflowdata"+dealflowdata[i]);
						if(dealflowdata[i].type==1)
						{
							sourceList[0].value+=dealflowdata[i].amount;
						}
						else if(dealflowdata[i].type==2)
						{
							sourceList[1].value+=dealflowdata[i].amount;
						}
						else if(dealflowdata[i].type==16)
						{
							sourceList[3].value+=dealflowdata[i].amount;
						}
						else
						{
							sourceList[2].value+=dealflowdata[i].amount;
						}
					}
					console.log("*****"+sourceList);
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
						// this.sessionStorage.clear(); //清空缓存
	
	
					}
				});
	},	
    eChartsInit(domId, theme, opt) {
        ECharts.init(document.getElementById(domId), theme).setOption(opt)
        window.addEventListener('resize', () => {
          ECharts.init(document.getElementById(domId), theme).resize()
        })
      },
    }
  }
</script>
<style>
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

