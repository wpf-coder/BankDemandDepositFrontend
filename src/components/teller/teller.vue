<template>
	<div>
		<el-container class="container">
			<el-aside width='200px'>
				<el-image style="width: 120px; height: 45px;margin-left: 10%;" @click="rehome()" :src="require('@/assets/ebank.png')">
				</el-image>
				<el-menu default-active="2" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
				 background-color="#34393e" text-color="#fff" active-text-color="#ffd04b" style="height: 662px;width: 200px;"
				 :collapse="isCollapse">
					<el-menu-item index="/teller">首页</el-menu-item>
					<el-menu-item index="/account_control">账户业务</el-menu-item>
					<el-menu-item index="/money_change">存款取款</el-menu-item>
					<el-menu-item index="/general_ledger">账务查询</el-menu-item>
					<el-menu-item index="/teller_serial">流水查询</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header height='49px' style=" background-color:#34393e ">
					<el-breadcrumb separator=">">
						<el-breadcrumb-item style="margin-top: 20px">当前位置</el-breadcrumb-item>
						<el-breadcrumb-item style="margin-top: 20px" :to="{ path: item.path }" v-for="item in this.$router.history.current.meta.breadcrumb"
						 :key="item">{{item.name}}
						</el-breadcrumb-item>
					</el-breadcrumb>
					<span style="float: right; margin-top: -17px; color: #FFFFFF;">当前会计日期为：{{nowtime}}</span>
				</el-header>
				<el-main>
					<el-row>
						<router-view></router-view>
					</el-row>
				</el-main>
			</el-container>
		</el-container>
		<el-dialog title="存款" :visible.sync="dialogFormVisible1">
			<el-form :model="form">
				<el-form-item label="银行卡号" :label-width="formLabelWidth">
					<el-input v-model="form.id" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="存入金额" :label-width="formLabelWidth">
					<el-input v-model="form.money" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="取款" :visible.sync="dialogFormVisible2">
			<el-form :model="form">
				<el-form-item label="银行卡号" :label-width="formLabelWidth">
					<el-input v-model="form.id" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="取出金额" :label-width="formLabelWidth">
					<el-input v-model="form.money" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="取款密码" :label-width="formLabelWidth">
					<el-input v-model="form.password" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import API from '../../../API/api.js';
	export default {
		data() {
			return {
				isCollapse: false,
				tagsList: [],
				dialogFormVisible1: false,
				nowtime: '2021-9-27',
				form: {
					id: '',
					money: ''
				},
				dialogFormVisible2: false,
				form: {
					id: '',
					money: '',
					password: ''
				},
				formLabelWidth: '120px'
			};
		},
		mounted() {
			this.getTime();
			window.setInterval(() => {
				setTimeout(() => {
					console.log("获取当前时间");
					this.getTime();
				}, 0);
			}, 60 * 1000)
		},

		methods: {
			handleOpen(key, keyPath, index) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath, index) {
				console.log(key, keyPath);
			},
			getTime() {
				this.$axios.post(API.getTime)
					.then(
						successResponse => {
							console.log(successResponse);
							var time = successResponse.data.substring(0, 10);
							console.log(time);
							this.nowtime = time;
						})
			},
			rehome() {
				this.$router.push({
					path: '/teller'
				});
			}
		},
		watch: {
			// 路由变化,设置标签
			$route(newValue, oldValue) {
				this.setTags(newValue);
			}
		},

		computed: {
			breadcrumb() {
				return this.$route.meta.breadcrumb;
			}
		}
	};
</script>
<style>
	.el-breadcrumb__item .el-breadcrumb__inner.is-link {
		color: #ffffff;
	}

	.el-breadcrumb__item .el-breadcrumb__inner {
		color: #ffffff;
	}
</style>
