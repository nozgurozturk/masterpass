import { MasterPassController } from './controllers/MasterPassController'
import { MasterPassService } from './services/MasterPassService'
import { Context } from './contex/index'
import { CheckMasterPassController } from './controllers/CheckMasterPassController'
import { ICheckMasterPass } from './models/CheckMasterPass'
import { AccountController } from './controllers/AccountController'
import { AccountService } from './services/AccountService'
import { Account } from './models/Account'
import { LinkCardController } from './controllers/LinkCardController'
import { ILinkCard } from './models/LinkCard'
import { IMasterPass } from './models/MasterPass'
import { IOTP } from './models/OTP'
import { OTPController } from './controllers/OTPController'
import { IListCard } from './models/ListCard'
import { ListCardController } from './controllers/ListCardController'
import { IBody } from './models/MasterPassResponse'

declare global {
  interface Window {
    MFS: any;
  }
}
const _MFS: any = window.MFS
if (!_MFS) throw new Error('You need to import masterpass library')

function getServerInfo () {
  const mp:IMasterPass = {
    clientId: '34704570',
    forceMasterPass3d: true,
    isOtpMsisdn: true,
    address: Context.baseUrl,
    msisdn: '905385657551',
    token: '1B51EF5558DCCAB1A116EDF5BDCB35BD1D8E2DDE148FF36A030F53674F8A5AAE9346234258E8B853E86FC1128429383B40CEA2B2A29642C26C88247D76425041783EE1D4E0F6A943B649B759FA4AEAF3A5291CA95F343E76158D2CD5B33CA3A45A4389743EDD89944108924EF9684BAF6E64FC6C495B43B3677EE6359C65CB41AE8FEA65CE7566A12DEC42AFB8126AAD3C7669E3'
  }
  new MasterPassController(new MasterPassService()).handleAddMasterPass(mp)
  new AccountController(new AccountService()).handleAddAccount(new Account(mp.msisdn, 0))
}

function initilizeMFS () {
  window.MFS.setAddress(Context.MasterPass.address)
  window.MFS.setClientId(Context.MasterPass.clientId)
}
// {"sendSmsLanguage":"eng",
// "sendSms":"N",
// "referenceNo":"101252836185",
// "token":"1231231231231231241231312312312312",
// "userId":"9055544433322",
// "fp":"",
// "clientId":"34700605",
// "dateTime":"2020-04-06T13:05:44.424Z",
// "version":"35",
// "clientType":"1"}:
// {"sendSmsLanguage":"tur",
// "sendSms":"Y",
// "referenceNo":"0000000",
// "token":"1B51EF5558DCCAB1A116EDF5BDCB35BD576967BEB3A17EEB2031C64571673A45BC5874B5F65F9190322D0FCA027D6FF079685FE160B7CB6A501E88BC605B4716D11D3A2369BC5C58DE3054BD6335B6C3A6F04D7BAE925E83B96BE9B1F8EA6A657D5F418E44F9525A96AFEB0BAAF8978C3761465C80818EB90EC30770BC779B02F91C874009D8C21F89AE3B6A0571A920CFDD75E5",
// "userId":"905385657551",
// "fp":"",
// "clientId":"34704570",
// "dateTime":"2020-04-06T12:21:32.265Z",
// "version":"34",
// "clientType":"1"}

