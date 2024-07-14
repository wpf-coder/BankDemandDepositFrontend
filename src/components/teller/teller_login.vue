<template>
	<div class="logincontainer">
		<div class="logobox"><img src="../../assets/bank.png" class="hoslogo"></div>
		<div class="loginbox">
			<!-- 登录表单 -->
			<el-form ref="loginFormRef" :model="logindata" :rules="loginrules" class="demo-ruleForm login-page">
				<h2 class="title" style="margin-left: 10px;margin-top: 20px;">银行活期存款系统</h2>
				<el-form-item prop="teller_id" label="柜员编号：" style="margin-left: 20%;margin-top: 8%;">
					<el-input v-model="logindata.teller_id" placeholder="柜员编号" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item prop="teller_password" label="密码：" style="margin-left: 24%;margin-top: 2%;">
					<el-input v-model="logindata.teller_password" placeholder="请输入密码" style="width: 200px;"
						type="password"></el-input>
				</el-form-item>
				<el-form-item class="btns" style="margin-top: 12%;">
					<el-button type="primary" @click="onSubmit" style="margin-left: 150px;">登录</el-button>
					<el-button @click="reset" style="margin-left: 50px;">清空</el-button>
					<el-button @click="touser">我是客户</el-button>
				</el-form-item>
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
				logindata: {
					teller_id: '',
					teller_password: '',
					usertype: '1'
				},
				// 校验
				loginrules: {
					teller_id: [{
							required: true,
							message: '柜员编号为必填项',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '柜员编号长度在3到20个字符',
							trigger: 'blur'
						}
					],
					teller_password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 21,
							message: '密码长度在3-21个字符',
							trigger: 'blur'
						}
					]
				}
			};
		},
		methods: {
			reset() {
				// 重置柜员编号和密码
				this.$refs.loginFormRef.resetFields();
			},
			onSubmit() {
				this.$refs.loginFormRef.validate(async valid => {
					if (!valid) {
						return null;
						this.$confirm("请输入柜员编号或密码", '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
					} else {
						console.log('submit!');
						var teller = {
							id: this.logindata.teller_id,
							password: this.logindata.teller_password
						}
						this.$axios({
								headers: {
									'Content-Type': 'application/json'
								},
								method: 'post',
								data: JSON.stringify(teller), //上传的参数
								url: API.tellerlogin, //请求的url。与后端@Request Mapping注解中的值一致。
							})
							.then(
								successResponse => {
									console.log(successResponse);
									if (successResponse.data.state == 0) {
										console.log(successResponse.data.message);
										this.$router.push({
											path: `/teller`,
										});
									} else {
										console.log(successResponse.data.message);
										this.$refs.loginFormRef.resetFields();
										this.$confirm("柜员编号或密码错误", '提示', {
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
					}
				})

			},
			touser() {
				this.$router.push('/userlogin');
			}
		}
	};
</script>

<style>
	/* 登录界面样式 */
	.logincontainer {

		position: absolute;
		background-color: #f7f4ed;
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
		width: 800px;
		height: 400px;
		background-color: #ffffff;
		border-radius: 5px;
		position: absolute;
		left: 50%;
		top: 20%;
	}

	.loginform {
		position: absolute;
		margin-top: 10px;
		width: 100%;
		padding-inline: 50px;
		box-sizing: border-box;
	}

	.btns {
		display: flex;
		justify-content: center;
	}
</style>
