export enum AccountStatus {
  NoAccount, // 0 - X0XXXXX
  BlockedAccount, // 1 - XXXX1XX
  RegisteredAccount, // 2 - X100001
  LinkedWithoutCard, // 3 - X101000
  AccountWithCard, // 4 - X110001
  LinkedWithCard, // 5 - X111001
}

export interface IAccount {
  userId?: string
  accountStatus?: AccountStatus
}
