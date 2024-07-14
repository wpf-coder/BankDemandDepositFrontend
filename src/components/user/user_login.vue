<template>
	<div class="logincontainer">
		<div class="logobox"><img src="../../assets/bank.png" class="hoslogo"></div>
		<div class="loginbox">
			<!-- 登录表单 -->
			<el-form ref="loginFormRef" :model="logindata" :rules="loginrules" class="demo-ruleForm login-page">
				<h2 class="title" style="margin-left: 10px;margin-top: 20px;">网上银行</h2>
				<div v-show="showname">
					<el-form-item prop="user_id" label="身份证号：" style="margin-left: 20%;margin-top: 8%;">
						<el-input v-model="logindata.user_id" placeholder="请输入身份证号" style="width: 200px;"></el-input>
						<el-button @click="showlogin" style="margin-left: 10px;">切换登录方式</el-button>
					</el-form-item>
					<el-form-item prop="user_password" label="密码：" style="margin-left: 25%;margin-top: 2%;">
						<el-input v-model="logindata.user_password" placeholder="请输入密码" style="width: 200px;"
							type="password"></el-input>
					</el-form-item>
				</div>
				<div v-show="showphone">
					<el-form-item prop="user_phone" label="手机号：" style="margin-left: 22%;margin-top: 8%;">
						<el-input v-model="logindata.user_phone" placeholder="请输入手机号" style="width: 200px;"></el-input>
						<el-button @click="showlogin" style="margin-left: 10px;">切换登录方式</el-button>
					</el-form-item>
					<el-form-item prop="user_code" label="验证码：" style="margin-left: 22%;margin-top: 2%;">
						<el-input v-model="logindata.user_code" placeholder="请输入验证码" style="width: 200px;"></el-input>
						<el-button type="primary" style="margin-left: 10px;" @click="onSubmit2">获取验证码</el-button>
					</el-form-item>
				</div>
				<el-form-item style="margin-left: 55%;margin-top: 0%;">
					
				</el-form-item>
				<el-form-item class="btns" style="margin-bottom: 20px;margin-top: 8%;">
					<el-button type="primary" @click="onSubmit" style="margin-left: 150px;">登录</el-button>
					<el-button @click="reset" style="margin-left: 50px;">清空</el-button>
					<el-button @click="touser" style="margin-left: 10px;">我是柜员</el-button>
				</el-form-item>
				<el-dialog title="修改初始密码" :visible.sync="dialogFormVisible">
					<h4>由于您是首次登录到网上银行，故需要重置密码方可进入主页</h4>
					<el-form-item prop="loginpwd" label="登录密码" style="margin-left: 230px;margin-top: 50px;">
						<el-input v-model="logindata.loginpwd" autocomplete="off" style="width: 200px;" type="password">
						</el-input>
					</el-form-item>
					<el-form-item prop="loginpwd" label="确认登录密码" style="margin-left: 200px;">
						<el-input v-model="logindata.loginpwd2" autocomplete="off" style="width: 200px;"
							type="password"></el-input>
					</el-form-item>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="resetpassword()">修改</el-button>
						<el-button @click="dialogFormVisible = false">退出</el-button>
					</div>
				</el-dialog>
			</el-form>

		</div>
	</div>
</template>

