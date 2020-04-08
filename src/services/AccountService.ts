import { Account, IAccount, AccountStatus } from '../models/Account'
import { Context } from '../contex/index'

/**
 * @class AccountService
 * @description Manages Account Data of MasterpassAccount
 * @property {Function} bindAccountChanged
 * @property {Function} commit
 * @property {Function} add
 * @property {Function} convertStringsToDigits
 * @property {Function} identifyAccountStatus
 * @property {Function} setAccountStatus
 */

export class AccountService {
  public account: Account
  public userId: string
  public accountStatus: AccountStatus
  private onAccountChange: Function
  constructor () {
    const account: Account = Context.Account
    this.account = account
  }

  /**
   * Invoke callback function when Account is changed
   * @method bindAccountChanged
   * @param {Function} callback
   * @returns {void}
   */

  bindAccountChanged (callback: Function) {
    this.onAccountChange = callback
  }

  /**
   * Commit Data to Context
   * @private
   * @method commit
   * @param {Account} account
   * @returns {void}
   */

  private commit (account: Account) {
    this.onAccountChange(account)
  }
  /**
   * Add Account to Context
   * @public
   * @method add
   * @param {IAccount} IAccount
   * @param {string} IAccount.userId
   * @param {number} accountStatus
   * @returns {void}
   */

  public add ({ userId, accountStatus }: IAccount) {
    const newAccount = new Account({ userId, accountStatus })
    this.commit(newAccount)
  }

  /**
   * Convert First Seven Character of String to Number of Array
   * @private
   * @method convertStringsToDigits
   * @param {string} accountStatus
   * @returns {Array<Number>}
   */
  private convertStringsToDigits = (accountStatus: string): number[] => {
    return accountStatus.substring(0, 7).split('').map(string => Number(string))
  }

  /**
   * Calculate sum of array number
   * @description Number [0, 1, 0, 1, 1, 0, 1]
   * Calcuate for each number as (2^0) * 0 -> (2: Base ^0: Exponent) * 0: Number in Array
   * Exponent is increamented by index
   * @private
   * @method identifyAccountStatus
   * @param {Array<Number>} digits
   * @returns {Number}
   */

  private identifyAccountStatus = (digits: number[]): number => {
    return digits.reduce((sum: number, digit: number, index: number) => Number(sum) + Number(digit) * Math.pow(2, index))
  }

  /**
   * Set Account Status as Enum
   * @public
   * @method setAccountStatus
   * @param {string} accountStatus
   * @returns {Number} AccountStatus Enum
   */

  public setAccountStatus = (accountStatus: string): AccountStatus => {
    const digits = this.convertStringsToDigits(accountStatus)
    const status = this.identifyAccountStatus(digits)
    switch (status) {
      case digits[0] = 0:
        return AccountStatus.NoAccount
      case digits[4] = 1:
        return AccountStatus.BlockedAccount
      case 66 || 67:
        return AccountStatus.RegisteredAccount
      case 10 || 11:
        return AccountStatus.LinkedWithoutCard
      case 70 || 71:
        return AccountStatus.AccountWithCard
      case 78 || 79:
        return AccountStatus.LinkedWithCard
      default:
        return AccountStatus.NoAccount
    }
  }
}
