import Header from "../components/header.tsx";
import "/src/styles/_blackjack.css"
import {useState} from 'react';
import {useBalanceStore} from "../store/store.ts";
import {Slider} from "@mantine/core";
import deal from "../assets/Music/pounding-cards-on-table-99355.mp3";
import flip from "../assets/Music/cardsound32562-37691.mp3";

const Blackjack = () => {
    // Betting stuff
    const balance = useBalanceStore((state) => state.balance);

    const [value, setValue] = useState(55);

    const addMoney = useBalanceStore((state) => state.addMoney);
    const loseMoney = useBalanceStore((state) => state.loseMoney);

    // Sound Players
    var dealSoundPlayer = new Audio(deal);
    var flipSoundPlayer = new Audio(flip);

    // Card Types
    type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
    type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
    type Card = {
        rank: Rank;
        suit: Suit;
        value: number;
    };

    // File paths
    const xmlFilePath = './src/assets/Cards/playingCards.xml';
    const spriteSheetPath = './src/assets/Cards/playingCards.png';

    // Card graphics
    type CardImageProperties = {
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
    }

    async function loadXML(filepath: string) {
        const response = await fetch(filepath);
        const xmlText = await response.text();
        const parser = new DOMParser();
        return parser.parseFromString(xmlText, "text/xml");
    }

    async function parseXML(filepath: string): Promise<Record<string, CardImageProperties>> {
        const doc = await loadXML(filepath);
        const root = doc.documentElement;

        const cardImages: Record<string, CardImageProperties> = {};
        const subTextures = root.getElementsByTagName("SubTexture");

        for (let i = 0; i < subTextures.length; i++) {
            const subTexture = subTextures[i];
            const name = subTexture.getAttribute("name");
            const x = parseInt(subTexture.getAttribute("x") || "0");
            const y = parseInt(subTexture.getAttribute("y") || "0");
            const width = parseInt(subTexture.getAttribute("width") || "0");
            const height = parseInt(subTexture.getAttribute("height") || "0");

            if (name) {
                cardImages[name] = {
                    name,
                    x,
                    y,
                    width,
                    height,
                };
            }
        }

        return cardImages;
    }

    async function fetchCardData() {
        try {
            return await parseXML(xmlFilePath);
        } catch (error) {
            console.error('Error fetching card data: ', error);
            throw error;
        }
    }



    // Deck functions
    function generateDeck() {
        const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck: Card[] = [];

        for (const suit of suits) {
            for (const rank of ranks) {
                let value: number;
                if (rank === 'J' || rank === 'Q' || rank === 'K') {
                    value = 10;
                } else if (rank === 'A') {
                    value = 11;
                } else {
                    value = parseInt(rank);
                }
                const card: Card = {
                    rank,
                    suit,
                    value,
                };

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

        dealSoundPlayer.play();
        dealSoundPlayer.currentTime = 0;

        return { dealerCards, playerCards, updatedIndex };
    }

    function calculateHandTotal(hand: Card[]): number {
        let total = 0;
        let aceCount = 0;

        hand.forEach((card) => {
            total += card.value;
            if (card.rank === 'A') {
                aceCount++;
            }
        });

        // Adjust for aces
        while (total > 21 && aceCount > 0) {
            total -= 10; // Use Ace as 1 instead of 11
            aceCount--;
        }

        return total;
    }

    // Game Component
    function blackjackGame() {
        // Game states
        const [currentIndex, setCurrentIndex] = useState<number>(0);
        const [dealerHand, setDealerHand] = useState<Card[]>([]);
        const [playerHand, setPlayerHand] = useState<Card[]>([]);

        // Button states
        const [isDealButtonDisabled, setIsDealButtonDisabled] = useState(false);
        const [isHitButtonDisabled, setIsHitButtonDisabled] = useState(true);
        const [isStandButtonDisabled, setIsStandButtonDisabled] = useState(true);
        const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(true);

        // Game Message
        const [message, setMessage] = useState(``);

        // Slider state
        const [isDisabled, setIsDisabled] = useState(false);

        // Generate and shuffle a deck of cards
        const deck = generateDeck();
        const shuffledDeck = shuffleDeck(deck);

        // Playing card data
        let cardData: Record<string, CardImageProperties>;

        (async function() {
            try {
                cardData = await fetchCardData();
            } catch (error) {
                console.error('Error initializing card data: ', error);
            }
        })();

        // Game logic stuff
        const handleDealCards = () => {
            setIsDealButtonDisabled(true); // Disable deal button
            setIsDisabled(true); // Disables slider to lock in bet

            // Lock in bet
            loseMoney(value);

            const { dealerCards, playerCards, updatedIndex } = dealInitialHands(shuffledDeck, currentIndex);

            setDealerHand(dealerCards);
            setPlayerHand(playerCards);
            setCurrentIndex(updatedIndex);

            // Render cards
            renderDeck(dealerCards, cardData, true, true);
            renderDeck(playerCards, cardData, false, false);

            // Disable hit button if player total is 21
            if (calculateHandTotal(playerCards) === 21) {
                setIsStandButtonDisabled(false); // Enable stand button
            } else {
                setIsHitButtonDisabled(false); // Enables hit button
                setIsStandButtonDisabled(false); // Enables hit button
            }
        }

        const handleHit = () => {
            const newCard = shuffledDeck[currentIndex];
            const tempHand = [...playerHand, newCard];

            setCurrentIndex(currentIndex + 1);
            setPlayerHand(tempHand);
            renderDeck(tempHand, cardData, false, false);

            // Sound for hit
            flipSoundPlayer.play();
            flipSoundPlayer.currentTime = 0;

            const playerTotal = calculateHandTotal(tempHand);
            if (playerTotal === 21) {
                setIsHitButtonDisabled(true); // Disable hit button
            } else if (playerTotal > 21) {
                setIsHitButtonDisabled(true); // Disable hit button
                setIsStandButtonDisabled(true); // Disable stand button
                setIsResetButtonDisabled(false); // Enables reset button
                setMessage(`Bust! You lost $${value}!`);
            }
        }

        const handleStand = async () => {
            setIsStandButtonDisabled(true); // Disable stand button
            setIsHitButtonDisabled(true); // Disable hit button
            renderDeck(dealerHand, cardData, true, false); // Unhide card

            let dealerTotal = calculateHandTotal(dealerHand);
            let playerTotal = calculateHandTotal(playerHand);
            let index = currentIndex;
            let tempHand = dealerHand;

            while (dealerTotal < 17) {
                let newCard = shuffledDeck[index];
                tempHand = [...tempHand, newCard];
                index++;

                dealerTotal = calculateHandTotal(tempHand);

                flipSoundPlayer.play();
                flipSoundPlayer.currentTime = 0;

                await new Promise((resolve) => setTimeout(resolve, 600));

                setDealerHand(tempHand);
                renderDeck(tempHand, cardData, true, false);
            }

            setCurrentIndex(index);

            // Determine who won
            if (dealerTotal > 21) {
                setIsResetButtonDisabled(false); // Enables reset button
                setMessage(`You win $${value}!`);
                addMoney(value * 2);
            } else if (dealerTotal === playerTotal) {
                setIsResetButtonDisabled(false); // Enables reset button
                setMessage('Push! Your bet will be returned.');
                addMoney(value);
            } else if (dealerTotal > playerTotal) {
                setIsResetButtonDisabled(false); // Enables reset button
                setMessage(`You lost $${value}!`);
            } else {
                setIsResetButtonDisabled(false); // Enables reset button
                setMessage(`You win $${value}!`);
                addMoney(value * 2);
            }
        }

        function renderCardInHand(cardImage: CardImageProperties,
                                  deckElement: HTMLDivElement,
                                  length: number,
                                  needsHiding: boolean) {
            const cardImageElement = document.createElement('img');

            if (!spriteSheetPath) {
                console.error('Sprite sheet path is not set.');
                return;
            }
            cardImageElement.src = spriteSheetPath;



            // Get dimensions of card
            cardImageElement.style.width = `${cardImage.width}px`;
            cardImageElement.style.height = `${cardImage.height}px`;

            // Change how the image is displayed on screen
            cardImageElement.style.objectFit = 'none';
            cardImageElement.style.objectPosition = `${-cardImage.x}px ${-cardImage.y}px`;

            // Position the image element within the parent container
            const cardSpacing = 10;
            cardImageElement.style.position = 'none';
            cardImageElement.style.left = `${length * (cardImage.width + cardSpacing)}px`;
            cardImageElement.style.top = `0px`;

            if (needsHiding) {
                cardImageElement.src = `https://tekeye.uk/playing_cards/images/svg_playing_cards/backs/png_96_dpi/red2.png`;
                cardImageElement.style.objectFit = '';
                cardImageElement.style.objectPosition = '';
            }

            deckElement.appendChild(cardImageElement);
        }

        function renderDeck(deck: Card[],
                            cardData: Record<string, CardImageProperties>,
                            isDealer: boolean,
                            isFirstDeal: boolean){
            const deckElement = isDealer
                ? document.querySelector('.dealer-deck') as HTMLDivElement
                : document.querySelector('.player-deck') as HTMLDivElement;

            // Clear previous deck
            deckElement.innerHTML = '';

            if (isDealer && isFirstDeal) {
                // Render normal card
                const normalCard = deck[0];

                const cardName = `card${normalCard.suit}${normalCard.rank}.png`;
                const cardImage = cardData[cardName];

                if (cardImage) {
                    console.log('Rendering: ',cardName);
                    renderCardInHand(cardImage, deckElement, deck.length, false);
                } else {
                    console.error(`No image data found for card ${cardName}`);
                }

                // Render hidden card
                const hiddenCard = deck[1];

                const hiddenCardName = `card${hiddenCard.suit}${hiddenCard.rank}.png`;
                const hiddenCardImage = cardData[hiddenCardName];

                if (hiddenCardImage) {
                    console.log('Rendering hidden: ',hiddenCardName);
                    renderCardInHand(hiddenCardImage, deckElement, deck.length, true);
                } else {
                    console.error(`No image data found for card ${hiddenCardName}`);
                }
            } else {
                deck.forEach((card) => {
                    const cardName = `card${card.suit}${card.rank}.png`;
                    const cardImage = cardData[cardName];

                    if (cardImage) {
                        console.log('Rendering: ',cardName);
                        renderCardInHand(cardImage, deckElement, deck.length, false);
                    } else {
                        console.error(`No image data found for card ${cardName}`);
                    }
                });
            }
        }

        const resetGame = () => {
            // Reset states
            setCurrentIndex(0);
            setDealerHand([]);
            setPlayerHand([]);
            setIsDealButtonDisabled(false);
            setIsHitButtonDisabled(true);
            setIsStandButtonDisabled(true);
            setIsResetButtonDisabled(true);
            setMessage(``);
            setIsDisabled(false);

            // Reset playing card display
            let dealerDeckElement = document.querySelector('.dealer-deck') as HTMLDivElement;
            let playerDeckElement = document.querySelector('.player-deck') as HTMLDivElement;
            dealerDeckElement.innerHTML = '';
            playerDeckElement.innerHTML = '';
        }

        return (
            <div className="blackjack-container">
                <div className="hands">
                    <div className="hand">
                        <h2>Dealer's Hand</h2>
                        <div className="dealer-deck"></div>
                        {/*{dealerHand.map((card, index) => (*/}
                        {/*    <div key={index}>*/}
                        {/*        {index === 1 && dealerSecondCardHidden ? 'Hidden' : `${card.rank} of ${card.suit}`}*/}
                        {/*    </div>*/}
                        {/*))}*/}
                    </div>
                    <div className="hand">
                        <h2>Your Hand</h2>
                        <div className="player-deck"></div>
                        {/*{playerHand.map((card, index) => (*/}
                        {/*    <div key={index}>*/}
                        {/*        {`${card.rank} of ${card.suit}`}*/}
                        {/*    </div>*/}
                        {/*))}*/}
                    </div>
                </div>
                <div className="game-message">
                    {message}
                </div>
                <div className="buttons">
                    <button disabled={isDealButtonDisabled} onClick={handleDealCards}>Deal Cards</button>
                    <button disabled={isHitButtonDisabled} onClick={handleHit}>Hit</button>
                    <button disabled={isStandButtonDisabled} onClick={handleStand}>Stand</button>
                </div>
                <button disabled={isResetButtonDisabled} onClick={resetGame}>Reset</button>
                <div className="slider-container">
                    <Slider
                        value={value}
                        onChange={setValue}
                        disabled={isDisabled}
                        min={10}
                        max={100}
                        color="rgba(60, 76, 83, 1"
                        marks={[
                            { value: 10, label: '10' },
                            { value: 100, label: '100' },
                        ]}
                    />
                </div>
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