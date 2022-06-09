/**
 * Card class to store informatiion about a part
 * 
 * Properties
 * - rank: The rank of the card (Ex. 2, 3, King, Ace)
 * - symbol: The symbol of the card (Ex. Spades, Clubs, Diamonds)
 * - score: The score which will be used to see if a card is high than another (Ex. 1, 4, 9, 13)
 *
 * Functions
 * - constructor(): Initializes the card class with the information passed in as an argument*
*/

class Card {
  /**
   * Constructor of the Card class to initalize an instance of the Card object
   *
   * @params {string} rank A string to determine the rank of the card
   * @params {string} symbol A symbol to determine the type of card
   * @params {number} score A score which will be used to determine which card is higher than another
   */
  constructor(rank, symbol, score) {
    this.rank = rank;
    this.symbol = symbol;
    this.score = score;
  }
}


/**
 * Deck class to store information about a deck
 *
 * Properties
 * - ranks[]: The different ranks that can be used by a card
 * - symbol[]: The different symbols that can be used by a card
 * - deck[]: An array of all cards
 *
 * Functions
 * - generateDeck(): Generates cards and pushes it into the deck array and assigns a score to the cards
 * - handOut(): Hands out a random card from the deck to a player
 */
class Deck {
  /**
   * Creates a deck of unique cards formed by all possible combinations of ranks and symbols
   * Declares and initializes the ranks and symbol arrays to all the possible ranks and symbols that a card can have
   */
  constructor() {
    this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    this.symbols = ["♦", "♣", "♥", "♠"];
    this.deck = this.generateDeck();
  }

  /**
   * Generates a deck of cards by looping through the ranks and symbols and created every possible combination possible
   *
   * @returns {Card[]} Returns an array of unique cards
   */
  generateDeck() {
    let newDeck = [];
    for (let i = 0; i < this.ranks.length; i++) {
      for (let symbol in this.symbols) {
        newDeck.push(new Card(this.ranks[i], this.symbols[symbol], i + 1))
      }
    }
    return newDeck;
  }

  /**
   * Hands out a random card to a player using a randomizer. 
   *
   * @params {Player} player The player to give a card to
   */
  handOut(player) {
    // Picks a random 
    player.deck.push(this.deck.splice(Math.floor((Math.random() * this.deck.length)), 1)[0]);
  }
}

/**
 * Player class to store the information about a player and to define the actions that a player can commit.
 * 
 * Properties:
 * - name: The name of the player
 * - deck[]: An array of the cards the player is holding
 *
 * Functions:
 * - constructor(): Initializes the instance of the player class
 * - draw(): Draws the top card of the player's deck and prints out the information about it
 * - warDraw(): Draws the top four cards of a player's decks and prints the information about the fourth card
 */
class Player {
  /**
   * Initializes an instance of the Player class
   * 
   * @param {string} name The name of the player
   */
  constructor(name) {
    // Setting the properties
    this.name = name;
    this.deck = [];
    this.drawnCard;
  }

  /**
   * Draws a card from the top of the player's deck array by using pop, and prints and returns the information about the card
   */
  draw() {
    // Get the card at the top
    this.drawnCard = this.deck.pop();
    this.drawCard(this.drawnCard.symbol, this.drawnCard.rank)
  }

  /**
   * Draws four cards from the top of the player's deck in the case of a war (two players draw a card with the same score)
   * Prints out the information about the last of the four cards and returns the four cards
   */
  warDraw() {
    // Storing the top 4 cards while shrinking the original players deck
    let cards = this.deck.splice(this.deck.length - 4);

    // Prints out information about the card
    this.drawCard(this.drawnCard.symbol, this.drawnCard.rank)
    return cards;
  }
  /**
   * Creates a visual of what he card looks like
   *
   * @param {string} dCS The symbol of the card
   * @param {string} dCR The rank of the card
   */
  drawCard(dCS, dCR) {
    console.log(`${this.name}'s card
  _____________
  |${dCS}         ${dCS}|
  |           |
  |           |
  |     ${dCR}     |
  |           |
  |           |
  |${dCS}         ${dCS}|
  -------------`);
  }
}

/**
 * Game class which stores all information and actions for starting and finishing a game
 * 
 * Properties:
 * - currentRound: The current round the game is on
 * - player1: The first player of the game
 * - player2: The second player of the game
 * - winner: The winner of the game
 * - loser: The loser of the game
 *
 * Functions:
 * - startGame(): Start the game and play until there is a winner.
 * - startRound(): Start a round and print out information about the winner.
 * - startWar(): Start a war between two players when they draw the same card. Pass in the cards to store them.
 * - getRoundWinner(): Return the winner and the loser of a round in an array.
 */
class Game {

  /**
   * Declare and initialize the properties of the Game class.
   *
   * @param {number} currentRound The current round the game is on
   * @param {Player} player1 The first player
   * @param {Player} player2 The second player
   */
  constructor(player1, player2) {
    // Set the game's properties
    this.currentRound = 1;
    this.player1 = player1;
    this.player2 = player2;
    this.winner;
    this.loser;
  }

