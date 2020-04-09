// eslint-disable-next-line no-unused-vars
import { MasterPass } from '../models/MasterPass'
import MasterPassController from '../controllers/MasterPassController'

const ipekyol = {
  clientId: '34704570',
  forceMasterPass3d: true,
  isOtpMsisdn: true,
  address: 'https://ui.masterpassturkiye.com/v2',
  msisdn: '905385657551',
  token: '1B51EF5558DCCAB1A116EDF5BDCB35BD81E0CE873DA35267BF1B7850BBBA00D1F2659B35901D99A08A90EDC05DAA74C5622E4A2ABA966579247CABBC8A60F7E99D58B17405B737D5254EA12BFACB50198AE54F2EFDEFC4833E47D327BE01A00C6A8DE1F39CDD1F64C6E136CB43433CCD0CA4976E99C7C6DB6179859E27773876052A71DD74476A525DEA81A9C8563DF5F998362B'
}

// {"sendSmsLanguage":"tur",
// "sendSms":"Y",
// "referenceNo":"101252836185",
// "token":"697BEBD54933596C4D4F711ED41ABE3F4F2C0C6A1B2D85BB991E020A2C89E56E9C1C59242FBCD2908373EF5720660478E6AF5226",
// "userId":"905333385196",
// "version":"33",
// "clientType":"1","fp":"","clientId":"34700760","dateTime":"2020-04-09T05:40:21.480Z"}

const n11 = {
  clientId: '34700760',
  forceMasterPass3d: true,
  isOtpMsisdn: false,
  address: 'https://ui.masterpassturkiye.com/v2',
  msisdn: '905385657551',
  token: '5A493294B91838748AE380393EB418429250F54DF88D1AB0196DF9778B22C3DE91B2C7330C550E38A1B4D2BAC61C8C7174BDAF48'
}

// {"sendSmsLanguage":"tur","sendSms":"Y","referenceNo":"101252836185","token":"5D6C94C59365DFAEA505AAFD1D78FF6D7090941B3BBE17C5FA6A11E96220D9750B0EF4E295DBB8B22F65092B9D15695E2704C68D","userId":"905333385196","version":"33","clientType":"1","fp":"","clientId":"34700760","dateTime":"2020-04-09T06:03:47.608Z"}

function getMasterPassInfo () {
  return new Promise<MasterPass._Interface>(resolve => {
    setTimeout(() => {
      resolve(n11)
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
