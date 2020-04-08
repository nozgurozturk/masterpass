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
