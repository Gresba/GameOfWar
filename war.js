class Card{
    constructor(rank, symbol, score)
    {
        this.rank = rank;
        this.symbol = symbol;
        this.score = score;
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
        let card = deck.pop()
        console.log(`${this.name} drew a ${card.rank} of ${card.symbol}`) 
        return card;
    }

    warDraw()
    {
        let cards = this.deck.splice(this.deck.length - 4);
        console.log(`${this.name}'s fourth card: ${card.rank} of ${card.symbol}`);
        return cards;
    }
}

class Game
{
    constructor(player1, player2)
    {
        this.player1 = player1;
        this.player2 = player2;
    }

    startGame()
    {
        while(this.player1.deck.length > 0 || this.player2.deck.length > 0)
        {
            this.startRound();
        }
        if(this.player1.deck.length <= 0)
            console.log(`${this.player1.name} has won the game!`)
        else
            console.log(`${this.player2.name} has won the game!`)

    }

    startRound()
    {
        let p1Card = this.player1.draw();
        let p2Card = this.player2.draw();
        
        if(p1Card.score === p2Card.score)
        {
            console.log("WAR!")
            this.startWar()
        }
        else if(p1Card.score > p2Card.score)
        {
            console.log(`Winner: ${this.player1.name} Card Played: ${p1Card.rank} | ${p1Card.symbol}`)
            this.p1.deck.push(p1Card, p2Card)
        }else{
            console.log(`Winner: ${this.player2.name} Card Played: ${p2Card.rank} | ${p2Card.symbol}`)
            this.p2.deck.push(p2Card, p1Card)
        }
    }

    startWar()
    {
        let player1FourCards = this.player1.warDraw();
        let player2FourCards = this.player2.warDraw();
        let prizeCards = [...player1FourCards, ...player2FourCards]

        while(player1FourCards[3].score === player2FourCards[3].score)
        {
            player1FourCards = this.player1.warDraw();
            player2FourCards = this.player2.warDraw();
            prizeCards.push(...player1FourCards, ...player2FourCards)
        }

        if(player1FourCards[3].score > player2FourCards[3].score)
        {
            player1.deck.push(prizeCards)
        }else{
            player2.deck.push(prizeCards)
        }
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
