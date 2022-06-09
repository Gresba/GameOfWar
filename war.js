/**
 * Card class to store informatiion about a part
 * 
 * Properties
 * - rank: The rank of the card (Ex. 2, 3, King, Ace)
 * - symbol: The symbol of the card (Ex. Spades, Clubs, Diamonds)
 * - score: The score which will be used to see if a card is high than another (Ex. 1, 4, 9, 13)
 *
 * Functions
 * - constuctor(): Initializes the card class with the information passed in as an argument*
*/

class Card {
  /**
   * Constructor of the Card class to initalize an instance of the Card object
   *
   * @params
   * - rank: A string to determine the rank of the card
   * - symbol: A symbol to determine the type of card
   * - score: A score which will be used to determine which card is higher than another
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
    this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
    this.symbols = ["Diamonds", "Clubs", "Hearts", "Spades"];
    this.deck = this.generateDeck();
  }

  /**
   * Generates a deck of cards by looping through the ranks and symbols and created every possible combination possible
   *
   * @returns
   * Returns an array of unique cards
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
   * @params
   * - player: The player to give a card to
   */
  handOut(player) {
    // Picks a random 
    player.deck.push(this.deck.splice(Math.floor((Math.random() * this.deck.length)), 1)[0])
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
   */
  constructor(name) {
    // Setting the properties
    this.name = name;
    this.deck = [];
  }

  /**
   * Draws a card from the top of the player's deck array by using pop, and prints and returns the information about the card
   */
  draw() {
    // Get the card at the top
    let card = this.deck.pop();

    // Show the card
    console.log(`${this.name} drew a ${card.rank} of ${card.symbol}`)
    return card;
  }

  /**
   * Draws four cards from the top of the player's deck in the case of a war (two players draw a card with the same score)
   * Prints out the information about the last of the four cards and returns the four cards
   */
  warDraw() {
    // Storing the top 4 cards while shrinking the original players deck
    let cards = this.deck.splice(this.deck.length - 4);

    // Prints out information about the card
    console.log(`${this.name}'s fourth card: ${cards[3].rank} of ${cards[3].symbol}`);
    return cards;
  }
}

/**
 * Game class which stores all information and actions for starting and finishing a game
 * 
 * Properties:
 * - player1: The first player of the game
 * - player2: The second player of the game
 * - winner: The winner of the game
 *
 * Functions:
 * - startGame(): Start the game and play until there is a winner
 * - startRound(): Start a round and print out information about the winner
 * - startWar(): Start a war between two players when they draw the same card. Pass in the cards to store them.
 */
class Game {
  /**
   * Declare and initialize the properties of the Game class
   *
   * @params
   * - player1: The first player
   * - player2: The second player
   */
  constructor(player1, player2) {
    // Set the players
    this.player1 = player1;
    this.player2 = player2;
    this.winner;
  }

  /**
   * Start the game and stop when there is a winner (Either a winner is declared or a player runs out of cards)
   */
  startGame() {
    // Counter to indicate the round number
    let roundNumber = 1;

    // Condition for the game to keep going
    while (this.winner === undefined && this.player1.deck.length > 0 && this.player2.deck.length > 0) {
      // Prints out information about a round and the player's state
      console.log("----------------------------------------")
      console.log(`Round Number: ${roundNumber}`)
      console.log(`Player 1 Deck Length: ${this.player1.deck.length}`)
      console.log(`Player 2 Deck Length: ${this.player2.deck.length}`)
      this.startRound();
      roundNumber++;
    }

    // Game has ended now figure out why
    if (this.winner) {
      console.log(`${this.winner.name} has won the game!`)
    }
    else if (this.player1.deck.length <= 0)
      console.log(`${this.player2.name} has won the game!`)
    else if (this.player2.deck.length <= 0)
      console.log(`${this.player1.name} has won the game!`)
    console.log("-------------------------------------")
    console.log("")
  }

