class Deck {
  constructor(cards) {
    this.cards = cards || [];
  }

  countCards() {
    return this.cards.length || 0
  }
}

module.exports = Deck;