<script>
	import API from '../../../API/api.js';

	export default {
		name: 'login',
		data() {
			return {
				showphone: false,
				showname: true,
				dialogFormVisible: false,
				logindata: {
					user_id: '',
					user_password: '',
					user_phone: '',
					user_code: '',
					loginType: '0',
					userType: '0',
					loginpwd: '',
				},
				// 校验
				loginrules: {
					user_id: [{
							required: true,
							message: '请输入身份证号',
							trigger: 'blur'
						},
						{
							min: 18,
							max: 18,
							message: '请正确输入身份证号',
							trigger: 'blur'
						}
					],
					user_password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 21,
							message: '密码长度在6-21个字符',
							trigger: 'blur'
						}
					],
					user_phone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '手机号位数为11位',
							trigger: 'blur'
						}
					],
					user_code: [{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 6,
							message: '请正确输入验证码',
							trigger: 'blur'
						}
					],
				},

			};
		},
		mounted() {
			//this.loginout();
		},
		methods: {
			loginout() {
				console.log('loginout!');
				this.$axios.post(API.userloginout)
					.then(
						successResponse => {
							console.log(successResponse);
						});
			},
			reset() {
				// 重置用户名和密码
				this.$refs.loginFormRef.resetFields();

			},
			onSubmit2() {
				this.$refs.loginFormRef.validate(async valid => {
					if (!valid) {
						return null;
						this.$confirm('请输入手机号', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
					} else {
						var tel = {
							phone: this.logindata.user_phone
						}
						this.$axios({
								headers: {
									'Content-Type': 'application/json'
								},
								method: 'post',
								data: JSON.stringify(tel), //上传的参数
								url: API.verificationApi, //请求的url。与后端@Request Mapping注解中的值一致。
							})

							.then(
								successResponse => {
									console.log(successResponse);
									console.log(successResponse.data.state);
									if (successResponse.data.state == 0) {
										console.log(successResponse.data.message);
									} else {
										console.log(successResponse.data);
										console.log(successResponse.data.message);
										this.$confirm(successResponse.data.message, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消'
										})
									}
								}
							)

					}
				})


			},

			onSubmit() {
			console.log('submit!');
						var user = {
							id: this.logindata.user_id,
							password: this.logindata.user_password,
							phone: this.logindata.user_phone,
							verificationCode: this.logindata.user_code,
							loginType: this.logindata.loginType,
						}
						this.$axios({
								headers: {
									'Content-Type': 'application/json'
								},
								method: 'post',
								data: JSON.stringify(user), //上传的参数
								url: API.userloginApi, //请求的url。与后端@Request Mapping注解中的值一致。
							})
							.then(
								successResponse => {
									console.log(successResponse);
									console.log(successResponse.data.state);
									if (successResponse.data.state == 0) {
										console.log(successResponse.data.message);
										if (successResponse.data.data == "reset") {
											this.dialogFormVisible = true;
										} else {
											this.$message({
											          message: '登录成功',
											          type: 'success'
											        });
											this.$router.push({
												path: `/user`,
											});
										}
									} else {
										console.log(successResponse.data);
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
									if (error.response.status === 500) {
										console.log("报错了");
										this.$confirm('网络连接异常', '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消'
										})
										// this.sessionStorage.clear(); //清空缓存


									}
								});

			},
			resetloginout() {
				this.dialogFormVisible = false;
				console.log('loginout!');
				this.$axios.post(API.userloginout)
					.then(
						successResponse => {
							console.log(successResponse);
							if (successResponse.data.state == 0) {
								console.log(successResponse.data.message);
								this.$confirm(successResponse.data.message, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消'
								}).then(() => {
									this.$router.push({
										path: '/'
									});
								}).catch(() => {});
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
								}).catch(() => {});
							}
						});

			},
			resetpassword() {
				if (this.logindata.loginpwd != this.logindata.loginpwd2) {
					this.$message('两次输入的密码不一致');
				} else {
					console.log("修改！" + this.logindata.loginpwd);
					var data = {
						resetpwd: this.logindata.loginpwd
					}
					this.$axios({
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'post',
						data: JSON.stringify(data), //上传的参数
						url: API.resetloginpwd, //请求的url。与后端@Request Mapping注解中的值一致。
					}).then(
						successResponse => {
							console.log(successResponse);
							if (successResponse.data.state == 0) {
								console.log(successResponse.data.message);
								this.$message('重置密码成功');
								this.$router.push({
									path: '/user'
								});
							} else {
								console.log(successResponse.data.message);
								this.$message(successResponse.data.message);
							}
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
							}
						});
				}

			},
			touser() {
				this.$router.push('/');
			},
			showlogin() {
				this.showphone = !this.showphone;
				this.showname = !this.showname;
				if (this.showname == true) {
					this.logindata.loginType = 0;
				}
				if (this.showphone == true) {
					this.logindata.loginType = 1;
				}
			}
		}
	};
</script>

<style>
	/* 登录界面样式 */
	.logincontainer {

		position: absolute;
		background-color: #f7f7f7;
		width: 100%;
		height: 100%
	}

	.hoslogo {
		position: absolute;
		width: 600px;
		height: 400px;
		left: 10%;
		top: 20%
	}

	.loginbox {
		width: 600px;
		height: 400px;
		background-color: #ffffff;
		border-radius: 5px;
		position: absolute;
		left: 50%;
		top: 20%;
	}

	.loginform {
		position: absolute;
		bottom: 0%;
		width: 100%;
		padding-inline: 50px;
		box-sizing: border-box;
	}

	.btns {
		display: flex;
		justify-content: center;
	}
</style>
