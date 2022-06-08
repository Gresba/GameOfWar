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
        let card = this.deck.pop();
        console.log(card)
        console.log(`${this.name} drew a ${card.rank} of ${card.symbol}`) 
        return card;
    }

    warDraw()
    {
        let cards = this.deck.splice(this.deck.length - 4);
        console.log(cards)
        console.log(`${this.name}'s fourth card: ${cards[3].rank} of ${cards[3].symbol}`);
        return cards;
    }
}

class Game
{
    constructor(player1, player2)
    {
        this.player1 = player1;
        this.player2 = player2;
        this.winner;
    }

    /**
    Start the game
    */
    startGame()
    {
        let roundNumber = 1;
        while(this.winner === undefined && this.player1.deck.length > 0 && this.player2.deck.length > 0)
        {
            console.log("----------------------------------------")
            console.log(`Round Number: ${roundNumber}`)
            console.log(`Player 1 Deck Length: ${this.player1.deck.length}`)
            console.log(`Player 2 Deck Length: ${this.player2.deck.length}`)
            this.startRound();
            roundNumber++;
        }
        if(this.winner !== undefined)
            console.log(`${this.winner.name} has won the game!`)    
        else if(this.player1.deck.length <= 0)
            console.log(`${this.player1.name} has won the game!`)
        else if(this.player2.deck.length <=0)
            console.log(`${this.player2.name} has won the game!`)
        console.log("-------------------------------------")
        console.log("")
    }

    startRound()
    {
        let p1Card = this.player1.draw();
        let p2Card = this.player2.draw();
        
        let p1Deck = this.player1.deck;
        let p2Deck = this.player2.deck;

        if(p1Card.score === p2Card.score)
        {
            console.log("WAR!")
            if(p1Deck.length >= 4 && p2Deck.length >= 4)
                this.startWar(p1Card, p2Card)
            else{
                if(p1Deck.length < 4)
                    this.winner = this.player2;
                else
                    this.winner = this.player1
            }
        }
        else if(p1Card.score > p2Card.score)
        {
            console.log(`Winner: ${this.player1.name} Card Played: ${p1Card.rank} | ${p1Card.symbol}`)
            p1Deck.unshift(p1Card, p2Card)
        }else{
            console.log(`Winner: ${this.player2.name} Card Played: ${p2Card.rank} | ${p2Card.symbol}`)
            p2Deck.unshift(p2Card, p1Card)
        }
        console.log("---------------------------------------")
        console.log("")
    }

    startWar(card1, card2)
    {
        let player1FourCards = this.player1.warDraw();
        let player2FourCards = this.player2.warDraw();
        let prizeCards = [card1, card2, ...player1FourCards, ...player2FourCards]
        console.log("Prize Cards:")
        console.log(prizeCards)
        while(this.winner === undefined && (player1FourCards[3].score === player2FourCards[3].score))
        {
            if(this.player1.length >= 4 && this.player2.length >= 4)
            {
                console.log(`Prize Cards: ${prizeCards}`)
                player1FourCards = this.player1.warDraw();
                player2FourCards = this.player2.warDraw();
                console.log(player1FourCards)
                console.log(player2FourCards)
                prizeCards = [...prizeCards, ...player1FourCards, ...player2FourCards]
            }else{
                if(this.player1.length >= 4)
                    this.winner = this.player1
                else
                    this.winner = this.player2
            }
        }

        if(this.winner === undefined)
        {
            if(player1FourCards[3].score > player2FourCards[3].score)
            {
                this.player1.deck = [...prizeCards, ...this.player1.deck]
                console.log("Player 1 Deck:")
                console.log(this.player1.deck)
            }else{
                this.player2.deck = [...prizeCards,...this.player2.deck]
                console.log("Player 2 Deck:")
                console.log(this.player2.deck)
            }
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

let game = new Game(player1, player2)
game.startGame();
