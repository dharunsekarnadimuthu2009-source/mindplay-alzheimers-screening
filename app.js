/**
 * MindPlay Application Coordinator & State Machine
 */

class MindPlayApp {
  constructor() {
    this.currentStep = 'home'; // home, patient, memory, trail, word, voice, sensor, report
    this.sessionData = {
      patientInfo: {
        name: '',
        age: '',
        gender: 'Male',
        education: 'Graduate / Degree'
      },
      memoryMatch: null,
      trailMaking: null,
      wordRecall: null,
      voiceBiomarkers: null,
      sensorData: null
    };

    // Sub-modules
    this.memoryGame = null;
    this.trailGame = null;
    this.wordGame = null;
    this.voiceModule = null;
    this.sensorManager = null;
    this.reportView = null;
  }

  init() {
    window.I18N.init();

    // Initialize modules
    this.reportView = new ReportView('report-container');

    this.bindEvents();
    this.showStep('home');
  }

  bindEvents() {
    // Language Toggle Button
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const nextLang = window.I18N.currentLang === 'en' ? 'ta' : 'en';
        window.I18N.setLang(nextLang);
        // Refresh sub-views if active
        if (this.currentStep === 'word' && this.wordGame) {
          this.wordGame.render();
        } else if (this.currentStep === 'report' && this.reportView) {
          this.reportView.render(this.sessionData, this.sessionData.patientInfo);
        }
      });
    }

    // Viewport Mode Toggle (Mobile Simulator vs Full Desktop)
    const viewToggleBtn = document.getElementById('viewport-toggle-btn');
    const mainWrapper = document.getElementById('main-app-wrapper');
    if (viewToggleBtn && mainWrapper) {
      viewToggleBtn.addEventListener('click', () => {
        const isMobileView = mainWrapper.classList.toggle('mobile-frame');
        viewToggleBtn.innerHTML = isMobileView 
          ? '🖥️ <span class="hidden sm:inline">Desktop View</span>' 
          : '📱 <span class="hidden sm:inline">Mobile Frame</span>';
      });
    }

    // Home Screen Actions
    const startBtn = document.getElementById('btn-start-screening');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.showStep('patient');
      });
    }

    const sensorShortcutBtn = document.getElementById('btn-view-sensors-direct');
    if (sensorShortcutBtn) {
      sensorShortcutBtn.addEventListener('click', () => {
        this.showStep('sensor');
      });
    }

    // Patient Form Submission
    const patientForm = document.getElementById('patient-form');
    if (patientForm) {
      patientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.sessionData.patientInfo = {
          name: document.getElementById('input-patient-name').value.trim() || 'Anonymous Participant',
          age: document.getElementById('input-patient-age').value.trim() || '65',
          gender: document.getElementById('select-patient-gender').value,
          education: document.getElementById('select-patient-edu').value
        };
        this.showStep('memory');
      });
    }

    // Navigation buttons between steps
    const btnNextTrail = document.getElementById('btn-next-to-trail');
    if (btnNextTrail) {
      btnNextTrail.addEventListener('click', () => this.showStep('trail'));
    }

    const btnNextWord = document.getElementById('btn-next-to-word');
    if (btnNextWord) {
      btnNextWord.addEventListener('click', () => this.showStep('word'));
    }

    const btnNextVoice = document.getElementById('btn-next-to-voice');
    if (btnNextVoice) {
      btnNextVoice.addEventListener('click', () => this.showStep('voice'));
    }

    const btnNextSensors = document.getElementById('btn-next-to-sensors');
    if (btnNextSensors) {
      btnNextSensors.addEventListener('click', () => this.showStep('sensor'));
    }

    const btnGenerateReport = document.getElementById('btn-generate-report');
    if (btnGenerateReport) {
      btnGenerateReport.addEventListener('click', () => {
        if (this.sensorManager) {
          this.sessionData.sensorData = this.sensorManager.getResults();
        }
        this.showStep('report');
      });
    }

    // Voice Recorder Buttons
    const btnVoiceRecord = document.getElementById('btn-voice-record');
    const voiceStatus = document.getElementById('voice-status-text');
    if (btnVoiceRecord) {
      btnVoiceRecord.addEventListener('click', async () => {
        if (!this.voiceModule) {
          this.voiceModule = new VoiceRecorderModule('voice-waveform-canvas', (results) => {
            this.sessionData.voiceBiomarkers = results;
            if (btnNextSensors) btnNextSensors.classList.remove('hidden');
          });
        }

        if (!this.voiceModule.isRecording) {
          const ok = await this.voiceModule.startRecording();
          if (ok) {
            btnVoiceRecord.classList.remove('bg-teal-600', 'hover:bg-teal-700');
            btnVoiceRecord.classList.add('bg-rose-600', 'hover:bg-rose-700', 'animate-pulse');
            btnVoiceRecord.innerHTML = '🛑 <span>Stop & Analyze Speech</span>';
            if (voiceStatus) voiceStatus.textContent = window.I18N.t('recordingStatus');
          }
        } else {
          const results = this.voiceModule.stopRecording();
          btnVoiceRecord.classList.remove('bg-rose-600', 'hover:bg-rose-700', 'animate-pulse');
          btnVoiceRecord.classList.add('bg-teal-600', 'hover:bg-teal-700');
          btnVoiceRecord.innerHTML = '🎙️ <span>Start Recording Voice</span>';
          if (voiceStatus) voiceStatus.textContent = `Acoustic analysis complete. Fluency Score: ${results.score}%`;
        }
      });
    }

    // Sensor Simulator Presets
    document.querySelectorAll('[data-sim-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-sim-mode');
        if (this.sensorManager) {
          this.sensorManager.setSimMode(mode);
        }
        // Active visual state
        document.querySelectorAll('[data-sim-mode]').forEach(b => {
          b.classList.remove('bg-teal-600', 'text-white');
          b.classList.add('bg-slate-100', 'text-slate-700');
        });
        btn.classList.remove('bg-slate-100', 'text-slate-700');
        btn.classList.add('bg-teal-600', 'text-white');
      });
    });

    // Bluetooth Connect Button
    const btnBLE = document.getElementById('btn-connect-ble');
    if (btnBLE) {
      btnBLE.addEventListener('click', () => {
        if (this.sensorManager) {
          this.sensorManager.connectESP32();
        }
      });
    }
  }

  showStep(stepName) {
    this.currentStep = stepName;

    // Hide all step sections
    document.querySelectorAll('.step-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    // Show target section
    const target = document.getElementById(`step-${stepName}`);
    if (target) {
      target.classList.remove('hidden');
    }

    // Scroll to top of app
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Step-specific initialization
    if (stepName === 'memory') {
      const nextBtn = document.getElementById('btn-next-to-trail');
      if (nextBtn) nextBtn.classList.add('hidden');
      this.memoryGame = new MemoryMatchGame('memory-game-container', (res) => {
        this.sessionData.memoryMatch = res;
        if (nextBtn) nextBtn.classList.remove('hidden');
      });
      this.memoryGame.init();
    } else if (stepName === 'trail') {
      const nextBtn = document.getElementById('btn-next-to-word');
      if (nextBtn) nextBtn.classList.add('hidden');
      this.trailGame = new TrailMakingGame('trail-game-container', (res) => {
        this.sessionData.trailMaking = res;
        if (nextBtn) nextBtn.classList.remove('hidden');
      });
      this.trailGame.init();
    } else if (stepName === 'word') {
      const nextBtn = document.getElementById('btn-next-to-voice');
      if (nextBtn) nextBtn.classList.add('hidden');
      this.wordGame = new WordRecallGame('word-game-container', (res) => {
        this.sessionData.wordRecall = res;
        if (nextBtn) nextBtn.classList.remove('hidden');
      });
      this.wordGame.init();
    } else if (stepName === 'voice') {
      // Pre-instantiate voice module
      if (!this.voiceModule) {
        this.voiceModule = new VoiceRecorderModule('voice-waveform-canvas', (res) => {
          this.sessionData.voiceBiomarkers = res;
          const nextBtn = document.getElementById('btn-next-to-sensors');
          if (nextBtn) nextBtn.classList.remove('hidden');
        });
      }
    } else if (stepName === 'sensor') {
      if (!this.sensorManager) {
        this.sensorManager = new SensorManager('accel-canvas', 'pulse-canvas');
        this.sensorManager.init();
      }
    } else if (stepName === 'report') {
      if (this.reportView) {
        this.reportView.render(this.sessionData, this.sessionData.patientInfo);
      }
    }
  }

  restart() {
    this.sessionData = {
      patientInfo: { name: '', age: '', gender: 'Male', education: 'Graduate / Degree' },
      memoryMatch: null,
      trailMaking: null,
      wordRecall: null,
      voiceBiomarkers: null,
      sensorData: null
    };
    this.showStep('home');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.MindPlayApp = new MindPlayApp();
  window.MindPlayApp.init();
});
