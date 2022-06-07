class Card{
    constructor(rank, symbol, score)
    {
        this.rank = rank;
        this.symbol = symbol;
        this.score = score;
    }

    displayCard()
    {
        console.log(`CARD INFO: Rank: ${this.rank} | Symbol: ${this.symbol}`)
    }
}

class Deck{
    constructor()
    {
        this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        this.symbols = ["Diamonds", "Clubs", "Hearts", "Spades"];
        this.deck = this.generateDeck();
    }

    generateDeck()
    {
        let newDeck = [];
        for(let i = 0; i < this.ranks.length;i++)
        {
            for(let symbol in this.symbols)
            {
                newDeck.push(new Card(this.ranks[i], this.symbols[symbol], i + 1))
            }
        }
        return newDeck;
    }

    handOut(player)
    {
        let card = this.deck.splice(Math.floor((Math.random() * this.deck.length)), 1)[0]
        player.deck.push(card)
    }
}

class Player{
    constructor(name)
    {
        this.name = name;
        this.deck = [];
    }

    draw()
    {
        return deck.pop();
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
for(let i = 0; i < numberOfCards; i++)
{
    if(i % 2 == 1)
        deck.handOut(player1)
    else
        deck.handOut(player2)
}

console.log("Player 1's deck")
console.log(player1.deck)
console.log("Player 2's deck")
console.log(player2.deck)

// Have array of ranks

// Have array of symbols


while(player1.deck.length != 0 || player2.deck.length != 0)
{
    let player1Card = player1.draw();
    let player2Card = player2.draw();

    let player1Score = player1Card.score;
    let player2Score = player2Card.score;

    if(player1Score === player2Score)
        // War
    else if(player1Score > player2Score)
        // Add cards to player1
        player1.deck.push(player1Card)
    else   
        // Add cards to player2
        player2.deck.push(player2Card)
}
