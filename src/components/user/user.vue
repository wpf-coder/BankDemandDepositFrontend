<template>
	<div style="height: 100%;width: 100%;">
		<el-container>
			<el-header>
				<el-image style="width: 120px; height: 45px;margin-left: 10%;"  :src="require('@/assets/ebank.png')"></el-image>
				<!-- <el-image style="width: 25px; height: 25px;margin-left: 70%;" 
				@click="loginout()" :src="require('@/assets/loginout.png')"></el-image> -->
				<el-button type="danger" round style="float: right;margin-top: 10px;margin-right: 40px;" 
				@click="loginout">退出登录</el-button>
			</el-header>
			<el-menu :default-active="activeIndex2" router class="el-menu-demo" mode="horizontal" @select="handleSelect"
			 background-color="#030a1d" text-color="#fff" active-text-color="#ffffff">
				<!-- <el-menu-item index="/user" style="margin-left: 10%;">
						我的账户
				</el-menu-item>
				<el-menu-item index="2" >
					<router-link to="/transfer" style="color: #ffffff; text-decoration: none;">
						我要转账
					</router-link>
				</el-menu-item>
				<el-menu-item index="3">
					<router-link to="/dealflow" style="color: #ffffff; text-decoration: none;">
						流水查询
					</router-link>
				</el-menu-item>
				<el-menu-item index="4" style="float: right;margin-right: 50px;">
					<span >欢迎您！{{nowuser}}</span>
				</el-menu-item> -->
				<el-menu-item index="/user" style="margin-left: 10%;">
						我的账户
				</el-menu-item>
				<el-menu-item index="/transfer" >
						我要转账
				</el-menu-item>
				<el-menu-item index="/dealflow">
						流水查询
				</el-menu-item>
				<el-menu-item style="float: right;margin-right: 50px;">
					<span >欢迎您！{{nowuser}}</span>
				</el-menu-item>
			</el-menu>

			<el-main>
				<router-view></router-view>
			</el-main>

		</el-container>

	</div>

</template>

<script>
	import API from '../../../API/api.js';
	export default {
		data() {
			return {
				isCollapse: true,
				activeIndex: '1',
				activeIndex2: '1',
				dialogFormVisible: false,
				formLabelWidth: '120px',
				nowuser:'xxx',
			};
		},
		mounted() {
			this.queryuser();
		},
		methods: {
			toggleCollapse() {
				this.isCollapse = !this.isCollapse
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			queryuser() {
				console.log('queryuser');
				this.$axios.post(API.queryuserinfo)
					.then(
						successResponse => {
							console.log(successResponse);
							if (successResponse.data.state == 0) {
								console.log(successResponse.data.message);
								console.log(successResponse);
								this.nowuser=successResponse.data.data.user.name;
								} else {
								console.log(successResponse.data.message);
							}
						})
					.catch(
						error => {
							console.log(error);
							
							if (error.response.status === 302) {
								console.log("报错了");
								// this.$router.push({
								// 	path: '/'
								// });
								// this.$confirm('登录状态异常，请重新登录', '提示', {
								// 	confirmButtonText: '确定',
								// 	cancelButtonText: '取消'
								// }).then(() => {
								// 	this.$router.push({
								// 		path: '/'
								// 	});
								// }).catch(() => {
								// });
							}
						});
			},
			loginout() {
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
								}).catch(() => {
								});
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
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},

	}
</script>

<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.el-menu--horizontal>.el-menu-item {
		height: 50px;
		line-height: 50px;
	}

	.el-menu-item * {
		vertical-align: baseline;
	}
</style>
