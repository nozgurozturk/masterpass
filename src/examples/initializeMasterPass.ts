// eslint-disable-next-line no-unused-vars
import { MasterPass } from '../models/MasterPass'
import MasterPassController from '../controllers/MasterPassController'

const test = {
  clientId: '34705792',
  forceMasterPass3d: true,
  isOtpMsisdn: false,
  address: ' https://test.masterpassturkiye.com/MasterpassJsonServerHandler/v2',
  msisdn: '905385657551',
  token: 'D1717DCA721A6030E7DCA40B5BA92A637B7FA447DC3B61BFD353D10790F0DDCB5FA3CF15FF7CE7B2329C5D8A1534173F818ABCFB5300D96AACBD9D4C1017FDE3F411870E3BB9565BD42D2E6AC0B120EBB75C6C519AB731E0C02777B8A012380620481267EA15CD196347601192A4F69492374D0B55BDA44A9E7E12982A4F5A72EEE3B738D6F0FB42705F9FC07C6BE21F310C7DAF'
}
const n11 = {
  msisdn: '905385657551',
  forceMasterPass3d: true,
  clientId: '34700760',
  address: 'https://ui.masterpassturkiye.com/v2',
  token: '00663245B9CE636777C48345E19363550C9B6EBC8E94354A6A1D48522FE68F55EE507240504FE16295A0505A0FCBCA2472013F63',
  isOtpMsisdn: false
}

// {"sendSmsLanguage":"tur","sendSms":"Y","referenceNo":"101252836185","token":"5D6C94C59365DFAEA505AAFD1D78FF6D7090941B3BBE17C5FA6A11E96220D9750B0EF4E295DBB8B22F65092B9D15695E2704C68D","userId":"905333385196","version":"33","clientType":"1","fp":"","clientId":"34700760","dateTime":"2020-04-09T06:03:47.608Z"}

function getMasterPassInfo () {
  return new Promise<MasterPass._Interface>(resolve => {
    setTimeout(() => {
      resolve(test)
    }, 1000)
  })
}

export async function initializeMasterPass () {
  try {
    const info = await getMasterPassInfo()
    MasterPassController.init(info)
  } catch (error) {
    return new Error('Can\'t get server response')
  }
}