function checkMasterPass () {
  const instance: ICheckMasterPass = {
    sendSmsLanguage: 'tur',
    sendSms: 'N',
    referenceNo: '0000000',
    token: Context.MasterPass.token,
    userId: Context.MasterPass.msisdn,
    fp: '',
    clientId: Context.MasterPass.clientId,
    dateTime: new Date().toISOString(),
    version: '35',
    clientType: '1'
  }
  new CheckMasterPassController(instance).onCheckMasterPass()
    .then((response:any) => {
      document.querySelector('.link-button').setAttribute('style', 'display:block')
      new AccountController(new AccountService()).hadnleSetStatus(response.Result.TransactionBody.AccountStatus)
    })
    .catch(error => console.log(error))
}
const otpForm = document.querySelector('.otp-form')
function linkCardToClient () {
  const instance : ILinkCard = {
    sendSmsLanguage: 'tur',
    sendSms: 'Y',
    token: Context.MasterPass.token,
    cardAliasName: '',
    msisdn: Context.MasterPass.msisdn,
    fp: '',
    clientId: Context.MasterPass.clientId,
    dateTime: new Date().toISOString(),
    version: '35',
    clientType: '1'
  }
  new LinkCardController(instance).onLinkCard()
    .then((value) => console.log(value))
    .catch((error) => {
      console.log(error)
      // response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode
      const masterPassController = new MasterPassController(new MasterPassService())
      if (error.Fault.Detail.ServiceFaultDetail.ResponseCode === '5001') {
        // TODO : Show OTP Form
        otpForm.setAttribute('style', 'display:block')
        masterPassController.onResponseTokenChanged(error.Fault.Detail.ServiceFaultDetail.Token)
        console.log('show otp', error.Fault.Detail.ServiceFaultDetail.ResponseCode)
      } else if (error.Fault.Detail.ServiceFaultDetail.ResponseCode === '5008') {
        // TODO : Show OTP Form
        otpForm.setAttribute('style', 'display:block')
        masterPassController.onResponseTokenChanged(error.Fault.Detail.ServiceFaultDetail.Token)
        console.log('show otp', error.Fault.Detail.ServiceFaultDetail.ResponseCode)
      } else if (error.Fault.Detail.ServiceFaultDetail.ResponseCode === '5010') {
        // TODO : Show 3D Form
        otpForm.setAttribute('style', 'display:block')
        masterPassController.onResponseTokenChanged(error.Fault.Detail.ServiceFaultDetail.Token)
        console.log('show 3d', error.Response.Result.TransactionBody.url3D)
      } else {
        // TODO : Show MPIN Form
        console.log('show mpin')
      }
    })
}

function OTPSubmit () {
  const validationCode = (<HTMLInputElement>document.querySelector('#otp-validation')).value
  const instance: IOTP = {
    validationRefNo: Context.MasterPass.responseToken,
    token: null,
    referenceNo: '000000',
    sendSmsLanguage: 'tur',
    sendSms: 'Y',
    validationCode: validationCode,
    fp: '',
    clientId: Context.MasterPass.clientId,
    clientType: '1',
    dateTime: new Date().toISOString(),
    version: '35'
  }
  new OTPController(instance).onOTP().then(value => console.log(value)).catch(error => console.log(error))
}

function listCards () {
  const instance : IListCard = {
    token: Context.MasterPass.token,
    msisdn: Context.MasterPass.msisdn,
    referenceNo: '000000',
    listType: 'ACCOUNT', // 'ACCOUNT'
    sendSms: 'Y',
    clientIp: '',
    sendSmsLanguage: 'tur',
    clientId: Context.MasterPass.clientId,
    dateTime: new Date().toISOString(),
    version: '35',
    clientType: '1'
  }
  new ListCardController(instance).onListCard().then((response:IBody) => {
    console.log(response.Response.Result.TransactionBody.ListItem)
  }).catch(error => console.log(error))
}

function main () {
  getServerInfo()
  initilizeMFS()
  checkMasterPass()
}

main()

document.querySelector('.link-button').addEventListener('click', () => {
  linkCardToClient()
})
document.querySelector('.otp-submit').addEventListener('click', () => {
  OTPSubmit()
})

document.querySelector('.log-button').addEventListener('click', () => {
  console.log(Context.Account)
  console.log(Context.MasterPass)
})

document.querySelector('.list-button').addEventListener('click', () => {
  // function responseHandler (status:any, response:any) {
  //   console.log(response)
  // }
  // window.MFS.listCards(Context.MasterPass.msisdn, Context.MasterPass.token, responseHandler)
  listCards()
})
