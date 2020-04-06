import { CardService } from '../services/CardService'
import { Card } from '../models/Card'

export class CardController {
  private CardService : CardService
  constructor (CardService: CardService) {
    this.CardService = CardService
    // Explicit this binding
    this.CardService.bindCardListChanged(this.onCardListChanged)
  }

  onCardListChanged = (cards: Card[]) => {
    // TODO
  };

  handleAddCard = (card: Card) => {
    this.CardService.add(card)
  };

  handleEditCard = (id: string, card: Card) => {
    this.CardService.edit(id, card)
  };

  handleDeleteCard = (id: string) => {
    this.CardService.delete(id)
  };
}
