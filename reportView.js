/**
 * MindPlay Clinical Report & Multi-Modal Risk Engine
 * Computes weighted composite risk and renders printable clinical summary
 */

class ReportView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  calculateRisk(sessionData) {
    const memoryScore = sessionData.memoryMatch ? sessionData.memoryMatch.score : 80;
    const trailScore = sessionData.trailMaking ? sessionData.trailMaking.score : 80;
    const wordScore = sessionData.wordRecall ? sessionData.wordRecall.score : 80;
    const voiceScore = sessionData.voiceBiomarkers ? sessionData.voiceBiomarkers.score : 80;
    const motorScore = sessionData.sensorData ? sessionData.sensorData.stabilityScore : 85;

    // Games composite (35%)
    const gamesAverage = Math.round((memoryScore * 0.4) + (trailScore * 0.3) + (wordScore * 0.3));
    
    // Voice composite (35%)
    const voiceWeight = voiceScore;

    // Motor / Sensor composite (30%)
    const motorWeight = motorScore;

    // Overall Multi-Modal Health Score (0 - 100)
    const compositeScore = Math.round((gamesAverage * 0.35) + (voiceWeight * 0.35) + (motorWeight * 0.30));

    let riskLevel = 'low';
    if (compositeScore < 55) {
      riskLevel = 'high';
    } else if (compositeScore < 75) {
      riskLevel = 'moderate';
    }

