<template>
	<el-card style="width: =500px" class="box-card">
		<span>总账查询</span>
		<el-divider></el-divider>
		<div class="block">
			<span class="demonstration" style="margin-left:30px">开始时间:</span>
			<el-date-picker v-model="begin_date" type="date" placeholder="选择日期时间" style="margin-left: 10px;"  :picker-options="pickerOptionsBegin">
			</el-date-picker>
			<span class="demonstration" style="margin-left:30px">结束时间:</span>
			<el-date-picker v-model="end_date" type="date" placeholder="选择日期时间" style="margin-left: 10px;"  :picker-options="pickerOptionsEnd">
			</el-date-picker>

			<span style="margin-left:30px">选择总账类型：</span>
			<el-select v-model="generaltype" placeholder="请选择" style="margin-left: 10px;">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary" @click="onSubmit" style="margin-left: 30px;">查询</el-button>
		</div>
		<el-table ref="multipleTable" :data="tableData.slice((pagination.currentPage - 1) * pagination.pageSize, pagination.currentPage * pagination.pageSize)"
		 height="500px" tooltip-effect="dark" :default-sort="{prop:'accountTime',order:'descending'}" stripe>
			<el-table-column prop="accountTime" label="总账日期" :formatter="dateFormat" sortable>
			</el-table-column>
			<el-table-column prop="subjectSerial" label="总账类型" :formatter="typeFormat">
			</el-table-column>
			<el-table-column prop="beginDebtor" label="期初借方余额(元)" :formatter="moneytype">
			</el-table-column>
			<el-table-column prop="beginCredit" label="期初贷方余额(元)" :formatter="moneytype">
			</el-table-column>
			<el-table-column prop="interimDebit" label="本期借方发生额(元)" :formatter="moneytype">
			</el-table-column>
			<el-table-column prop="interimCredit" label="本期贷方发生额(元)" :formatter="moneytype">
			</el-table-column>
			<el-table-column prop="endDebtor" label="期末借方余额(元)" :formatter="moneytype">
			</el-table-column>
			<el-table-column prop="endCredit" label="期末贷方余额(元)" :formatter="moneytype">
			</el-table-column>
		</el-table>
		<div style="margin-left:30%">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
			 background :page-sizes="[5, 10, 15,20]" :page-size="pagination.pageSize" :current-page="pagination.currentPage"
			 :total="tableData.length"></el-pagination>
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
				datenow: '',
				// 分页
				pagination: {
					// 默认第1页
					currentPage: 1,
					// 默认显示5条
					pageSize: 5,
					// 默认总条数为0
					total: 0,
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > this.datenow;
					}
				},
				tableData: [],
				begin_date: '',
				end_date: '',
				maxtime: '',
				options: [{
						value: '0',
						label: '全部'
					}, {
						value: '101001',
						label: '101001(现金总账)'
					}, {
						value: '215001',
						label: '215001(用户活期存款)'
					}, {
						value: '260001',
						label: '260001(应付利息)'
					}, {
						value: '640002',
						label: '640002(利息支出)'
					}

				],
				generaltype: '',
				pickerOptionsBegin: {
					disabledDate: time => {
						let endDateVal = this.end_date;
						if (endDateVal) {
							return time.getTime() > new Date(endDateVal).getTime() || time.getTime() > new Date(this.datenow) || time.getTime() < new Date(this.maxtime);
						}
					}
				},
				pickerOptionsEnd: {
					disabledDate: time => {
						let beginDateVal = this.begin_date;
						if (beginDateVal) {
							return time.getTime() < new Date(beginDateVal).getTime() || time.getTime() > new Date(this.datenow) || time.getTime() < new Date(this.maxtime);
						}
					}
				}
			};
		},
		mounted: function() {
			this.generaltype = "0";
			this.$axios.post(API.getTime)
				.then(
					successResponse => {
						console.log(successResponse);
						var time = successResponse.data.substring(0, 10);
						console.log("111111111111" + time);
						this.begin_date = time;
						this.end_date = time;
						this.datenow = time;
						this.maxtime = this.datenow - 3600 * 1000 * 24 * 90;
					})
			console.log(date);

		},

		methods: {
			moneytype(row, column, cellValue) {
				const moneynow = row[column.property]
				if (moneynow % 1 == 0) {
					return moneynow + ".00";
				} else if ((moneynow * 10) % 1 == 0) {
					return moneynow + "0";
				}
				return moneynow;
			},
			// 每页显示条数
			handleSizeChange(pageSize) {
				this.pagination.pageSize = pageSize
			},

			// 当前页
			handleCurrentChange(currentPage) {
				this.pagination.currentPage = currentPage
			},
			dateFormat(row, column, cellValue, index) {
				const daterc = row[column.property]
				if (daterc != null) {
					return moment(daterc).format("YYYY-MM-DD")
				}
			},
			typeFormat(row, column) {
				const Type = row.subjectSerial;
				if (Type == "101001") {
					return "101001(现金总账)";
				} else if (Type == "260001") {
					return "260001(应付利息)";
				} else if (Type == "640002") {
					return "640002(利息支出)";
				} else {
					return "215001(用户活期存款)";
				}
			},

			onSubmit() {
				console.log('submit!');

				var begintime = moment(this.begin_date).format("YYYY-MM-DD HH:mm:ss").substring(0, 10);
				var endtime = moment(this.end_date).format("YYYY-MM-DD HH:mm:ss").substring(0, 10);
				var select = {
					startTime: begintime, //开始时间
					endTime: endtime, //结束时间
					type: this.generaltype //总账类型
				}
				this.$axios({
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'post',
						data: JSON.stringify(select), //上传的参数
						url: API.cashLedger, //请求的url。与后端@Request Mapping注解中的值一致。
					})
					.then(
						successResponse => {
							console.log(successResponse);
							this.tableData = successResponse.data.data;
						}).catch(
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
			}
		}
	};
</script>

<style></style>
