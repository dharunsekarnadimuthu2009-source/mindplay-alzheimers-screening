/**
 * MindPlay Sensor Manager & Telemetry Module
 * Interfaces with ESP32 wristband via Web Bluetooth (BLE)
 * Features an interactive real-time canvas visualizer and clinical simulator for MPU6050 & MAX30100
 */

class SensorManager {
  constructor(accelCanvasId, pulseCanvasId, onUpdate) {
    this.accelCanvas = document.getElementById(accelCanvasId);
    this.pulseCanvas = document.getElementById(pulseCanvasId);
    this.accelCtx = this.accelCanvas ? this.accelCanvas.getContext('2d') : null;
    this.pulseCtx = this.pulseCanvas ? this.pulseCanvas.getContext('2d') : null;
    this.onUpdate = onUpdate;

    this.isConnected = false;
    this.bluetoothDevice = null;
    this.isSimulating = true;
    this.simMode = 'normal'; // 'normal' | 'mild' | 'elevated'

    // Telemetry state
    this.heartRate = 72;
    this.spo2 = 98;
    this.tremorIndex = 1.1; // 0-10 scale
    this.accelHistory = [];
    this.pulseHistory = [];
    this.maxDataPoints = 120;

    this.simInterval = null;
    this.animFrame = null;
    this.timeStep = 0;
  }

  init() {
    this.accelHistory = new Array(this.maxDataPoints).fill(0);
    this.pulseHistory = new Array(this.maxDataPoints).fill(0);
    this.startSimulation();
    this.startCanvasRender();
  }

  setSimMode(mode) {
    this.simMode = mode;
    if (mode === 'normal') {
      this.heartRate = 72;
      this.spo2 = 99;
      this.tremorIndex = 1.1;
    } else if (mode === 'mild') {
      this.heartRate = 78;
      this.spo2 = 97;
      this.tremorIndex = 3.8;
    } else if (mode === 'elevated') {
      this.heartRate = 84;
      this.spo2 = 96;
      this.tremorIndex = 7.4;
    }
    this.updateStatsDisplay();
  }

  startSimulation() {
    this.simInterval = setInterval(() => {
      this.timeStep += 0.2;

      // Generate realistic tremor signals based on mode
      let noiseAmp = 0.3;
      let tremorAmp = 0.5;
      let tremorFreq = 0.6;

      if (this.simMode === 'mild') {
        tremorAmp = 2.8;
        tremorFreq = 1.2;
        noiseAmp = 0.8;
      } else if (this.simMode === 'elevated') {
        tremorAmp = 6.2;
        tremorFreq = 1.8;
        noiseAmp = 1.5;
      }

      // MPU6050 compound wave: intentional drift + micro tremor (4-8 Hz) + sensor noise
      const accelVal = Math.sin(this.timeStep * tremorFreq) * tremorAmp +
                       Math.cos(this.timeStep * 3.1) * (noiseAmp * 0.5) +
                       (Math.random() - 0.5) * noiseAmp;

      this.accelHistory.push(accelVal);
      if (this.accelHistory.length > this.maxDataPoints) {
        this.accelHistory.shift();
      }

      // MAX30100 PPG Arterial Blood Volume pulse wave (systolic peak + dicrotic notch)
      const pulseCycle = (this.timeStep * 1.8) % (2 * Math.PI);
      let pulseVal = 0;
      if (pulseCycle < 1.2) {
        // Systolic peak
        pulseVal = Math.sin((pulseCycle / 1.2) * Math.PI) * 1.0;
      } else if (pulseCycle < 2.0) {
        // Dicrotic notch reflection
        pulseVal = Math.sin(((pulseCycle - 1.2) / 0.8) * Math.PI) * 0.35;
      } else {
        // Diastolic baseline
        pulseVal = 0.05 + (Math.random() - 0.5) * 0.02;
      }

      this.pulseHistory.push(pulseVal);
      if (this.pulseHistory.length > this.maxDataPoints) {
        this.pulseHistory.shift();
      }

      this.updateStatsDisplay();
    }, 50);
  }

