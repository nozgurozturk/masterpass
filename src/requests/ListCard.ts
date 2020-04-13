import { Initial } from './Initial'

export interface IListCard extends Initial{
  token: string
  msisdn: string
  listType: string // 'ACCOUNT'
  sendSms: string
  clientIp: string
  sendSmsLanguage: string
}

// {"msisdn":"905385657551",
// "token":"1B51EF5558DCCAB1A116EDF5BDCB35BD32671E8CD4F0CB49E348C5551B18B18C9B4B270316FED8B57E75128969A98274A2F13F071189F88F072CE8A8C5B26FB69B6DC9459AA2588ACBA345322F5B9431C1E65B070D2C5AD8E401EE5FC09FE5EA713C6A1B26C5B18C865964482E8961C5BF7BAE3584813B16CA63E30EDB730B87FCAC8F1853CFDC78A1FF8F2BC12B542CFB20FC6B",
// "referenceNo":"00000000",
// "listType":"ACCOUNT",
// "sendSms":"Y",
// "clientIp":"",
// "sendSmsLanguage":"eng",
// "clientId":"34704570",
// "dateTime":"2020-04-06T13:58:59.067Z",
// "version":"35",
// "clientType":"1"}
