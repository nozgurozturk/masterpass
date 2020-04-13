export function creaditCardValidator (creditCardNumber:string):boolean {
  let sum:number = 0
  for (let index = creditCardNumber.length - 1; index >= 0; index--) {
    let digit = parseInt(creditCardNumber.charAt(index), 10)
    if (index % 2 === creditCardNumber.length % 2) digit = digit * 2
    if (digit > 9) digit -= 9
    sum += digit
  }
  return sum % 10 === 0
}