  updateStatsDisplay() {
    const hrEl = document.getElementById('sensor-hr-val');
    const spo2El = document.getElementById('sensor-spo2-val');
    const tremorEl = document.getElementById('sensor-tremor-val');
    const statusEl = document.getElementById('sensor-status-val');

    if (hrEl) hrEl.textContent = `${this.heartRate} bpm`;
    if (spo2El) spo2El.textContent = `${this.spo2}%`;
    if (tremorEl) tremorEl.textContent = `${this.tremorIndex.toFixed(1)} / 10`;

    if (statusEl) {
      if (this.tremorIndex > 5.5) {
        statusEl.textContent = 'High Resting Tremor Detected';
        statusEl.className = 'text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700';
      } else if (this.tremorIndex > 2.5) {
        statusEl.textContent = 'Mild Postural Tremor';
        statusEl.className = 'text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700';
      } else {
        statusEl.textContent = 'Motor Stability: Stable';
        statusEl.className = 'text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700';
      }
    }
  }

  startCanvasRender() {
    const render = () => {
      this.renderAccelGraph();
      this.renderPulseGraph();
      this.animFrame = requestAnimationFrame(render);
    };
    render();
  }

  renderAccelGraph() {
    if (!this.accelCanvas || !this.accelCtx) return;
    const w = this.accelCanvas.width;
    const h = this.accelCanvas.height;
    const ctx = this.accelCtx;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Signal waveform
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = this.tremorIndex > 5 ? '#f43f5e' : this.tremorIndex > 2.5 ? '#f59e0b' : '#06b6d4';

    const stepX = w / (this.maxDataPoints - 1);
    for (let i = 0; i < this.accelHistory.length; i++) {
      const val = this.accelHistory[i];
      const y = h / 2 - (val * (h * 0.05));
      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * stepX, y);
    }
    ctx.stroke();
  }

  renderPulseGraph() {
    if (!this.pulseCanvas || !this.pulseCtx) return;
    const w = this.pulseCanvas.width;
    const h = this.pulseCanvas.height;
    const ctx = this.pulseCtx;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.75);
    ctx.lineTo(w, h * 0.75);
    ctx.stroke();

    // Pulse waveform
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#10b981'; // Green PPG wave

    const stepX = w / (this.maxDataPoints - 1);
    for (let i = 0; i < this.pulseHistory.length; i++) {
      const val = this.pulseHistory[i];
      const y = (h * 0.85) - (val * (h * 0.7));
      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * stepX, y);
    }
    ctx.stroke();
  }

  // Web Bluetooth API Integration for physical ESP32
  async connectESP32() {
    if (!navigator.bluetooth) {
      alert('Web Bluetooth is not supported on this browser. Chrome or Edge is recommended. You can continue using the built-in Sensor Simulator!');
      return;
    }

    try {
      this.bluetoothDevice = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'MindPlay' }],
        optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
      });

      const server = await this.bluetoothDevice.gatt.connect();
      const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
      const characteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');

      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const decoder = new TextDecoder('utf-8');
        const jsonStr = decoder.decode(event.target.value);
        try {
          const data = JSON.parse(jsonStr);
          this.handleLiveESP32Data(data);
        } catch (e) {}
      });

      await characteristic.startNotifications();
      this.isConnected = true;
      this.isSimulating = false;
      alert('Successfully connected to ESP32 Wristband!');
    } catch (err) {
      console.warn('Bluetooth pairing cancelled or failed:', err);
    }
  }

  handleLiveESP32Data(data) {
    if (data.hr) this.heartRate = data.hr;
    if (data.spo2) this.spo2 = data.spo2;
    if (data.tremor) this.tremorIndex = data.tremor;
    if (data.accel) {
      this.accelHistory.push(data.accel);
      if (this.accelHistory.length > this.maxDataPoints) this.accelHistory.shift();
    }
    this.updateStatsDisplay();
  }

  getResults() {
    // Stability score (100 is perfectly stable, lower if tremor is high)
    const stabilityScore = Math.max(30, Math.round(100 - (this.tremorIndex * 8)));

    return {
      heartRate: this.heartRate,
      spo2: this.spo2,
      tremorIndex: parseFloat(this.tremorIndex.toFixed(1)),
      stabilityScore: stabilityScore,
      simMode: this.simMode
    };
  }

  destroy() {
    clearInterval(this.simInterval);
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }
}

window.SensorManager = SensorManager;
