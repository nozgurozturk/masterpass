// import { IMasterPassResonse, IBody } from '../models/MasterPassResponse'

// export class ResponseHandler {
//   constructor (status:number, response:IMasterPassResonse) {
//     this.call(status, response)
//   }

//   private call (status:number, response:IMasterPassResonse): IBody {
//     if (response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '0000' ||
//     response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode === '') {
//       return response.Data.Body
//     } else {
//       return response.Data.Body
//     }
//   }
// }
