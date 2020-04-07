import { Context } from '../contex/index'
import { ICard, Card } from '../models/Card'

export class CardService {
  public cards: Card[];
  private onCardListChanged: Function;

  constructor () {
    const cards: Card[] = []
    this.cards = cards.map((card:ICard) => new Card(card))
  }

  public bindCardListChanged (callback: Function) {
    this.onCardListChanged = callback
  }

  private commit (cards: Card[]) {
    this.onCardListChanged(cards)
  }

  public add (card: ICard) {
    this.cards.push(new Card(card))
    this.commit(this.cards)
  }

  public edit (UniqueId: string, cardToEdit: ICard) {
    this.cards = this.cards.map(card =>
      card.UniqueId === UniqueId
        ? new Card({
          ...card,
          ...cardToEdit
        })
        : card
    )

    this.commit(this.cards)
  }

  public delete (_UniqueId: string) {
    this.cards = this.cards.filter(({ UniqueId }) => UniqueId !== _UniqueId)
    this.commit(this.cards)
  }
}
