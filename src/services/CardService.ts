import { Context } from '../contex/index'
import { ICard, Card } from '../models/Card'

/**
 * @class CardService
 * @property {Function} bindCardListChanged
 * @property {Function} commit
 * @property {Function} add
 * @property {Function} edit
 * @property {Function} delete
 */

export class CardService {
  public cards: Card[];
  private onCardListChanged: Function;

  constructor () {
    const cards: Card[] = []
    this.cards = cards.map((card:ICard) => new Card(card))
  }

  /**
   * Invoke callback function when Card is changed
   * @public
   * @method bindCardListChanged
   * @param {Function} callback
   */

  public bindCardListChanged (callback: Function) {
    this.onCardListChanged = callback
  }

  /**
   * Commit Data to Context
   * @private
   * @method commit
   * @param {Card} cards
   */

  private commit (cards: Card[]) {
    this.onCardListChanged(cards)
  }

  /**
   * Add Card to Context
   * @public
   * @method add
   * @param {ICard} card
   */

  public add (card: ICard) {
    this.cards.push(new Card(card))
    this.commit(this.cards)
  }

  /**
   * Edit Selected Card from Context
   * @public
   * @method edit
   * @param {string} name
   * @param {ICard} cardToEdit
   */

  public edit (name: string, cardToEdit: ICard) {
    this.cards = this.cards.map(card =>
      card.Name === name
        ? new Card({
          ...card,
          ...cardToEdit
        })
        : card
    )

    this.commit(this.cards)
  }

  /**
   * Delete Card from Context
   * @public
   * @method delete
   * @param {string} _name
   */

  public delete (_name: string) {
    this.cards = this.cards.filter(({ Name }) => Name !== _name)
    this.commit(this.cards)
  }
}
