const userlogin = 'api/user/login/client'; //用户登录
const VerificationCode = 'api/user/login/client/sendVerificationCode'; //获取验证码
const userloginout = 'api/user/logout/client'; //用户注销
const transfer = 'api/client/transfer'; //转账
const querycard = 'api/card/information/query'; //查询银行卡的信息
const transactionFlow = 'api/client/transactionFlow/query'; //交易流水
const deposit = 'api/teller/client/deposit'; //存款
const draw = 'api/teller/client/draw'; //取款
const cashLedger = 'api/teller/cashLedger/query'; //现金总账
const accountvalidation = 'api/teller/client/account/validation'; //验证账户状态
const accountestablish = 'api/teller/client/account/establish'; //开户
const tellerlogin = 'api/user/login/teller'; //柜员登录
const clientcheck = 'api/teller/client/query'; //银行卡身份验证
const codecheck = 'api/teller/client/sendVerificationCode'; //获取验证码
const newpaypwd = 'api/teller/client/newpayPwd'; //修改支付密码
const newloginpwd = 'api/teller/client/newloginPwd'; //修改登录密码

const resetloginpwd = 'api/client/reset';//重置登录密码
const getTime='api/teller/systemDate';//获取当前系统时间
const tellerserial='api/teller/transactionFlow/query';//柜员流水查询
const serviceopen='api/teller/serviceopen';//更新业务开通情况
const queryservice='api/teller/client/service/query';//根据身份证号查询银行卡业务情况
const queryuserinfo='api/client/info';//查询这个用户的详细信息

const queryallflow='api/teller/transactionFlow/all'


export default {
	userloginApi: userlogin,
	verificationApi: VerificationCode,
	userloginout: userloginout,
	transfer: transfer,
	querycard: querycard,
	transactionFlow: transactionFlow,
	tellerlogin: tellerlogin,
	deposit: deposit,
	draw: draw,
	cashLedger: cashLedger,
	accountvalidation: accountvalidation,
	accountestablish: accountestablish,
	clientcheck: clientcheck,
	codecheck: codecheck,
	newpaypwd: newpaypwd,
	newloginpwd: newloginpwd,
	resetloginpwd: resetloginpwd,
	getTime:getTime,
	tellerserial:tellerserial,
	serviceopen:serviceopen,
	queryservice:queryservice,
	queryuserinfo:queryuserinfo,
	queryallflow:queryallflow
}
