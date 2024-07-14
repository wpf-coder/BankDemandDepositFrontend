<template>
	<el-card style="width: =500px" class="box-card">
		<div slot="header" class="clearfix">
			<span>转账</span>
		</div>
		<div>
			<!-- <el-steps :active="active" finish-status="success">
				<el-step title="收款人信息填写"></el-step>
				<el-step title="支付信息填写"></el-step>
			</el-steps> -->

			<el-form :inline="true" ref="transfer" :model="transfer" :rules="moneyrules" label-width="140px" style="margin-left: 300px;margin-right: 100px;margin-top: 20px;">
				<el-form-item label="当前余额" :label-width="formLabelWidth" prop="balancenow">
					<el-input v-model="balancenow" autocomplete="off" style="width: 350px;" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="付款人银行卡号" :label-width="formLabelWidth" prop="payerCardId">
					<el-input v-model="transfer.payerCardId" autocomplete="off" style="width: 350px;" :disabled="true">
					</el-input>
				</el-form-item>
				<el-form-item label="收款人姓名" :label-width="formLabelWidth" prop="payeeName">
					<el-input v-model="transfer.payeeName" autocomplete="off" style="width: 350px;"></el-input>
				</el-form-item>
				<el-form-item label="收款人银行卡号" :label-width="formLabelWidth" prop="payeeCardId">
					<el-input v-model="transfer.payeeCardId" autocomplete="off" style="width: 350px;"></el-input>
				</el-form-item>
				<el-form-item label="支付密码" :label-width="formLabelWidth" prop="payerCardPassword">
					<el-input v-model="transfer.payerCardPassword" autocomplete="off" style="width: 350px;" type="password"></el-input>
				</el-form-item>
				<el-form-item label="转账金额(元)" :label-width="formLabelWidth" prop="amount">
					<el-input v-model="transfer.amount" autocomplete="off" style="width: 350px;" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''">
					</el-input>
				</el-form-item>
				<div></div>
				<el-form-item>
					<el-button type="primary" style="margin-top: 12px;margin-left: 140px;" @click="payerNext">转账
					</el-button>
					<el-button  style="margin-top: 12px;margin-left: 210px;" @click="searchflow">明细
					</el-button>
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
				active: 0,
				isCollapse: true,
				activeIndex: '1',
				activeIndex2: '1',
				balancenow: '',
				payeemes: true, //收
				payermes: false, //付
				paymoney: false, //金额

				transfer: {
					payerCardId: '',
					payeeName: '',
					payeeCardId: '',
					amount: '',
					payerCardPassword: '',
				},
				formLabelWidth: '140px',
				moneyrules: {
					payeeName: [{
						required: true,
						message: '请输入收款人姓名',
						trigger: 'blur'
					}],
					payeeCardId: [{
							required: true,
							message: '请输入收款人银行卡号',
							trigger: 'blur'
						},
						{
							min: 19,
							max: 19,
							message: '请正确输入收款人银行卡号',
							trigger: 'blur'
						}
					],
					payerCardPassword: [{
							required: true,
							message: '请输入支付密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 6,
							message: '请正确输入支付密码',
							trigger: 'blur'
						}
					],
					amount: [{
							required: true,
							message: '请输入金额',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 15,
							message: '请正确输入金额',
							trigger: 'blur'
						}
					],
				}
			};
		},
		mounted: function() {
			this.searchcard();
			// submitForm();
		},
		methods: {
			payeeNext() {
				if (this.active++ > 2) this.active = 0;
				this.payeemes = false; //收
				this.payermes = true; //付
			},
			payerNext() {
				this.submitForm();
			},
			payerLast() {
				if (this.active-- < 0) this.active = 0;
				this.payeemes = true; //收
				this.payermes = false; //付
			},

			searchflow() {
				this.$router.push({
					path: '/dealflow'
				});

			},
			searchcard() {
				console.log('我的账户');
				this.$axios.post(API.querycard)
					.then(
						successResponse => {
							console.log(successResponse);
							if (successResponse.data.state == 0) {
								console.log(successResponse.data.message);
								this.balancenow = successResponse.data.data.balance;
								this.transfer.payerCardId = successResponse.data.data.id;
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
										path: '/'
									});
								}).catch(() => {

								});
							}
						});
			},
			submitForm() {
				this.$refs.transfer.validate(async valid => {
					if (!valid) {
						return null;
						this.$confirm('请输入转账所需相关信息！', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
					} else {
						console.log('transfer!');
						this.$axios.post(API.transfer, {
								payerCardId: this.transfer.payerCardId,
								payerCardPassword: this.transfer.payerCardPassword,
								payeeName: this.transfer.payeeName,
								payeeCardId: this.transfer.payeeCardId,
								amount: this.transfer.amount,
							})
							.then(
								successResponse => {
									console.log(successResponse);
									if (successResponse.data.state == 0) {
										console.log(successResponse.data.message);
										//this.active = 3;
										this.$refs.transfer.resetFields();
										this.balancenow = '';
										this.$confirm(successResponse.data.message, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消'
										})
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
					}
				})


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
