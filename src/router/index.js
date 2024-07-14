import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '../components/user/user.vue'

import tellerlogin from '../components/teller/teller_login.vue'
import userlogin from '../components/user/user_login.vue'

import dealflow from '../components/user/UserQueryDealFlow.vue'
import cardbalance from '../components/user/UserQueryCardBalance.vue'
import ebankhome from '../components/user/ebankhome.vue'
import transfer from '../components/user/transfer.vue'
import myaccount from '../components/user/myaccount.vue'
import tellerhome from '../components/teller/tellerhome.vue'

import Teller from '../components/teller/teller.vue'; //柜员操作主页
import General_Ledger from '../components/teller/general_ledger.vue'; //账务查询
import Account_Control from '../components/teller/account_control.vue'; //账户业务
import Money_Change from '../components/teller/money_change.vue'; //存、取款业务
import Teller_Serial from '../components/teller/teller_serial.vue';//柜员端查询用户流水
import pie from'../components/user/pie.vue';


Vue.use(VueRouter)

const routes = [{
		path: '/userlogin',
		name: 'userlogin',
		component: userlogin,
	},
	{
		path: '/',
		name: 'tellerlogin',
		component: tellerlogin,
	},
	{
		path: '/user',
		name: 'user',
		component: user,
		children: [{
				path: '/',
				component: myaccount
			},
			{
				path: '/dealflow',
				component: dealflow
			},
			{
				path: '/cardbalance',
				component: cardbalance
			},
			{
				path: '/transfer',
				component: transfer
			},
			{
				path: '/pie',
				component: pie
			},
		]
	},
	{
		path: '/teller',
		name: 'Teller',
		component: Teller,
		meta: {
			title: '首页',
			breadcrumb: [{
				name: '首页',
				path: '/teller'
			}]
		},
		children: [
			{
				path: '/',
				name: 'tellerhome',
				component: tellerhome,
			},
			{
				path: '/general_ledger',
				name: 'General_Ledger',
				component: General_Ledger,
				meta: {
					title: '账务查询',
					breadcrumb: [{
							name: '首页',
							path: '/teller'
						},
						{
							name: '账务查询',
							path: '/general_ledger'
						}
					]
				}
			},
			{
				path: '/account_control',
				name: 'Account_Control',
				component: Account_Control,
				meta: {
					title: '账户业务',
					breadcrumb: [{
							name: '首页',
							path: '/teller'
						},
						{
							name: '账户业务',
							path: '/account_control'
						}
					]
				}
			},
			{
				path: '/money_change',
				name: 'Money_Change',
				component: Money_Change,
				meta: {
					title: '存款取款',
					breadcrumb: [{
							name: '首页',
							path: '/teller'
						},
						{
							name: '存款取款',
							path: '/money_change'
						}
					]
				}
			},
			{
				path: '/teller_serial',
				name: 'Teller_Serial',
				component: Teller_Serial,
				meta: {
					title: '流水查询',
					breadcrumb: [{
							name: '首页',
							path: '/teller'
						},
						{
							name: '流水查询',
							path: '/teller_serial'
						}
					]
				}
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
