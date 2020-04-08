// eslint-disable-next-line no-unused-vars
import { MasterPass } from '../models/MasterPass'
import MasterPassController from '../controllers/MasterPassController'

function getMasterPassInfo () {
  return new Promise<MasterPass._Interface>(resolve => {
    setTimeout(() => {
      resolve({
        clientId: '34704570',
        forceMasterPass3d: true,
        isOtpMsisdn: true,
        address: 'https://ui.masterpassturkiye.com/v2',
        msisdn: '905385657551',
        token: '1B51EF5558DCCAB1A116EDF5BDCB35BD7DFCEEA8F55B9106D7CE62C59BE480EB9BEDD575F3CB68EFC939025000FF06599A4204142B6DBCE92F80CAC9333FEF138A848313EDB212FCEE7300CFFD87C52C7AC6B335AD4F8FE3FC26AFC59899ADA4686C08CF7E5F106F5634629867650530A16AE976145ECC40DA9A19D56F9396448530248F515C6943038B91E810C0703B75A9B845'
      })
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