  /**
   * Start a round by taking a card from each players hand and comparing it
   */
  startRound() {
    // Take a card from each players deck  
    let p1Card = this.player1.draw();
    let p2Card = this.player2.draw();

    // Store deck in variables for simplicity  
    let p1Deck = this.player1.deck;
    let p2Deck = this.player2.deck;

    // Condition to start a war  
    if (p1Card.score === p2Card.score) {
      console.log("WAR!")

      // Check if both players have enough cards to go into war  
      if (p1Deck.length >= 4 && p2Deck.length >= 4)
        this.startWar(p1Card, p2Card)
      else {
        
        // Figure out which player doesn't have enough cards and declare the winner  
        if (p1Deck.length < 4) {
          console.log(`${this.player1.name} did not have enough cards to start a war so he lost!`)
          this.player2.deck = [...this.player1.deck, p1Card, p2Card, ...this.player2.deck]
          this.winner = this.player2;
          this.player1.deck = []
        } else {
          console.log(`${this.player2.name} did not have enough cards to start a war so he lost!`)
          this.winner = this.player1
          this.player1.deck = [...this.player2.deck, p2Card, p1Card, ...this.player1.deck]
          this.player2.deck = []
        }
      }
    }

    // Normal round. Figure out the winner, then give the winner the cards
    else {
        let roundWinner = this.getRoundWinner(p1Card, p2Card);
        console.log(`Winner: ${roundWinner.name}`);
        roundWinner.deck.unshift(p2Card, p1Card);
    }

    // Print out the information about the players' decks  
    console.log("")
    console.log(`${this.player1.name} has ${this.player1.deck.length} cards left`)
    console.log(`${this.player2.name} has ${this.player2.deck.length} cards left`)
    console.log("---------------------------------------")
    console.log("")
  }

  /**
   * Start a war and pass the cards to the winning player
   * Figure out if a player also does not have enough cards
   *
   * @params
   * - card1: Player 1's original card
   * - card2: Player 2's original card
   */
  startWar(card1, card2) {
    
    // Get four cards from each players decks  
    let player1FourCards = this.player1.warDraw();
    let player2FourCards = this.player2.warDraw();

    // Store all card in a prize array  
    let prizeCards = [card1, card2, ...player1FourCards, ...player2FourCards]

    // Check if there is a winner to the war  
    while (this.winner === undefined && (player1FourCards[3].score === player2FourCards[3].score)) {
      console.log("ANOTHER WAR")
      
      // Check if both players have enough cards to start the war  
      if (this.player1.deck.length >= 4 && this.player2.deck.length >= 4) {
        player1FourCards = this.player1.warDraw();
        player2FourCards = this.player2.warDraw();
        prizeCards = [...prizeCards, ...player1FourCards, ...player2FourCards]

      /**
       * If one of the players don't have enough cards then figure out which player.    
       * Give the winner all the cards in the game.
       * Clear the losing player's deck.
       */
      } else {
        if (this.player1.length >= 4) {
          console.log(`${this.player2.name} didn't have enough cards and lost. All cards have been given to the other player`)
          this.winner = this.player1
          this.player1.deck = [...this.player2.deck, ...prizeCards, ...this.player1.deck]
          this.player2.deck = [];
        }
        else {
          console.log(`${this.player1.name} didn't have enough cards and last. All cards have been given to the other player`)
          this.winner = this.player1
          this.player2.deck = [...this.player1.deck, ...prizeCards, ...this.player2.deck]
          this.player1.deck = [];
        }
      }
    }
   
    // Get the player with the higher fourth card and add all the cards to their deck   
    let roundWinner = getRoundWinner(player1FourCards[3], player2FourCards[3]);
    roundWinner.deck = [...prizeCards, ...roundWinner.deck];  
  }

  /**
   * Compare the card scores and return the winning player
   * 
   * @params
   * - card1: Player 1's card
   * - card2: Player 2's card
   * 
   * @returns
   * The round winning player
   */
  getRoundWinner(card1, card2)
  {
      let winningCard;
      
      // Compare the scores and return winner
      if(card1.score > card2.score)
          return this.player1;
      else
          return this.player2;
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

// Start the game between player1 and player2
let game = new Game(player1, player2)
game.startGame();