    return {
      compositeScore,
      riskLevel,
      gamesAverage,
      voiceWeight,
      motorWeight,
      memoryScore,
      trailScore,
      wordScore,
      voiceScore,
      motorScore
    };
  }

  render(sessionData, patientInfo) {
    if (!this.container) return;

    const risk = this.calculateRisk(sessionData);
    const lang = window.I18N ? window.I18N.currentLang : 'en';
    const isTa = lang === 'ta';

    let riskBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-400';
    let riskTitle = isTa ? 'குறைந்த இடர் — இயல்பான நினைவாற்றல் வரம்பு' : 'Low Risk — Normal Baseline Range';
    let riskDesc = isTa 
      ? 'விளையாட்டு மதிப்பெண்கள், பேச்சு சரளத்தன்மை மற்றும் கை சமநிலை ஆகியவை இயல்பான நிலையில் உள்ளன.' 
      : 'Cognitive memory games, speech fluency, and motor stability are within healthy baseline parameters for participant demographics.';

    if (risk.riskLevel === 'moderate') {
      riskBadgeColor = 'bg-amber-100 text-amber-800 border-amber-400';
      riskTitle = isTa ? 'மிதமான இடர் — கவனக்குறைவு அல்லது லேசான தாமதம்' : 'Moderate Risk — Mild Variance Noted';
      riskDesc = isTa 
        ? 'சிந்தனை வேகம் அல்லது பேச்சு இடைவெளிகளில் லேசான தாமதம் காணப்படுகிறது. 3-6 மாதங்களில் மீண்டும் பரிசோதிக்க பரிந்துரைக்கப்படுகிறது.' 
        : 'Mild delays observed in psychomotor processing or speech hesitation. Recommended follow-up in 3-6 months with lifestyle cognitive stimulation.';
    } else if (risk.riskLevel === 'high') {
      riskBadgeColor = 'bg-rose-100 text-rose-800 border-rose-400';
      riskTitle = isTa ? 'உயர் இடர் — மருத்துவப் பரிசோதனை பரிந்துரைக்கப்படுகிறது' : 'Elevated Risk — Clinical Evaluation Advised';
      riskDesc = isTa 
        ? 'நினைவுகூருதல், பேச்சில் நீடித்த இடைவெளி அல்லது கை நடுக்கத்தில் குறிப்பிடத்தக்க மாறுபாடுகள் உள்ளன. முழுமையான பரிசோதனைக்கு மருத்துவரை அணுகவும்.' 
        : 'Noticeable divergence identified across delayed recall, vocal pause latency, or resting tremor stability. Strongly advise consulting a neurologist for comprehensive evaluation.';
    }

    const todayStr = new Date().toLocaleDateString(isTa ? 'ta-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const sessionId = 'MP-' + Math.floor(100000 + Math.random() * 900000);

    this.container.innerHTML = `
      <div class="print-container bg-white border border-slate-200 rounded-2xl shadow-xl p-5 sm:p-8 max-w-2xl mx-auto my-4 text-slate-800">
        
        <!-- Header -->
        <div class="border-b-2 border-teal-600 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-3xl">🧠</span>
              <h1 class="text-2xl font-black tracking-tight text-teal-800">MindPlay</h1>
            </div>
            <p class="text-xs text-slate-500 font-medium">${isTa ? 'ஆல்சைமர் & மூளைத்திறன் ஆரம்பநிலை பரிசோதனை அறிக்கை' : 'Early Alzheimer\'s & Cognitive Triaging Screening Report'}</p>
          </div>
          <div class="text-right text-xs text-slate-500">
            <span class="inline-block bg-teal-50 border border-teal-200 text-teal-800 font-semibold px-2.5 py-1 rounded-full mb-1">
              Dexathon 2026 | Team Technova
            </span>
            <div><strong>ID:</strong> ${sessionId} | <strong>${isTa ? 'தேதி:' : 'Date:'}</strong> ${todayStr}</div>
          </div>
        </div>

        <!-- Participant Profile -->
        <div class="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
          <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">${isTa ? 'பயனாளர் விவரம்' : 'Participant Details'}</h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div><span class="text-slate-500 text-xs block">${isTa ? 'பெயர்:' : 'Name:'}</span> <strong>${patientInfo.name || 'Anonymous'}</strong></div>
            <div><span class="text-slate-500 text-xs block">${isTa ? 'வயது:' : 'Age:'}</span> <strong>${patientInfo.age || '--'} yrs</strong></div>
            <div><span class="text-slate-500 text-xs block">${isTa ? 'பாலினம்:' : 'Gender:'}</span> <strong>${patientInfo.gender || '--'}</strong></div>
            <div><span class="text-slate-500 text-xs block">${isTa ? 'கல்வி:' : 'Education:'}</span> <strong>${patientInfo.education || '--'}</strong></div>
          </div>
        </div>

        <!-- Overall Risk Summary Card -->
        <div class="border-2 rounded-2xl p-5 mb-6 text-center ${riskBadgeColor}">
          <span class="text-xs font-bold uppercase tracking-widest block mb-1 opacity-75">${isTa ? 'ஒட்டுமொத்த இடர் மதிப்பீடு' : 'Overall Screening Indication'}</span>
          <div class="text-2xl sm:text-3xl font-black mb-2">${riskTitle}</div>
          <div class="text-4xl font-extrabold my-2">${risk.compositeScore} <span class="text-base font-normal opacity-70">/ 100</span></div>
          <p class="text-xs sm:text-sm max-w-lg mx-auto font-medium leading-relaxed">${riskDesc}</p>
        </div>

        <!-- Domain Scores Breakdown -->
        <div class="mb-6">
          <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">${isTa ? 'பிரிவு வாரியான ஆய்வு மதிப்பெண்கள்' : 'Domain Performance Breakdown'}</h2>
          <div class="space-y-3">
            ${this.renderMetricBar(isTa ? 'காட்சி & குறுகிய கால நினைவாற்றல் (Visual Memory)' : 'Visual & Short-Term Memory', risk.memoryScore, '🍎')}
            ${this.renderMetricBar(isTa ? 'சிந்தனை வேகம் & வரிசை முறை (Trail Speed)' : 'Executive Processing & Trail Speed', risk.trailScore, '⚡')}
            ${this.renderMetricBar(isTa ? 'சொற்கள் நினைவுகூரல் (Delayed Recall)' : 'Semantic Word & Category Recall', risk.wordScore, '📖')}
            ${this.renderMetricBar(isTa ? 'பேச்சு சரளத்தன்மை & குரல் ஆய்வு (Voice Biomarkers)' : 'Speech Fluency & Acoustic Biomarkers', risk.voiceScore, '🎙️')}
            ${this.renderMetricBar(isTa ? 'கை சமநிலை & நடுக்கக் குறியீடு (Tremor Stability)' : 'Motor Stability & Tremor Sensor (MPU6050)', risk.motorScore, '⌚')}
          </div>
        </div>

        <!-- Vitals Snapshot -->
        <div class="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center mb-6 text-xs sm:text-sm">
          <div>
            <span class="text-slate-500 text-xs block">${isTa ? 'இதயத் துடிப்பு' : 'Heart Rate'}</span>
            <strong>${sessionData.sensorData ? sessionData.sensorData.heartRate : 72} BPM</strong>
          </div>
          <div>
            <span class="text-slate-500 text-xs block">${isTa ? 'ஆக்சிஜன் அளவு' : 'SpO2 Level'}</span>
            <strong>${sessionData.sensorData ? sessionData.sensorData.spo2 : 98}%</strong>
          </div>
          <div>
            <span class="text-slate-500 text-xs block">${isTa ? 'நடுக்கக் குறியீடு' : 'Tremor Index'}</span>
            <strong>${sessionData.sensorData ? sessionData.sensorData.tremorIndex : 1.2} / 10</strong>
          </div>
        </div>

        <!-- Clinical Recommendations -->
        <div class="border-t border-slate-200 pt-4 mb-6">
          <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">${isTa ? 'பரிந்துரைக்கப்படும் அடுத்தகட்ட நடவடிக்கைகள்' : 'Recommended Next Steps'}</h2>
          <ul class="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc pl-5">
            <li>${isTa ? 'தினமும் மூளைக்கு சுறுசுறுப்பு தரும் புதிர்கள், வாசிப்பு மற்றும் சமூகத் தொடர்புகளில் ஈடுபடவும்.' : 'Maintain daily mental stimulation through word games, reading, and active social conversation.'}</li>
            <li>${isTa ? 'தினசரி உடற்பயிற்சி மற்றும் இதயத்திற்கு ஆரோக்கியமான சீரான உணவுகளைப் பின்பற்றவும்.' : 'Engage in moderate regular aerobic physical exercise and balanced Mediterranean-style nutrition.'}</li>
            <li>${isTa ? 'உங்கள் வழக்கமான மருத்துவப் பரிசோதனையின் போது இந்த அறிக்கையை மருத்துவரிடம் காண்பிக்கவும்.' : 'Share this screening summary with your general practitioner at your next healthcare visit.'}</li>
          </ul>
        </div>

        <!-- Disclaimer -->
        <div class="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs leading-relaxed mb-6">
          <strong>${isTa ? 'முக்கிய பொறுப்புத் துறப்பு:' : 'Clinical Disclaimer:'}</strong> 
          ${isTa 
            ? 'மைண்ட்பிளே என்பது ஆரம்பநிலை இடர் கண்டறியும் முன்மாதிரி கருவியாகும். இது மருத்துவ நோய் அறுதியிடல் (Diagnosis) அல்ல. விரிவான ஆய்வுக்கு நரம்பியல் மருத்துவரை அணுகவும்.' 
            : 'MindPlay is an early-stage screening prototype developed for Dexathon 2026. It is NOT a clinical diagnosis and does not substitute for formal neuropsychological evaluation by a licensed physician.'}
        </div>

        <!-- Action Buttons (Hidden when printing) -->
        <div class="print-hide flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onclick="window.print()"
            class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🖨️</span>
            <span>${isTa ? 'அறிக்கையை அச்சிடவும் / PDF சேமிக்கவும்' : 'Print / Save Doctor Report (PDF)'}</span>
          </button>

          <button
            type="button"
            id="btn-restart-screening"
            class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🔄</span>
            <span>${isTa ? 'புதிய பரிசோதனை' : 'New Screening'}</span>
          </button>
        </div>

      </div>
    `;

    const restartBtn = document.getElementById('btn-restart-screening');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (window.MindPlayApp) window.MindPlayApp.restart();
      });
    }
  }

  renderMetricBar(label, score, icon) {
    let barColor = 'bg-teal-600';
    if (score < 50) barColor = 'bg-rose-500';
    else if (score < 70) barColor = 'bg-amber-500';

    return `
      <div>
        <div class="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
          <span class="flex items-center gap-1.5">
            <span>${icon}</span>
            <span>${label}</span>
          </span>
          <span class="font-bold">${score}%</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div class="${barColor} h-2.5 rounded-full transition-all duration-500" style="width: ${Math.max(5, score)}%"></div>
        </div>
      </div>
    `;
  }
}

window.ReportView = ReportView;
