<template>
	<el-card style="width: =500px" class="box-card">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="开通账户" name="first">
				<!-- <el-form  :inline="true" ref="form" :model="form" label-width="100px" size="mini" :label-position="labelPosition"> -->
				<el-form :inline="true" ref="form" :model="form" label-width="120px" style="margin-left: 200px;margin-right: 100px;margin-top: 20px;"
				 :rules="rules">
					<el-form-item label="身份证号" prop="id">
						<el-input v-model="form.id" style="width: 350px;"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input v-model="form.name" style="width: 350px;"></el-input>
					</el-form-item>
					<el-form-item label="电话号码" prop="phone">
						<el-input v-model="form.phone" style="width: 350px;" @keyup.enter.native="inputBlur"></el-input>
					</el-form-item>
					<el-form-item label="住址" prop="address">
						<el-input v-model="form.address" style="width: 350px;"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="form.email" style="width: 350px;"></el-input>
					</el-form-item>
					<el-form-item label="取款密码" prop="cardPwd">
						<el-input v-model="form.cardPwd" style="width: 350px;" type="password"></el-input>
					</el-form-item>
					<el-form-item label="确认取款密码" prop="cardPwd1">
						<el-input v-model="form.cardPwd1" style="width: 350px;" type="password"></el-input>
					</el-form-item>
					<el-form-item label="业务开通">
						<el-checkbox label="开通网上银行" name="ebankState" v-model="form.ebankState" @change="handleChange">
						</el-checkbox>
						<el-checkbox label="开通手机银行" name="mobileBankState" v-model="form.mobileBankState"></el-checkbox>
						<el-checkbox label="开通外汇服务" name="foreignExchangeState" v-model="form.foreignExchangeState">
						</el-checkbox>
					</el-form-item><br />
					<el-form-item>
						<el-button type="primary" style="margin-left: 300px;margin-right: 100px;margin-top: 20px;" @click="onSubmit">开通账户</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="修改密码" name="second">
				<el-collapse v-model="activeName2" :accordion="true">
					<el-collapse-item title="修改取款密码" name="1">
						<div>
							<el-steps :active="active1" finish-status="success">
								<el-step title="银行卡信息验证"></el-step>
								<el-step title="设置新取款密码"></el-step>
							</el-steps>
							<el-form v-show="payPwdShow1" :inline="true" ref="payPwdform1" :model="payPwdform1" label-width="120px" style="margin-left: 200px;margin-right: 100px;margin-top: 20px;"
							 :label-position="labelPosition" :rules="rules101">
								<el-form-item label="银行卡号" prop="cardId">
									<el-input v-model="payPwdform1.cardId" style="width: 350px;"></el-input>
								</el-form-item>
								<el-form-item label="身份证号" prop="Id">
									<el-input v-model="payPwdform1.Id" style="width: 350px;"></el-input>
								</el-form-item>
								<br>
								<el-form-item>
									<el-button type="primary" @click="onSubmit101">下一步</el-button>
								</el-form-item>
							</el-form>

							<el-form v-show="payPwdShow2" :inline="true" ref="payPwdform2" :model="payPwdform2" label-width="120px" style="margin-left: 200px;margin-right: 100px;margin-top: 20px;"
							 :label-position="labelPosition" :rules="rules102">
								<el-form-item label="手机号" prop="phone">
									<el-input v-model="payPwdform2.phone" style="width: 350px;" :disabled="true">
									</el-input>
								</el-form-item>
								<el-form-item label="验证码" prop="code">
									<el-input v-model="payPwdform2.code" style="width: 350px;"></el-input>
									<el-button type="primary" @click="onSubmit102">发送验证码</el-button>
								</el-form-item>
								<el-form-item label="新的取款密码" prop="newpayPwd">
									<el-input v-model="payPwdform2.newpayPwd" style="width: 350px;" type="password">
									</el-input>
								</el-form-item>
								<el-form-item label="确认取款密码" prop="checknewpayPwd">
									<el-input v-model="payPwdform2.checknewpayPwd" style="width: 350px;" type="password"></el-input>
								</el-form-item>
								<br>
								<el-form-item>
									<el-button @click="onSubmit104">上一步</el-button>
									<el-button type="primary" @click="onSubmit103">完成</el-button>
								</el-form-item>
							</el-form>
						</div>
					</el-collapse-item>
					<el-collapse-item title="修改登录密码" name="2">
						<div>
							<el-steps :active="active2" finish-status="success">
								<el-step title="银行卡信息验证"></el-step>
								<el-step title="设置新登录密码"></el-step>
							</el-steps>
							<el-form v-show="loginPwdShow1" :inline="true" ref="loginPwdform1" :model="loginPwdform1" label-width="120px"
							 style="margin-left: 200px;margin-right: 100px;margin-top: 20px;" :label-position="labelPosition" :rules="rules201">
								<el-form-item label="银行卡号" prop="cardId">
									<el-input v-model="loginPwdform1.cardId" style="width: 350px;"></el-input>
								</el-form-item>
								<el-form-item label="身份证号" prop="Id">
									<el-input v-model="loginPwdform1.Id" style="width: 350px;"></el-input>
								</el-form-item>
								<br>
								<el-form-item>
									<el-button type="primary" @click="onSubmit201">下一步</el-button>
								</el-form-item>
							</el-form>

							<el-form v-show="loginPwdShow2" :inline="true" ref="loginPwdform2" :model="loginPwdform2" label-width="120px"
							 style="margin-left: 200px;margin-right: 100px;margin-top: 20px;" :label-position="labelPosition" :rules="rules202">
								<el-form-item label="手机号" prop="phone">
									<el-input v-model="loginPwdform2.phone" style="width: 350px;" :disabled="true">
									</el-input>
								</el-form-item>
								<el-form-item label="验证码" prop="code">
									<el-input v-model="loginPwdform2.code" style="width: 350px;"></el-input>
									<el-button type="primary" @click="onSubmit202">发送验证码</el-button>
								</el-form-item>
								<el-form-item label="新的登录密码" prop="newloginPwd">
									<el-input v-model="loginPwdform2.newloginPwd" style="width: 350px;" type="password">
									</el-input>
								</el-form-item>
								<el-form-item label="确认登录密码" prop="checknewloginPwd">
									<el-input v-model="loginPwdform2.checknewloginPwd" style="width: 350px;" type="password"></el-input>
								</el-form-item>
								<br>
								<el-form-item>
									<el-button @click="onSubmit204">上一步</el-button>
									<el-button type="primary" @click="onSubmit203">完成</el-button>
								</el-form-item>
							</el-form>
						</div>
					</el-collapse-item>
				</el-collapse>
			</el-tab-pane>
			<el-tab-pane label="业务开通" name="third">
				<el-form :inline="true" ref="formebank" :model="formebank" label-width="120px" style="margin-left: 200px;margin-right: 100px;margin-top: 20px;"
				 :rules="rules301">
					<el-form-item label="身份证号" prop="userid">
						<el-input v-model="formebank.userid" style="width: 350px;"></el-input>
					</el-form-item>
					<el-form-item label="银行卡号" prop="bankcard">
						<el-input v-model="formebank.bankcard" style="width: 350px;"></el-input>
						<el-button type="primary" @click="searchcard" style="margin-left: 10px;">查询对应银行卡</el-button>
					</el-form-item>
					<el-form-item label="业务开通">
						<el-checkbox label="开通网上银行" name="eState" v-model="formebank.eState" @change="handleChange">
						</el-checkbox>
						<el-checkbox label="开通手机银行" name="mobileState" v-model="formebank.mobileState"></el-checkbox>
						<el-checkbox label="开通外汇服务" name="foreignState" v-model="formebank.foreignState">
						</el-checkbox>
					</el-form-item>
				</el-form>
				<el-form :inline="true" ref="formebank" :model="formebank" label-width="100px" style="margin-left: 300px;margin-right: 100px;margin-top: 20px;">
					<el-form-item>
						<el-button type="primary" @click="newservice">更新业务</el-button>
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
			var validatePass1 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.form.cardPwd1 !== '') {
						this.$refs.form.validateField('cardPwd1');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.cardPwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var validatePass3 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.payPwdform2.checknewpayPwd !== '') {
						this.$refs.payPwdform2.validateField('checknewpayPwd');
					}
					callback();
				}
			};
			var validatePass4 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.payPwdform2.newpayPwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var validatePass5 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.loginPwdform2.checknewloginPwd !== '') {
						this.$refs.payPwdform2.validateField('checknewloginPwd');
					}
					callback();
				}
			};
			var validatePass6 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.loginPwdform2.newloginPwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				labelPosition: 'left',
				activeName: 'first',
				disabledInput: true,
				activeName2: '1',
				active1: 0,
				active2: 0,
				payPwdShow1: true,
				payPwdShow2: false,
				loginPwdShow1: true,
				loginPwdShow2: false,
				form: {
					id: '',
					name: '',
					phone: '',
					address: '',
					email: '',
					cardPwd: '',
					cardPwd1: '',
					ebankState: '',
					mobileBankState: '',
					foreignExchangeState: ''
				},
				formebank: {
					userid: '',
					bankcard: '',
					eState: '',
					mobileState: '',
					foreignState: '',
				},
				payPwdform1: {
					cardId: '',
					Id: ''
				},
				payPwdform2: {
					phone: '',
					code: '',
					newpayPwd: '',
					checknewpayPwd: ''
				},
				loginPwdform1: {
					cardId: '',
					Id: ''
				},
				loginPwdform2: {
					phone: '',
					code: '',
					newloginPwd: '',
					checknewloginPwd: ''
				},
				rules: {
					id: [{
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
					phone: [{
							required: true,
							message: '请输入电话号码',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '请正确输入电话号码',
							trigger: 'blur'
						}
					],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请输入住址',
						trigger: 'blur'
					}, ],
					cardPwd: [{
							required: true,
							validator: validatePass1,
							trigger: 'blur'
						},
						{
							min: 6,
							max: 6,
							message: '请输入6位数取款密码',
							trigger: 'blur'
						}
					],
					cardPwd1: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				rules101: {
					cardId: [{
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
					Id: [{
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
					]
				},
				rules102: {
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '请正确输入手机号',
							trigger: 'blur'
						}
					],
					code: [{
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
					newpayPwd: [{
							required: true,
							validator: validatePass3,
							trigger: 'blur'
						},
						{
							min: 6,
							max: 6,
							message: '请输入6位数取款密码',
							trigger: 'blur'
						}
					],
					checknewpayPwd: [{
						required: true,
						validator: validatePass4,
						trigger: 'blur'
					}]
				},
				rules201: {
					cardId: [{
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
					Id: [{
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
					]
				},
				rules202: {
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '请正确输入手机号',
							trigger: 'blur'
						}
					],
					code: [{
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
					newloginPwd: [{
							required: true,
							validator: validatePass5,
							trigger: 'blur'
						},
						{
							min: 8,
							max: 21,
							message: '请输入8~21位数登录密码',
							trigger: 'blur'
						}
					],
					checknewloginPwd: [{
						required: true,
						validator: validatePass6,
						trigger: 'blur'
					}]
				},
				rules301: {
					userid: [{
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
					bankcard: [{
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
					]
				}
			};

		},
		methods: {
			searchcard() { //核验银行卡业务开通状态
					if (this.formebank.bankcard==''&&this.formebank.userid=='') {
						this.$confirm('请输入银行卡号或身份证号', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
					} else {
						console.log("查询业务");
						var id = {
							cardId: this.formebank.bankcard,
							Id: this.formebank.userid,
						}
						this.$axios({
								headers: {
									'Content-Type': 'application/json'
								},
								method: 'post',
								data: JSON.stringify(id), //上传的参数
								url: API.clientcheck, //请求的url。与后端@Request Mapping注解中的值一致。
							})
							.then(
								successResponse => {
									console.log(successResponse);
									if (successResponse.data.state == 0) { //查到信息
										console.log(successResponse.data.message);
										console.log(successResponse.data.data);
										if (successResponse.data.state != 0) { //状态异常
											this.$confirm('银行卡状态异常！', '提示', {
												confirmButtonText: '确定',
												cancelButtonText: '取消'
											})
										} else {
											this.formebank.eState = (successResponse.data.data.ebankState == 2) ? true :
												false;
											this.formebank.mobileState = (successResponse.data.data.mobileBankState == 2) ?
												true : false;
											this.formebank.foreignState = (successResponse.data.data.foreignExchangeState == 2) ? true : false;
										}
									} else if (successResponse.data.state == 1) {
										console.log(successResponse.data.message);
										this.$refs.formebank.resetFields(); //没查到信息
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
									}
								});
					}

			},
			newservice() {
				var newbankservice = {
					Id: this.formebank.userid,
					cardId: this.formebank.bankcard,
					ebank_state: (this.formebank.eState == true) ? 2 : 1,
					mobile_bank_state: (this.formebank.mobileState == true) ? 2 : 1,
					foreign_exchange_state: (this.formebank.foreignState == true) ? 2 : 1,
				}
				console.log(newbankservice);
				this.$axios({
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'post',
						data: JSON.stringify(newbankservice), //上传的参数
						url: API.serviceopen, //请求的url。与后端@Request Mapping注解中的值一致。
					})
					.then(
						successResponse => {
							console.log(successResponse);
							if (successResponse.data.state == 0) {
								console.log(successResponse.data.message);
								if (successResponse.data.data.ebankPwd != null) {
									this.$confirm("银行卡号" + this.formebank.bankcard + "对应的网上银行初始登录密码为" + successResponse
										.data.data.ebankPwd,
										'提示', {
											confirmButtonText: '确定',
											cancelButtonText: '取消'
										})
								} else {
									this.$confirm(successResponse.data.message, '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消'
									})
								}
								this.$refs.formebank.resetFields();
							} else {
								console.log(successResponse.data.message);
								this.$refs.formebank.resetFields();
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
							}
						});

			},
			onSubmit101() {
				this.$refs.payPwdform1.validate(async valid => {
					if (!valid) {
						this.$confirm('请输入银行卡号或身份证号', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
						return null;
						
					} else {
						console.log("submit101");
						console.log(this.payPwdform1.cardId);
						console.log(this.payPwdform1.Id);
						if (this.payPwdform1.cardId == "" || this.payPwdform1.Id == "") {
							this.$confirm('请输入银行卡号或身份证号', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消'
							})
						} else {
							var id = {
								cardId: this.payPwdform1.cardId,
								Id: this.payPwdform1.Id
							}
							this.$axios({
									headers: {
										'Content-Type': 'application/json'
									},
									method: 'post',
									data: JSON.stringify(id), //上传的参数
									url: API.clientcheck, //请求的url。与后端@Request Mapping注解中的值一致。
								})
								.then(
									successResponse => {
										console.log(successResponse);
										if (successResponse.data.state == 0) { //身份核验通过
											console.log(successResponse.data.message);
											this.active1++;
											this.payPwdShow1 = false;
											this.payPwdShow2 = true;
											this.payPwdform2.phone = successResponse.data.data.phone;
										} else {
											console.log(successResponse.data.message); //核验失败
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
										}
									});
						}
					}
				})

			},
			onSubmit102() {
				console.log("发送验证码");
				var phone = {
					phone: this.payPwdform2.phone
				}
				this.$axios({
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'post',
					data: JSON.stringify(phone), //上传的参数
					url: API.codecheck, //请求的url。与后端@Request Mapping注解中的值一致。
				}).then(
					successResponse => {
						console.log(successResponse);
						if (successResponse.data.state == 0) {
							console.log(successResponse.data.message);
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
			},
			onSubmit103() {
				this.$refs.payPwdform2.validate(async valid => {
					if (!valid) {
						this.$confirm('请输入相关信息!', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
						return null;
						
					} else {
						console.log("提交！");
						var data = {
							cardId: this.payPwdform1.cardId,
							Id: this.payPwdform1.Id,
							phone: this.payPwdform2.phone,
							code: this.payPwdform2.code,
							newpayPwd: this.payPwdform2.newpayPwd
						}
						this.$axios({
							headers: {
								'Content-Type': 'application/json'
							},
							method: 'post',
							data: JSON.stringify(data), //上传的参数
							url: API.newpaypwd, //请求的url。与后端@Request Mapping注解中的值一致。
						}).then(
							successResponse => {
								console.log(successResponse);
								if (successResponse.data.state == 0) {
									console.log(successResponse.data.message);
									this.$refs.payPwdform2.resetFields();
									this.$confirm('修改成功', '提示', {
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
				})

			},
			onSubmit104() {
				this.$refs.payPwdform2.resetFields();
				this.active1--;
				this.payPwdShow1 = true;
				this.payPwdShow2 = false;
			},
			onSubmit201() {
				this.$refs.loginPwdform1.validate(async valid => {
					if (!valid) {
						this.$confirm('请输入银行卡号或身份证号', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
						return null;
						
					} else {
						console.log("submit201");
						if (this.loginPwdform1.cardId == "" || this.loginPwdform1.Id == "") {
							this.$confirm('请输入银行卡号或身份证号', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消'
							})
						} else {
							var id = {
								cardId: this.loginPwdform1.cardId,
								Id: this.loginPwdform1.Id
							}
							this.$axios({
									headers: {
										'Content-Type': 'application/json'
									},
									method: 'post',
									data: JSON.stringify(id), //上传的参数
									url: API.clientcheck, //请求的url。与后端@Request Mapping注解中的值一致。
								})
								.then(
									successResponse => {
										console.log(successResponse);
										if (successResponse.data.state == 0) { //身份核验通过
											console.log(successResponse.data.message);
											if (successResponse.data.ebankState == 1) {
												this.$confirm('未开通网银！', '提示', {
													confirmButtonText: '确定',
													cancelButtonText: '取消'
												})
											} else {
												this.active2++;
												this.loginPwdShow1 = false;
												this.loginPwdShow2 = true;
												this.loginPwdform2.phone = successResponse.data.data.phone;
											}

										} else {
											console.log(successResponse.data.message); //核验失败
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
										}
									});
						}
					}
				})

			},
			onSubmit202() { //获取验证码
				var phone = {
					phone: this.loginPwdform2.phone
				}
				this.$axios({
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'post',
					data: JSON.stringify(phone), //上传的参数
					url: API.codecheck, //请求的url。与后端@Request Mapping注解中的值一致。
				}).then(
					successResponse => {
						console.log(successResponse);
						if (successResponse.data.state == 0) {
							console.log(successResponse.data.message);
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
					}).catch( //登陆过期
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
			onSubmit203() {
				this.$refs.loginPwdform2.validate(async valid => {
					if (!valid) {
						this.$confirm('请输入相关信息！', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
						return null;
						
					} else {
						console.log("提交！");
						var data = {
							cardId: this.loginPwdform1.cardId,
							Id: this.loginPwdform1.Id,
							phone: this.loginPwdform2.phone,
							code: this.loginPwdform2.code,
							newloginPwd: this.loginPwdform2.newloginPwd
						}
						this.$axios({
							headers: {
								'Content-Type': 'application/json'
							},
							method: 'post',
							data: JSON.stringify(data), //上传的参数
							url: API.newloginpwd, //请求的url。与后端@Request Mapping注解中的值一致。
						}).then(
							successResponse => {
								console.log(successResponse);
								if (successResponse.data.state == 0) {
									console.log(successResponse.data.message);
									this.$refs.loginPwdform2.resetFields();
									this.$confirm('修改成功', '提示', {
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
				})

			},
			onSubmit204() {
				this.$refs.loginPwdform2.resetFields();
				this.active2--;
				this.loginPwdShow1 = true;
				this.loginPwdShow2 = false;
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleChange() {
				console.log("开通不开通");
				if (this.form.ebankState == true) {
					this.disabledInput = false;
				} else {
					this.disabledInput = true;
				}
			},
			inputBlur() {
				console.log("enter时触发");
				var check = {
					id: this.form.id,
					phone: this.form.phone
				}
				this.$axios({
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'post',
						data: JSON.stringify(check), //上传的参数
						url: API.accountvalidation, //请求的url。与后端@Request Mapping注解中的值一致。
					})
					.then(
						successResponse => {
							console.log(successResponse);
							if (successResponse.data.state == 0) {
								console.log(successResponse.data.message);
							} else {
								console.log(successResponse.data.message);
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
			},
			onSubmit() {
				this.$refs.form.validate(async valid => {
					if (!valid) {
						this.$confirm('请输入相关信息！', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
						return null;
					} else {
						console.log('submit!');
						if (this.form.cardPwd1 != this.form.cardPwd && this.form.cardPwd != null) {
							this.$confirm('取款密码输入不一致，点击返回', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消'
							})
						} else {
							var account = {
								id: this.form.id,
								phone: this.form.phone,
								name: this.form.name,
								address: this.form.address,
								email: this.form.email,
								cardPwd: this.form.cardPwd,
								ebankPwd: this.form.ebankPwd,
								ebankState: (this.form.ebankState == true) ? 2 : 1,
								mobileBankState: (this.form.mobileBankState == true) ? 2 : 1,
								foreignExchangeState: (this.form.foreignExchangeState == true) ? 2 : 1
							}
							console.log(account);
							this.$axios({
									headers: {
										'Content-Type': 'application/json'
									},
									method: 'post',
									data: JSON.stringify(account), //上传的参数
									url: API.accountestablish, //请求的url。与后端@Request Mapping注解中的值一致。
								})
								.then(
									successResponse => {
										console.log(successResponse);
										if (successResponse.data.state == 0) {
											this.$refs.form.resetFields();
											console.log(successResponse.data.message);
											if (this.form.ebankState == true) {
												this.$confirm("开通的银行卡号为:" + successResponse.data.data.cardId +
													"请妥善保管," + "网上银行初始登录密码为" + successResponse.data
													.data.ebankPwd, '提示', {
														confirmButtonText: '确定',
														cancelButtonText: '取消'
													})
											} else {
												this.$confirm("开通的银行卡号为:" + successResponse.data.data.cardId,
													'提示', {
														confirmButtonText: '确定',
														cancelButtonText: '取消'
													})
											}
											this.form.ebankState = false;
											this.form.mobileBankState = false;
											this.form.foreignExchangeState = false;
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
										}
									});
						}
					}
				})

			},
		}
	};
</script>

<style></style>
