export interface ICard {
  Name : string
  Value: string
  CardStatus: string
  UniqueId: string
  EftCode: string
  BankIca: string
  ProductName: string
}

export class Card {
  public Name : string
  public Value: string
  public CardStatus: string
  public UniqueId: string
  public EftCode: string
  public BankIca: string
  public ProductName: string
  constructor ({
    Name,
    Value,
    CardStatus,
    UniqueId,
    EftCode,
    BankIca,
    ProductName
  }:ICard) {
    this.Name = Name
    this.Value = Value
    this.CardStatus = CardStatus
    this.UniqueId = UniqueId
    this.EftCode = EftCode
    this.BankIca = BankIca
    this.ProductName = ProductName
  }
}
