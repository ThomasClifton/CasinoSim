import Header from "../components/header.tsx";
import "/src/styles/_blackjack.css"
import React, { useState } from 'react';
import {useBalanceStore} from "../store/store.ts";

const Blackjack = () => {
    const balance = useBalanceStore((state) => state.balance);

    // Card Types
    type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
    type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
    type Card = {
        rank: Rank;
        suit: Suit;
        value: number;
    };

    // Deck functions
    function generateDeck(): Card[] {
        const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck: Card[] = [];

        for (const suit of suits) {
            for (const rank of ranks) {
                let value: number;
                if (rank === 'J' || rank === 'Q' || rank === 'K') {
                    value = 10;
                } else if (rank === 'A') {
                    value = 1; // TODO: Implement 1 or 11 logic
                } else {
                    value = parseInt(rank);
                }
                const card: Card = { rank, suit, value };
                deck.push(card);
            }
        }

        return deck;
    }

    function shuffleDeck(deck: Card[]): Card[] {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    // Game logic functions
    function dealInitialHands(deck: Card[], currentIndex: number): {
        dealerCards: Card[]
        playerCards: Card[];
        updatedIndex: number;
    } {
        const updatedIndex = currentIndex + 3;

        const dealerCards = deck.slice(updatedIndex -3, updatedIndex -1);
        const playerCards = deck.slice(updatedIndex - 1, updatedIndex + 1);

        return { dealerCards, playerCards, updatedIndex };
    }

    function revealDealerSecondCard(setDealerSecondCardHidden: React.Dispatch<React.SetStateAction<boolean>>): void {
        setDealerSecondCardHidden(false);
    }

    // Game Component
    function blackjackGame() {
        const [currentIndex, setCurrentIndex] = useState<number>(0);
        const [dealerHand, setDealerHand] = useState<Card[]>([]);
        const [playerHand, setPlayerHand] = useState<Card[]>([]);
        const [dealerSecondCardHidden, setDealerSecondCardHidden] = useState<boolean>(true);

        // Generate and shuffle a deck of cards
        const deck = generateDeck();
        const shuffledDeck = shuffleDeck(deck);

        const handleDealCards = () => {
            const { dealerCards, playerCards, updatedIndex } = dealInitialHands(shuffledDeck, currentIndex);

            setDealerHand(dealerCards);
            setPlayerHand(playerCards);
            setCurrentIndex(updatedIndex);
        }

        const handleHit = () => {
            // TODO: Implement hti logic
        }

        const handleStand = () => {
            // TODO: Implement stand logic
        }

        const revealDealerCard = () => {
            revealDealerSecondCard(setDealerSecondCardHidden);
        }

        return (
            <div>
                <div className="hands">
                    <div className="hand">
                        <h2>Dealer's Hand</h2>
                        {dealerHand.map((card, index) => (
                            <div key={index}>
                                {index === 1 && dealerSecondCardHidden ? 'Hidden' : `${card.rank} of ${card.suit}`}
                            </div>
                        ))}
                    </div>
                    <div className="hand">
                        <h2>Your Hand</h2>
                        {playerHand.map((card, index) => (
                            <div key={index}>
                                {`${card.rank} of ${card.suit}`}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={handleDealCards}>Deal Card</button>
                    <button onClick={handleHit}>Hit</button>
                    <button onClick={handleStand}>Stand</button>
                </div>
                <button onClick={revealDealerCard}>Reveal Card Test</button>
            </div>
        );
    }

    return (
        <><Header balance={balance}/>
            <h1>Blackjack</h1>
            {blackjackGame()}
        </>
    );
};

export default Blackjack;