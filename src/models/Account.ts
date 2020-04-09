export enum AccountStatus {
  NoAccount, // 0 - X0XXXX
  BlockedAccount, // 1 - XXXX1X
  AccountWithoutCard, // 2 - X10000
  LinkedWithoutCard, // 3 - X10100
  AccountWithCard, // 4 - X11000
  LinkedWithCard, // 5 - X11100
  LinkedWithCardUpdated, // 6 - X11101
}

export interface IAccount {
  userId?: string
  accountStatus?: AccountStatus
}

export class Account {
  public userId: string
  public accountStatus: AccountStatus
  constructor ({ userId, accountStatus }:IAccount) {
    this.userId = userId
    this.accountStatus = accountStatus
  }
}
