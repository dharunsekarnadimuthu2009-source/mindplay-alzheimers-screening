/**
 * MindPlay Game 2: Executive Trail-Making Test (TMT)
 * Evaluates cognitive flexibility, scanning attention, and psychomotor speed
 */

class TrailMakingGame {
  constructor(canvasContainerId, onComplete) {
    this.container = document.getElementById(canvasContainerId);
    this.onComplete = onComplete;
    this.nodes = [];
    this.currentNodeIndex = 0;
    this.errorsCount = 0;
    this.startTime = null;
    this.timerInterval = null;
    this.elapsedSeconds = 0;
    this.tapLatencies = [];
    this.lastTapTime = null;
    this.totalNodes = 8;
  }

  init() {
    this.currentNodeIndex = 0;
    this.errorsCount = 0;
    this.elapsedSeconds = 0;
    this.tapLatencies = [];
    this.lastTapTime = null;
    clearInterval(this.timerInterval);

    this.generateNodePositions();
    this.render();
    this.startTimer();
  }

  generateNodePositions() {
    // Generate 8 well-spaced node coordinates (percentage-based for responsive canvas)
    // Avoid overlap by using predefined distributed regions with small jitter
    const slots = [
      { x: 18, y: 22 },
      { x: 50, y: 18 },
      { x: 82, y: 26 },
      { x: 78, y: 62 },
      { x: 48, y: 50 },
      { x: 22, y: 70 },
      { x: 55, y: 82 },
      { x: 84, y: 88 }
    ];

    this.nodes = slots.map((pos, i) => ({
      number: i + 1,
      x: pos.x,
      y: pos.y,
      isCompleted: false,
      isTarget: i === 0
    }));
  }

  startTimer() {
    this.startTime = Date.now();
    this.lastTapTime = this.startTime;
    const timeDisplay = document.getElementById('trail-time-val');
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

    // SVG container for connecting lines + nodes
    const linesSvg = this.nodes
      .filter((n, idx) => idx < this.currentNodeIndex)
      .map((n, idx) => {
        if (idx === 0) return '';
        const prev = this.nodes[idx - 1];
        return `<line x1="${prev.x}%" y1="${prev.y}%" x2="${n.x}%" y2="${n.y}%" stroke="#0d9488" stroke-width="4" stroke-dasharray="2 2" class="trail-line" />`;
      })
      .join('');

    this.container.innerHTML = `
      <div class="relative w-full h-80 sm:h-96 bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden shadow-inner my-3 select-none">
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          ${linesSvg}
        </svg>

        ${this.nodes.map(node => {
          let nodeClass = 'bg-white border-2 border-slate-400 text-slate-700 hover:scale-105 active:scale-95';
          if (node.isCompleted) {
            nodeClass = 'bg-teal-600 border-2 border-teal-700 text-white font-bold scale-95 shadow-sm';
          } else if (node.isTarget) {
            nodeClass = 'bg-amber-100 border-3 border-amber-500 text-amber-900 font-extrabold animate-pulse shadow-md scale-110';
          }

          return `
            <button 
              type="button"
              class="trail-node absolute w-12 h-12 sm:w-14 sm:h-14 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold shadow-md transition-all duration-200 cursor-pointer ${nodeClass}"
              style="left: ${node.x}%; top: ${node.y}%;"
              data-number="${node.number}"
            >
              ${node.number}
            </button>
          `;
        }).join('')}
      </div>
    `;

    // Attach click events
    this.container.querySelectorAll('.trail-node').forEach(nodeEl => {
      nodeEl.addEventListener('click', (e) => {
        const num = parseInt(nodeEl.getAttribute('data-number'), 10);
        this.handleNodeClick(num);
      });
    });

    this.updateStats();
  }

  handleNodeClick(number) {
    const expected = this.currentNodeIndex + 1;
    const now = Date.now();
    const latency = (now - this.lastTapTime) / 1000;
    this.lastTapTime = now;

    if (number === expected) {
      // Correct node tapped
      this.tapLatencies.push(latency);
      this.nodes[this.currentNodeIndex].isCompleted = true;
      this.nodes[this.currentNodeIndex].isTarget = false;
      this.currentNodeIndex++;

      if (this.currentNodeIndex < this.nodes.length) {
        this.nodes[this.currentNodeIndex].isTarget = true;
        this.render();
      } else {
        // Complete!
        this.render();
        this.finishGame();
      }
    } else {
      // Mistake
      this.errorsCount++;
      const nodeEl = this.container.querySelector(`[data-number="${number}"]`);
      if (nodeEl) {
        nodeEl.classList.add('bg-rose-100', 'border-rose-500', 'text-rose-700', 'animate-shake');
        setTimeout(() => {
          this.render();
        }, 500);
      }
      this.updateStats();
    }
  }

  updateStats() {
    const targetDisplay = document.getElementById('trail-target-val');
    const errorsDisplay = document.getElementById('trail-errors-val');
    if (targetDisplay) {
      targetDisplay.textContent = this.currentNodeIndex < this.totalNodes 
        ? (this.currentNodeIndex + 1) 
        : 'Done!';
    }
    if (errorsDisplay) errorsDisplay.textContent = this.errorsCount;
  }

  finishGame() {
    this.stopTimer();

    // Average latency
    const avgLatency = this.tapLatencies.length 
      ? this.tapLatencies.reduce((a, b) => a + b, 0) / this.tapLatencies.length 
      : 2.0;

    // Standard baseline for TMT 8 items: 10-18 seconds, 0-1 errors.
    const timePenalty = Math.max(0, Math.floor((this.elapsedSeconds - 14) * 2.5));
    const errorPenalty = this.errorsCount * 8;
    const score = Math.max(30, Math.min(100, Math.round(100 - timePenalty - errorPenalty)));

    const results = {
      game: 'trailMaking',
      timeSeconds: this.elapsedSeconds,
      errors: this.errorsCount,
      avgLatency: parseFloat(avgLatency.toFixed(2)),
      score: score
    };

    if (this.onComplete) {
      this.onComplete(results);
    }
  }
}

window.TrailMakingGame = TrailMakingGame;
