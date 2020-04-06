import { MasterPassService } from '../services/MasterPassService'
import { MasterPass } from '../models/MasterPass'
import { setMasterPassContext, setResponseTokenContext } from '../contex/index'

export class MasterPassController {
  private masterPassService: MasterPassService
  constructor (masterPassService: MasterPassService) {
    this.masterPassService = masterPassService
    masterPassService.bindMasterPassChanged(this.onMasterPassChanged)
    masterPassService.bindResponseTokenChanged(this.onMasterPassChanged)
  }

  onResponseTokenChanged = (responseToken: string) => {
    setResponseTokenContext(responseToken)
  }

  onMasterPassChanged = (mp: MasterPass) => {
    setMasterPassContext(mp)
  }

  handleAddMasterPass= (mp: MasterPass) => {
    this.masterPassService.add(mp)
  }
}

// import { IMasterPass } from '../models/MasterPass'

// const MasterPass: IMasterPass = {
//   clientId: '', address: '', token: '', msisdn: '', forceMasterPass3d: false, isOtpMsisdn: false
// }

// const setClientId = (clientId: string) => {
//   console.log(MasterPass)
//   MasterPass.clientId = clientId
// }

// const setAddress = (address: string) => {
//   MasterPass.address = address
// }

// const setToken = (token: string) => {
//   MasterPass.token = token
// }

// const setMsisdn = (msisdn: string) => {
//   MasterPass.msisdn = msisdn
// }

// const setForceMasterPass3d = (forceMasterPass3d: boolean) => {
//   MasterPass.forceMasterPass3d = forceMasterPass3d
// }

// const setIsOtpMsisdn = (isOtpMsisdn: boolean) => {
//   MasterPass.isOtpMsisdn = isOtpMsisdn
// }

// export const initilizeMasterPass = (response: IMasterPass) => {
//   const { clientId, address, token, msisdn, forceMasterPass3d, isOtpMsisdn } = response
//   setClientId(clientId)
//   setAddress(address)
//   setToken(token)
//   setMsisdn(msisdn)
//   setForceMasterPass3d(forceMasterPass3d)
//   setIsOtpMsisdn(isOtpMsisdn)
// }

// export { MasterPass }
