<template>
	<!-- 获得日期、选择日期如果只输入年月日处理 -->
	<el-card class="box-card" shadow="always">
		<div slot="header" class="clearfix">
			<span style="font-weight: bold;color: #909399;">用户交易流水查询</span>
		</div>
		<div>
			<a style="margin-left:30px">银行卡号</a>
			<el-input v-model="cardId" style="margin-left: 10px;width: 220px;"></el-input>
		</div>
		
		<div style="margin-top: 10px;">
			<a style="margin-left:30px">开始时间</a>
			<el-date-picker v-model="startTime" type="datetime" placeholder="开始时间" style="margin-left: 10px;" :picker-options="pickerOptionsBegin"></el-date-picker>
			<a style="margin-left:30px">结束时间</a>
			<el-date-picker v-model="endTime" type="datetime" placeholder="结束时间" style="margin-left: 10px;" :picker-options="pickerOptionsEnd"></el-date-picker>
			<a style="margin-left:30px">业务类型</a>
			<el-select v-model="servicetype" placeholder="全部" style="margin-left:10px">
				<el-option v-for="item in serviceop" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button @click="queryall()" type="primary" icon="el-icon-search" style="float: right;margin-right: 10px;">查询</el-button>
		</div>
		<div style="margin-top:20px">
			<el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="tableData.slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize)"
			 height="500px" tooltip-effect="dark" :default-sort="{prop:'time',order:'descending'}" stripe>
				<el-table-column prop="time" label="交易时间" :formatter="dateFormat" sortable>
				</el-table-column>
				<el-table-column prop="type" label="业务类型" :formatter="typeFormat">
				</el-table-column>
				<el-table-column prop="amount" label="发生金额" :formatter="amountFormat">
				</el-table-column>
				<el-table-column prop="subjectCardBalance" label="账户余额">
				</el-table-column>
				<el-table-column prop="counterpartyCardNumber" label="对方账户">
				</el-table-column>
			</el-table>
			<div style="margin-left:30%">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
				 background :page-sizes="[5, 10, 15,20]" :page-size="pagination.pageSize" :current-page="pagination.currentPage"
				 :total="tableData.length"></el-pagination>
			</div>

		</div>
	</el-card>
</template>

<script>
	import API from '../../../API/api.js';
	import Qs from 'qs'
	import moment from 'moment'
	export default {

		data() {
			return {
				cardId: '',
				startTime: '',
				endTime: '',
				maxtime: '',
				servicetype: '',
				tableData: [],
				serviceop: [{
					value: '1023',
					label: '全部'
				}, {
					value: '1',
					label: '存款'
				}, {
					value: '2',
					label: '取款'
				}, {
					value: '4',
					label: '转账'
				}, {
					value: '8',
					label: '利息结算'
				}],
				pickerOptionsBegin: {
					disabledDate: time => {
						let endDateVal = this.endTime;
						if (endDateVal) {
							return time.getTime() > new Date(endDateVal).getTime() || time.getTime() > new Date().getTime() || time.getTime() < new Date(this.maxtime);
						}
					}
				},
				pickerOptionsEnd: {
					disabledDate: time => {
						let beginDateVal = this.startTime;
						if (beginDateVal) {
							return time.getTime() < new Date(beginDateVal).getTime() || time.getTime() > new Date().getTime() || time.getTime() < new Date(this.maxtime);
						}
					}
				},

				// 分页
				pagination: {
					// 默认第1页
					currentPage: 1,
					// 默认显示5条
					pageSize: 5,
					// 默认总条数为0
					total: 0,
				},
			}
		},
		mounted: function() {
			var ss = 24 * 60 * 60 * 1000;
			this.startTime = new Date(new Date().getTime() - ss * 7);
			this.endTime = new Date();
			this.maxtime = new Date(new Date().getTime() - ss * 90);
			this.servicetype = "1023";
			//this.queryall();
		},
		methods: {
			//时间格式化
			dateFormat(row, column, cellValue, index) {
				const daterc = row[column.property]
				if (daterc != null) {
					return moment(daterc).format("YYYY-MM-DD HH:mm:ss")
				}
			},
			typeFormat(row, column) {
				const Type = row.type;
				if (Type == 1) {
					return "存款";
				} else if (Type == 2) {
					return "取款";
				} else if (Type == 4) {
					return "转账";
				} else {
					return "利息结算";
				}
			},
			amountFormat(row, column) {
				const Type = row.type;
				var amount = row.amount;
				var oamount = -amount;
				if (Type == 1) {
					return amount;
				} else if (Type == 2) {
					return oamount;
				} else if (Type == 4) {
					return oamount;
				} else {
					return amount;
				}
			},
			// 每页显示条数
			handleSizeChange(pageSize) {
				this.pagination.pageSize = pageSize
			},

			// 当前页
			handleCurrentChange(currentPage) {
				this.pagination.currentPage = currentPage
			},
			queryall() {
				var stime = moment(this.startTime.toLocaleString('zh', {
					hour12: false
				}).split('/').join('-'));
				var etime = moment(this.endTime.toLocaleString('zh', {
					hour12: false
				}).split('/').join('-'));
				console.log(stime._i);
				console.log(etime._i);
				if (this.cardId == "" || this.cardId == null) {
					this.$confirm('请输入银行卡号', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					})
				} else {
					this.$axios.post(API.tellerserial, {
							cardId: this.cardId,
							startTime: stime._i,
							endTime: etime._i,
							type: this.servicetype,
						})
						.then(
							successResponse => {
								if (successResponse.data.state == 0) {
									this.tableData = successResponse.data.data;
									console.log(this.tableData);
								} else {
									this.$confirm(successResponse.data.message, '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消'
									})
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
											path: '/'
										});
									}).catch(() => {});
								}
							});
				}

			}
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
