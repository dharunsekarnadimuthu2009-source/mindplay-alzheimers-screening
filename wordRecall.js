/**
 * MindPlay Game 3: Semantic Word & Category Recall (Mini-Cog Protocol)
 * Tests verbal delayed retrieval and recognition memory
 */

class WordRecallGame {
  constructor(containerId, onComplete) {
    this.container = document.getElementById(containerId);
    this.onComplete = onComplete;
    this.selectedIds = new Set();
    this.startTime = null;
    
    // Target items (Standard Mini-Cog tri-word protocol)
    this.targetIds = ['apple', 'table', 'penny'];

    // Mixed pool with distractors
    this.pool = [
      { id: 'apple', icon: '🍎', en: 'Apple', ta: 'ஆப்பிள்', isTarget: true },
      { id: 'banana', icon: '🍌', en: 'Banana', ta: 'வாழைப்பழம்', isTarget: false },
      { id: 'table', icon: '🪑', en: 'Table', ta: 'மேஜை', isTarget: true },
      { id: 'chair', icon: '🛋️', en: 'Sofa', ta: 'நாற்காலி', isTarget: false },
      { id: 'penny', icon: '🪙', en: 'Penny (Coin)', ta: 'நாணயம்', isTarget: true },
      { id: 'watch', icon: '⌚', en: 'Watch', ta: 'கைக் கடிகாரம்', isTarget: false },
      { id: 'book', icon: '📖', en: 'Book', ta: 'புத்தகம்', isTarget: false },
      { id: 'car', icon: '🚗', en: 'Car', ta: 'கார்', isTarget: false },
      { id: 'tree', icon: '🌳', en: 'Tree', ta: 'மரம்', isTarget: false }
    ];
  }

  init() {
    this.selectedIds.clear();
    this.startTime = Date.now();
    // Shuffle the items
    this.shuffledPool = [...this.pool].sort(() => Math.random() - 0.5);
    this.render();
  }

  render() {
    if (!this.container) return;

    const lang = window.I18N ? window.I18N.currentLang : 'en';

    this.container.innerHTML = `
      <div class="max-w-md mx-auto my-3">
        <p class="text-sm sm:text-base text-slate-600 font-medium text-center mb-3">
          ${lang === 'ta' 
            ? 'சோதனையின் தொடக்கத்தில் நினைவில் வைக்கச் சொல்லப்பட்ட 3 சொற்களைத் தேர்ந்தெடுக்கவும்:' 
            : 'Select the 3 specific items you were introduced to at the start:'}
        </p>

        <div class="grid grid-cols-3 gap-2 sm:gap-3">
          ${this.shuffledPool.map(item => {
            const isSelected = this.selectedIds.has(item.id);
            return `
              <button
                type="button"
                class="word-choice-card aspect-square rounded-xl p-2 flex flex-col items-center justify-center border-2 transition-all duration-200 cursor-pointer shadow-sm
                  ${isSelected 
                    ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-400 font-bold scale-98 text-teal-900' 
                    : 'bg-white border-slate-200 hover:border-teal-300 text-slate-700 hover:shadow-md'}"
                data-id="${item.id}"
              >
                <span class="text-3xl mb-1">${item.icon}</span>
                <span class="text-xs sm:text-sm font-semibold text-center leading-tight">
                  ${lang === 'ta' ? item.ta : item.en}
                </span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="mt-4 flex items-center justify-between px-2">
          <span class="text-sm font-medium text-slate-600">
            ${lang === 'ta' ? 'தேர்ந்தெடுக்கப்பட்டவை:' : 'Selected:'} 
            <strong class="text-teal-700">${this.selectedIds.size} / 3</strong>
          </span>

          <button
            id="btn-confirm-word-recall"
            type="button"
            class="px-4 py-2 rounded-xl font-bold text-white transition-all shadow-md
              ${this.selectedIds.size === 3 
                ? 'bg-teal-600 hover:bg-teal-700 cursor-pointer scale-100' 
                : 'bg-slate-300 cursor-not-allowed opacity-60'}"
            ${this.selectedIds.size !== 3 ? 'disabled' : ''}
          >
            ${lang === 'ta' ? 'உறுதி செய் ✓' : 'Confirm Choices ✓'}
          </button>
        </div>
      </div>
    `;

    // Event listeners
    this.container.querySelectorAll('.word-choice-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.toggleSelection(id);
      });
    });

    const confirmBtn = document.getElementById('btn-confirm-word-recall');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (this.selectedIds.size === 3) {
          this.evaluate();
        }
      });
    }
  }

  toggleSelection(id) {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      if (this.selectedIds.size < 3) {
        this.selectedIds.add(id);
      }
    }
    this.render();
  }

  evaluate() {
    const elapsedSeconds = Math.round((Date.now() - this.startTime) / 1000);
    let correctCount = 0;
    this.selectedIds.forEach(id => {
      if (this.targetIds.includes(id)) {
        correctCount++;
      }
    });

    // Score calculation:
    // 3 correct = 100
    // 2 correct = 70
    // 1 correct = 40
    // 0 correct = 20
    let score = 20;
    if (correctCount === 3) score = 100;
    else if (correctCount === 2) score = 70;
    else if (correctCount === 1) score = 40;

    const results = {
      game: 'wordRecall',
      correctCount: correctCount,
      totalTargets: 3,
      timeSeconds: elapsedSeconds,
      score: score
    };

    if (this.onComplete) {
      this.onComplete(results);
    }
  }
}

window.WordRecallGame = WordRecallGame;
