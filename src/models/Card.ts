export interface ICard {
  Name: string
  PromtCpin: string
  Value1: string
  Value2?: string
  Value3?: string
  Value4?: string
  CardStatus: string
  BankIca: string
  LoyaltyCode: string
  ProductName: string
  UniqueId: string
  EftCode: string
}

// "Name": "Maximum",
// "PromtCpin": "N",
// "Value1": "454360********40",
// "Value2": "U01",
// "IsMasterPassMember": "Y",
// "CardStatus": "0000100101",
// "BankIca": "3771",
// "LoyaltyCode": "",
// "ProductName": "İş Bankası Maximum Visa",
// "UniqueId": "6509CF2E98010E2F9CA68F8E829DE2A3ABAEDD7F4BA2EE0536B261C3332084B3",
// "EftCode": "0064"

export class Card {
  public Name : string
  public Value1: string
  public Value2?: string
  public Value3?: string
  public Value4?: string
  public CardStatus: string
  public UniqueId: string
  public EftCode: string
  public BankIca: string
  public ProductName: string
  constructor ({
    Name,
    Value1,
    Value2,
    Value3,
    Value4,
    CardStatus,
    UniqueId,
    EftCode,
    BankIca,
    ProductName
  }:ICard) {
    this.Name = Name
    this.Value1 = Value1
    this.Value2 = Value2
    this.Value3 = Value3
    this.Value4 = Value4
    this.CardStatus = CardStatus
    this.UniqueId = UniqueId
    this.EftCode = EftCode
    this.BankIca = BankIca
    this.ProductName = ProductName
  }
}
