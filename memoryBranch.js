    /**
 * MindPlay Game 1: Visual Memory Match
 * Assesses visuospatial working memory and short-term retention
 */
class MemoryMatchGame {
  constructor(containerId, onComplete) {
    this.container = document.getElementById(containerId);
    this.onComplete = onComplete;
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.flipsCount = 0;
    this.startTime = null;
    this.timerInterval = null;
    this.elapsedSeconds = 0;
    this.isLocked = false;
    
    // Familiar, culturally universal everyday items
    this.items = [
      { id: 'apple', icon: '🍎', en: 'Apple', ta: 'ஆப்பிள்' },
      { id: 'clock', icon: '⏰', en: 'Clock', ta: 'கடிகாரம்' },
      { id: 'sun', icon: '☀️', en: 'Sun', ta: 'சூரியன்' },
      { id: 'house', icon: '🏠', en: 'House', ta: 'வீடு' }
    ];
  }
  init() {
    this.matchedPairs = 0;
    this.flipsCount = 0;
    this.elapsedSeconds = 0;
    this.isLocked = false;
    this.flippedCards = [];
    clearInterval(this.timerInterval);
    // Create 4 pairs = 8 cards, shuffle them
    const deck = [...this.items, ...this.items].map((item, index) => ({
      ...item,
      uniqueId: index + '_' + item.id,
      isFlipped: false,
      isMatched: false
    }));
    // Shuffle deck
    this.cards = deck.sort(() => Math.random() - 0.5);
    this.render();
    this.startTimer();
  // Shuffle deck
    this.cards = deck.sort(() => Math.random() - 0.5);
    this.render();
    this.startTimer();
  }
  startTimer() {
    this.startTime = Date.now();
    const timeDisplay = document.getElementById('memory-time-val');
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      if (timeDisplay) {
        timeDisplay.textContent = `${this.elapsedSeconds}s`;
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timerInterval);
  }
  render() {
    if (!this.container) return;
    
    this.container.innerHTML = `
      <div class="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto my-4">
        ${this.cards.map(card => `
          <div 
            class="memory-card aspect-square rounded-2xl cursor-pointer flex items-center justify-center text-4xl sm:text-5xl select-none transition-all duration-300 transform shadow-md font-bold
              ${card.isMatched 
                ? 'bg-emerald-100 border-2 border-emerald-400 text-emerald-800 scale-95 opacity-90' 
                : card.isFlipped 
                  ? 'bg-white border-2 border-teal-500 shadow-lg scale-100' 
                  : 'bg-gradient-to-br from-teal-600 to-cyan-700 text-white hover:brightness-110 active:scale-95'}"
            data-id="${card.uniqueId}"
          >
      // Mismatch - flip back after brief pause
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
        this.flippedCards = [];
        this.isLocked = false;
        this.render();
      }, 900);
    }
  }
  updateStats() {
    const flipsDisplay = document.getElementById('memory-flips-val');
    const pairsDisplay = document.getElementById('memory-pairs-val');
    if (flipsDisplay) flipsDisplay.textContent = this.flipsCount;
    if (pairsDisplay) pairsDisplay.textContent = `${this.matchedPairs}/${this.items.length}`;
  }
  finishGame() {
    this.stopTimer();
    
    // Scoring logic:
    // Optimal flips for 4 pairs = 8 flips.
    // Optimal time = ~15-25 seconds.
    // Score calculation penalized for excessive flips and long search times.
    const excessFlips = Math.max(0, this.flipsCount - 8);
    const timePenalty = Math.max(0, Math.floor((this.elapsedSeconds - 20) / 2));
    const score = Math.max(25, Math.min(100, Math.round(100 - (excessFlips * 6) - (timePenalty * 3))));
    const results = {
      game: 'memoryMatch',
      flips: this.flipsCount,
      matchedPairs: this.matchedPairs,
      timeSeconds: this.elapsedSeconds,
      score: score
    };
    if (this.onComplete) {
      this.onComplete(results);
    }
  }
}
window.MemoryMatchGame = MemoryMatchGame;
