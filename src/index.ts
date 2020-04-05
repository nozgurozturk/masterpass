import { initilizeMasterPass, MasterPass } from './controllers/MasterPass'
import { setAccountId } from './controllers/AccountController'
import { CheckMasterPass } from './controllers/CheckMasterPass'

declare global{
  interface Window {
    MFS: any;
  }
}
const _MFS: any = window.MFS
if (!_MFS) throw new Error('You need to import masterpass library')

function getServerInfo () {
  const mpResponse = {
    clientId: '34704570',
    forceMasterPass3d: true,
    isOtpMsisdn: true,
    address: 'https://ui.masterpassturkiye.com/v2',
    msisdn: '905385657551',
    token: '1B51EF5558DCCAB1A116EDF5BDCB35BD940A4C4A5EE49E8407390DC4781F7585D68F7C3B0454DF76374AE250014778209872DCC3EF4BE8F2277FD7B801A32DBA9C2904F0AE8FBD91CE31D54E396F0663712EABC474A6509E8A0EF9F83C4C6A13895FCDCCDED6B2FF2689807F99D402F4EE170453E53B0E1C9F6B2F0F3DE32229220833558791BCE8BD4B1136BE108122277F9578'
  }
  initilizeMasterPass(mpResponse)
  setAccountId(mpResponse.msisdn)
}

function initilizeMFS () {
  window.MFS.setAddress(MasterPass.address)
  window.MFS.setClientId(MasterPass.clientId)
}

function main () {
  getServerInfo()
  initilizeMFS()
}

main()

document.querySelector('.check-button').addEventListener('click', () => {
  console.log('check-button')
  console.log(CheckMasterPass())
})
