<template>
	<el-card style="width: =500px" class="box-card">
		<div slot="header" class="clearfix">
			<span>用户存款余额查询</span>
		</div>
		<div>
			<el-form :inline="true" ref="cardbalance" :model="cardbalance" label-width="100px" style="margin-left: 300px;margin-right: 100px;margin-top: 20px;">
				<el-form-item label="手机号" style="margin-left: 50px;" prop="phone" v-show="showname">
					<el-input v-model="cardbalance.phone" style="width:350px;" v-show="showname"></el-input>
					<el-button @click="showlogin" style="margin-left: 10px;">切换查询方式</el-button>
				</el-form-item>
				<el-form-item label="身份证号" style="margin-left: 50px;" prop="idCard" v-show="showphone">
					<el-input v-model="cardbalance.idCard" style="width:350px;" v-show="showphone"></el-input>
					<el-button @click="showlogin" style="margin-left: 10px;">切换查询方式</el-button>
				</el-form-item>
				<el-form-item label="密码" style="margin-left: 50px;">
					<el-input v-model="cardbalance.password" style="width:350px;" type="password"></el-input>
				</el-form-item>
				<!-- <el-form-item label="支付密码" style="margin-left: 50px;" prop="paypwd" >
					<el-input v-model="cardbalance.paypwd" style="width:350px;" type="password"></el-input>
				</el-form-item> -->
				<el-form-item label="账户余额(元)" style="margin-left: 50px;">
					<el-input v-model="cardbalance.balance" style="width:350px;" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" ref="cardbalance" :model="cardbalance" label-width="80px" style="margin-left: 300px;margin-right: 100px;margin-top: 20px;">
				<el-form-item style="margin-left: 80px;">
					<el-button type="primary" style="width:100px;" @click="submitForm()">查询</el-button>
				</el-form-item>
				<el-form-item style="margin-left: 200px;">
					<el-button type="primary" style="width:100px;" @click="searchflow()">查询流水</el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-card>
</template>

<script>
	import Qs from 'qs';
	import API from '../../../API/api.js';
	export default {
		data() {
			return {
				showphone: false,
				showname: true,
				cardbalance: {
					idCard: '',
					phone: '',
					balance: '',
					paypwd: '',
					password: '',
					searchType: '1',
				},
			};
		},
		mounted: function() {

			// submitForm();
		},
		methods: {
			searchflow() {
				this.$router.push({
					path: '/dealflow'
				});

			},
			showlogin() {
				this.showphone = !this.showphone;
				this.showname = !this.showname;
				if (this.showname == true) {
					this.cardbalance.searchType = 1;
				}
				if (this.showphone == true) {
					this.cardbalance.searchType = 0;
				}
				console.log(this.cardbalance.searchType);
			},
			submitForm() {
				console.log('submit!');
				var balance = {
					idCard: this.cardbalance.idCard,
					phone: this.cardbalance.phone,
					searchType: this.cardbalance.searchType,
				}
				this.$axios({
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'post',
						data: JSON.stringify(balance), //上传的参数
						url: API.querycard //请求的url。与后端@Request Mapping注解中的值一致。
					})
					.then(
						successResponse => {
							console.log(successResponse);
							if (successResponse.data.state == 0) {
								console.log(successResponse.data.message);
								this.cardbalance.balance = successResponse.data.data.balance;
							} else {
								console.log(successResponse.data.message);
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
								}).catch(() => {

								});
								// this.sessionStorage.clear(); //清空缓存


							}
						});

			},

		},

	}
</script>

<style>
	.login-container {

		background-clip: padding-box;
		margin: 100px auto;
		width: 1100px;
		padding: 5px 35px 15px 35px;
		background: #fff;


	}

	.login_title {

		text-align: center;
		color: #505458;
	}

	.el-main {
		height: 650px;
	}
</style>
