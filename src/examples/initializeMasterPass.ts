// eslint-disable-next-line no-unused-vars
import { MasterPass } from '../models/MasterPass'
import MasterPassController from '../controllers/MasterPassController'

// const test = {
//   clientId: '34705792',
//   clientIp: '213.74.12.146',
//   forceMasterPass3d: true,
//   isOtpMsisdn: false,
//   address: ' https://test.masterpassturkiye.com/MasterpassJsonServerHandler/v2',
//   msisdn: '905385657551',
//   token: 'D1717DCA721A6030E7DCA40B5BA92A6331F10289365BA1C53E754F425C9BC6216A4ED14E022E54D6E6D58DF94FF37FEDF9A21910432FC62B3EFDFCD1FF079AA55457EE5EDB38BF178CFF99BA78E178CF7C05B575392E0984EC699C86B8F73D442EFA79D506563EB5768B72C86C1A81F2DE8E5D03E706C4A55F4F1CF08697A5DE7A0C796CEE6E4F358629FFB81D347D865BBC145C'
// }

// {"sendSmsLanguage":"tur","sendSms":"Y","referenceNo":"101252836185","token":"5D6C94C59365DFAEA505AAFD1D78FF6D7090941B3BBE17C5FA6A11E96220D9750B0EF4E295DBB8B22F65092B9D15695E2704C68D","userId":"905333385196","version":"33","clientType":"1","fp":"","clientId":"34700760","dateTime":"2020-04-09T06:03:47.608Z"}

async function getMasterPassInfo () {
  try {
    const response = await fetch('http://localhost:8888/token')
    const json = await response.json()
    const token = json.token
    return {
      clientId: '34705792',
      clientIp: '213.74.12.146',
      forceMasterPass3d: true,
      isOtpMsisdn: false,
      address: ' https://test.masterpassturkiye.com/MasterpassJsonServerHandler/v2',
      msisdn: '905385657551',
      token: token
    }
  } catch (error) {
    console.log(error)
  }
}

export async function initializeMasterPass () {
  try {
    const info = await getMasterPassInfo()
    MasterPassController.init(info)
  } catch (error) {
    return new Error('Can\'t get server response')
  }
}
