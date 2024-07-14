<template>
	<el-card style="width: =500px" class="box-card">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="存款" name="first">
				<el-form :inline="true" ref="form1" :model="form1" :rules="moneyrules1" label-width="120px"
					style="margin-left: 200px;margin-right: 100px;margin-top: 20px;" :label-position="labelPosition">
					<el-form-item label="银行卡号" prop="id">
						<el-input v-model="form1.id" style="width: 350px;" @keyup.enter.native="inputBlur1"></el-input>
					</el-form-item>
					<el-form-item label="存款金额" prop="money">
						<el-input v-model="form1.money" style="width: 350px;"
							onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''">
						</el-input>
					</el-form-item>
					<el-form-item >
						<el-button type="primary" @click="onSubmit1" style="margin-left: 200px;margin-right: 100px;margin-top: 20px;" >存款</el-button>
						<el-button @click="resetForm1()">取消</el-button>
					</el-form-item>
				</el-form>
				
			</el-tab-pane>
			<el-tab-pane label="取款" name="second">
				<el-form :inline="true" ref="form2" :model="form2" :rules="moneyrules2" label-width="120px"
					style="margin-left: 200px;margin-right: 100px;margin-top: 20px;" :label-position="labelPosition">
					<el-form-item label="银行卡号" prop="id">
						<el-input v-model="form2.id" style="width: 350px;" @keyup.enter.native="inputBlur2"></el-input>
					</el-form-item>
					<el-form-item label="取款金额" prop="money">
						<el-input v-model="form2.money" style="width: 350px;"
							onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''">
						</el-input>
					</el-form-item>
					<el-form-item label="取款密码" prop="password">
						<el-input v-model="form2.password" style="width: 350px;" type="password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit2" style="margin-left: 200px;margin-right: 100px;margin-top: 20px;">取款</el-button>
						<el-button @click="resetForm2()">取消</el-button>
					</el-form-item>
				</el-form>
				
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
	import API from '../../../API/api.js';
	export default {
		data() {
			return {
				labelPosition: 'left',
				activeName: 'first',
				form1: {
					id: '',
					money: ''
				},
				form2: {
					id: '',
					money: '',
					password: ''
				},
				moneyrules1: {
					id: [{
							required: true,
							message: '请输入银行卡号',
							trigger: 'blur'
						},
						{
							min: 19,
							max: 19,
							message: '请正确输入银行卡号',
							trigger: 'blur'
						}
					],
					money: [{
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
					]
				},
				moneyrules2: {
					id: [{
							required: true,
							message: '请输入银行卡号',
							trigger: 'blur'
						},
						{
							min: 19,
							max: 19,
							message: '请正确输入银行卡号',
							trigger: 'blur'
						}
					],
					money: [{
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
					password: [{
							required: true,
							message: '请输入取款密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 6,
							message: '请正确输入取款密码',
							trigger: 'blur'
						}
					]
				}

			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			inputBlur1() { //存款时核验银行卡状态
				console.log("enter时触发1");
				var id = {
					bankCard: this.form1.id, //银行卡账号
					searchType: '2'
				}
				this.$axios({
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'post',
						data: JSON.stringify(id), //上传的参数
						url: API.querycard, //请求的url。与后端@Request Mapping注解中的值一致。
					})
					.then(
						successResponse => {
							console.log(successResponse);
							if (successResponse.data.state == 0) { //查到信息
								console.log(successResponse.data.message);
								if (successResponse.data.data.state != 1) { //状态异常
									this.$confirm('银行卡状态异常！', '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消'
									})
								}
							} else if (successResponse.data.state == 1) {
								console.log(successResponse.data.message); //没查到信息
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
			inputBlur2() { //取款时核验银行卡状态
				console.log("enter时触发2");
				var id = {
					bankCard: this.form2.id, //银行卡账号
					searchType: '2'
				}
				this.$axios({
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'post',
						data: JSON.stringify(id), //上传的参数
						url: API.querycard, //请求的url。与后端@Request Mapping注解中的值一致。
					})
					.then(
						successResponse => {
							console.log(successResponse);
							if (successResponse.data.state == 0) { //查到信息
								console.log(successResponse.data.message);
								if (successResponse.data.data.state != 1) { //状态异常
									this.$confirm('银行卡状态异常！', '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消'
									})
								}
							} else if (successResponse.data.state == 1) {
								console.log(successResponse.data.message); //没查到信息
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
			onSubmit1() {
				this.$refs.form1.validate(async valid => {
					if (!valid) {
						this.$confirm("请输入银行卡号或存款金额", '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
						return null;
						
					} else {
						console.log('submit1!');
						var inmoney = { //存款发送的json
							cardId: this.form1.id,
							amount: this.form1.money
						}
						this.$axios({
								headers: {
									'Content-Type': 'application/json'
								},
								method: 'post',
								data: JSON.stringify(inmoney), //上传的参数
								url: API.deposit, //请求的url。与后端@Request Mapping注解中的值一致。
							})
							.then(
								successResponse => {
									console.log(successResponse);
									if (successResponse.data.state == 0) {
										console.log(successResponse.data.message);
										this.$refs.form1.resetFields(); //存款成功
										this.$confirm("存款成功", '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消'
										})
									} else {
										console.log(successResponse.data.message);
										this.$refs.form1.resetFields(); //存款失败
										this.$confirm(successResponse.data.message, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消'
										})
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
										// this.sessionStorage.clear(); //清空缓存


									}
								});
					}
				})

			},
			onSubmit2() {
				this.$refs.form2.validate(async valid => {
					if (!valid) {
						this.$confirm("请输入相关信息！", '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
						return null;
						
					} else {
						console.log('submit2!');
						var outmoney = { //取款发送的json
							cardId: this.form2.id,
							amount: this.form2.money,
							password: this.form2.password
						}
						this.$axios({
								headers: {
									'Content-Type': 'application/json'
								},
								method: 'post',
								data: JSON.stringify(outmoney), //上传的参数
								url: API.draw, //请求的url。与后端@Request Mapping注解中的值一致。
							})
							.then(
								successResponse => {
									console.log(successResponse);
									if (successResponse.data.state == 0) {
										console.log(successResponse.data.message);
										this.$refs.form2.resetFields(); //取款成功
										this.$confirm("取款成功", '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消'
										})
									} else {
										console.log(successResponse.data.message);
										this.$refs.form2.resetFields(); //state==1账户余额不足，请重新输入
										this.$confirm(successResponse.data.message, '提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消'
										})
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
										// this.sessionStorage.clear(); //清空缓存


									}
								});
					}
				})

			},
			resetForm1() {
				this.$refs.form1.resetFields(); //清空存款信息
				console.log('111!');
			},
			resetForm2() {
				this.$refs.form2.resetFields(); //清空取款信息
				console.log('222!');
			},

		}

	};
</script>

<style></style>