  /**
   * Start the game and stop when there is a winner (Either a winner is declared or a player runs out of cards)
   */
  startGame() {

    /**
     * Condition for the game to keep going
     * Winner is not set or both players have cards.
     */
    while (this.winner === undefined && this.player1.deck.length > 0 && this.player2.deck.length > 0) {
      // Prints out information about a round and the player's state
      console.log("=====================================");
      console.log(`[Round #${this.currentRound}]:`)
      this.startRound();

      // Starting another round
      this.currentRound++;
    }

    // Game has ended now figure out why
    if (this.winner)
      console.log(`[WINNER] ${this.winner.name} has won the game!`)
    else if (this.player1.deck.length <= 0)
      console.log(`[WINNER] ${this.player2.name} has won the game!`)
    else if (this.player2.deck.length <= 0)
      console.log(`[WINNER] ${this.player1.name} has won the game!`)
    console.log("===================================");
    console.log("")
  }

  /**
   * Start a round by taking a card from each players hand and comparing them
   */
  startRound() {
    // Take a card from each players deck 
    let player1 = this.player1;
    let player2 = this.player2;

    player1.draw();
    player2.draw();

    // Store deck in variables for simplicity  
    let p1Deck = this.player1.deck;
    let p2Deck = this.player2.deck;

    // Condition to start a war  
    if (player1.drawnCard.score === player2.drawnCard.score) {
      console.log("WAR!")

      // Check if both players have enough cards to go into war  
      if (p1Deck.length >= 4 && p2Deck.length >= 4)
        this.startWar(player1.drawnCard, player2.drawnCard);
      else {

        // Figure out which player doesn't have enough cards and declare the winner  
        if (p1Deck.length < 4) {
          this.winner = player2;
          this.loser = player1;
        } else {
          this.winner = player1;
          this.loser = player2;
        }
        console.log(`${this.loser.name} did not have enough cards to start a war so he lost!`);

        // Add all the cards into the winner's deck
        this.winner.deck.unshift(...this.loser.deck, this.loser.drawnCard, this.winner.drawnCard);

        // Clear the loser's deck
        this.loser.deck = [];
      }
    }

    // Normal round. Figure out the winner, then give the winner the cards
    else {
      let roundWinner = this.getRoundWinner(player1.drawnCard, player2.drawnCard);
      console.log(`[Winner] ${roundWinner[0].name}`);
      roundWinner[0].deck.unshift(roundWinner[0].drawnCard, roundWinner[1].drawnCard);
    }

    // Print out the information about the players' decks  
    console.log("")
    console.log(`${player1.name} has ${player1.deck.length} cards left`)
    console.log(`${player2.name} has ${player2.deck.length} cards left`)
    console.log("")
  }

  /**
   * Start a war and pass the cards to the winning player
   * Figure out if a player also does not have enough cards
   */
  startWar() {

    // Get four cards from each players decks  
    let player1FourCards = this.player1.warDraw();
    let player2FourCards = this.player2.warDraw();

    // Store all card in a prize array  
    let prizeCards = [player1.drawnCard, player2.drawnCard, ...player1FourCards, ...player2FourCards]

    // Check if there is a winner to the war  
    while (this.winner === undefined && (player1FourCards[3].score === player2FourCards[3].score)) {
      console.log("ANOTHER WAR")

      // Check if both players have enough cards to start the war  
      if (this.player1.deck.length >= 4 && this.player2.deck.length >= 4) {
        player1FourCards = this.player1.warDraw();
        player2FourCards = this.player2.warDraw();
        prizeCards.push(...player1FourCards, ...player2FourCards);

        /**
         * If one of the players don't have enough cards then figure out the player.
         * Set the winner and loser
         */
      } else {
        if (this.player1.deck.length >= 4) {
          this.winner = this.player1;
          this.loser = this.player2;
        } else {
          this.winner = this.player2;
          this.loser = this.player1;
        }

        console.log(`${this.loser.name} didn't have enough cards and lost. All cards given to the winner!`)

        // Give the winner all the cards
        this.winner.deck.unshift(...this.loser.deck, ...prizeCards);

        // Erase the losers deck
        this.loser.deck = [];
      }
    }

    // If there is not a winner, get the player with the higher fourth card and add all the cards to their deck   
    if (!this.winner) {
      let roundWinner = this.getRoundWinner(player1FourCards[3], player2FourCards[3]);
      roundWinner[0].deck.unshift(...prizeCards);
    }
  }

  /**
   * Compare the card scores and return the winning player
   * 
   * @param {Card} card1 Player 1's card
   * @param {Card} card2 Player 2's card
   * @returns {[Player, Player]} The first index is the winning player. The second index is the losing player.
   */
  getRoundWinner(card1, card2) {
    let winningCard;

    // Compare the scores and return winner
    if (card1.score > card2.score)
      return [this.player1, this.player2];
    else
      return [this.player2, this.player1];
  }
}

// Create a deck
let deck = new Deck();

// Create the players
let player1 = new Player("Paul")
let player2 = new Player("AI_XII")

// Store the amount of times to pass out cards
let numberOfCards = deck.deck.length;

// Pass out cards to players
for (let i = 0; i < numberOfCards; i++) {
  if (i % 2 == 1)
    deck.handOut(player1)
  else
    deck.handOut(player2)
}
console.log(player1.deck)
console.log(player2.deck)
// Start the game between player1 and player2
let game = new Game(player1, player2)
game.startGame();
