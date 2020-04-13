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
  status?: AccountStatus
}

export class Account {
  public userId: string
  public status: AccountStatus
  constructor ({ userId, status }:IAccount) {
    this.userId = userId
    this.status = status
  }
}
