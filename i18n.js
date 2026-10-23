/**
 * MindPlay Internationalization (i18n) Module
 * Complete English (en) and Tamil (ta) translations
 */

const I18N = {
  currentLang: 'en',

  translations: {
    en: {
      appName: 'MindPlay',
      tagline: 'Multi-Modal Early Cognitive Screening',
      dexathonBadge: 'Dexathon 2026 | Team Technova',
      switchLang: 'தமிழ்',
      
      // Navigation
      navHome: 'Overview',
      navAssessment: 'Screening Test',
      navSensors: 'Wearable Sensor',
      navReport: 'Clinical Report',
      navAbout: 'About MindPlay',
      
      // Home Screen
      heroTitle: 'Early Alzheimer\'s & Cognitive Health Screening at Home',
      heroSubtitle: 'A gentle, playful 10-minute multi-modal assessment combining interactive cognitive games, speech biomarker analysis, and wearable motor/pulse monitoring.',
      startAssessment: 'Start Screening Assessment',
      viewSensors: 'View Live Sensor Data',
      screeningNotice: 'Screening & Triaging Aid Only — Not a Formal Clinical Diagnosis',
      
      pillarsTitle: 'The Three Pillars of MindPlay',
      pillarGamesTitle: 'Cognitive Mini-Games',
      pillarGamesDesc: 'Tests short-term visual memory, psychomotor speed, and executive Trail-Making function.',
      pillarVoiceTitle: 'Voice Biomarkers',
      pillarVoiceDesc: 'Analyzes speech rate, pauses, and lexical recall using vocal acoustic parameters.',
      pillarSensorTitle: 'Wearable IoT Wristband',
      pillarSensorDesc: 'Monitors resting/postural tremors with MPU6050 and pulse variability with MAX30100.',
      
      // Assessment Flow Steps
      stepPatientInfo: 'Participant Info',
      stepMemoryGame: '1. Memory Match',
      stepTrailGame: '2. Speed & Trail',
      stepWordGame: '3. Word Recall',
      stepVoiceTest: '4. Voice Test',
      stepSensorCheck: '5. Wearable Vitals',
      stepReport: 'Results & Report',

      // Patient Info Form
      participantTitle: 'Participant Details',
      participantSub: 'Please enter details for the screening session record.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Ramachandran K',
      ageLabel: 'Age (Years)',
      agePlaceholder: 'e.g. 68',
      genderLabel: 'Gender',
      genderMale: 'Male',
      genderFemale: 'Female',
      genderOther: 'Other',
      eduLabel: 'Education Level',
      eduHighSchool: 'High School',
      eduGraduate: 'Graduate / Degree',
      eduPostGrad: 'Post-Graduate',
      eduBasic: 'Primary / Basic Literacy',
      btnBeginGames: 'Begin Cognitive Games →',

      // Game 1: Memory Match
      memoryTitle: 'Test 1: Visual Memory Match',
      memoryInstruction: 'Flip the cards and find matching pairs of familiar objects. Try to memorize card locations!',
      memoryFlips: 'Flips:',
      memoryPairs: 'Matched:',
      memoryTime: 'Time:',
      memoryComplete: 'Great job! Memory test completed.',
      btnNextTrail: 'Proceed to Speed & Trail Test →',

      // Game 2: Trail Making
      trailTitle: 'Test 2: Trail-Making Speed & Attention',
      trailInstruction: 'Tap the numbered circles in sequential order from 1 to 8 as quickly and accurately as possible.',
      trailTarget: 'Next Number:',
      trailErrors: 'Mistakes:',
      trailTime: 'Time:',
      trailComplete: 'Trail sequence finished smoothly!',
      btnNextWord: 'Proceed to Word Recall →',

      // Game 3: Word Recall
      wordTitle: 'Test 3: Semantic Word & Category Recall',
      wordInstruction: 'Remember these 3 initial items: [ Apple, Table, Penny ]. Select the correct items from the categories below.',
      wordTargetPrompt: 'Identify the items you were asked to remember earlier:',
      wordComplete: 'Word recall completed!',
      btnNextVoice: 'Proceed to Voice Assessment →',

      // Voice Test
      voiceTitle: 'Test 4: Vocal Fluency & Speech Biomarkers',
      voiceInstruction: 'Press Record and speak for 15-30 seconds describing what you see in the illustration below, or your favorite childhood memory.',
      voicePromptText: 'Prompt: "Look at the picture of a family having tea in the garden. Describe what everyone is doing in full sentences."',
      btnStartRecord: 'Start Recording Voice',
      btnStopRecord: 'Stop & Analyze Speech',
      recordingStatus: 'Listening & analyzing acoustic signals...',
      voiceDuration: 'Spoken Duration:',
      voicePauses: 'Hesitations / Pauses:',
      voiceRate: 'Speech Rate (wpm):',
      voiceFluencyScore: 'Speech Fluency Score:',
      btnNextSensors: 'Proceed to Wearable Vitals →',

      // Sensor Telemetry
      sensorTitle: 'Wearable IoT Wristband Telemetry',
      sensorSub: 'Real-time physiological signals from ESP32: MPU-6050 (Tremor & Stability) + MAX30100 (Pulse & SpO2).',
      btnConnectBLE: 'Connect ESP32 (Bluetooth)',
      simulatorMode: 'Interactive Sensor Simulator Active',
      simNormal: 'Simulate Normal Baseline',
      simMild: 'Simulate Mild Tremor',
      simHigh: 'Simulate Elevated Tremor',
      accelTitle: 'Tremor & Motion Stability (MPU-6050 3-Axis)',
      pulseTitle: 'Photoplethysmography / Pulse Wave (MAX30100)',
      tremorIndex: 'Tremor Index:',
      heartRate: 'Heart Rate (BPM):',
      spo2: 'SpO2 Oxygen:',
      motionStatus: 'Movement Stability: Normal',
      btnGenerateReport: 'Generate Multi-Modal Assessment Report →',

      // Report View
      reportTitle: 'MindPlay Cognitive Screening Report',
      reportSub: 'Multi-Modal Triaging Summary for Family & Healthcare Practitioners',
      patientInfoHeading: 'Participant Profile',
      riskIndicatorHeading: 'Composite Cognitive Risk Assessment',
      riskLow: 'Low Risk — Normal Cognitive Range',
      riskModerate: 'Moderate Risk — Mild Variance Noted',
      riskHigh: 'Elevated Risk — Clinical Evaluation Recommended',
      riskLowDesc: 'Cognitive memory games, speech fluency, and motor stability are within healthy baseline parameters for the participant\'s demographic group.',
      riskModerateDesc: 'Mild delays observed in psychomotor processing or speech hesitation. Recommended follow-up in 3-6 months and lifestyle cognitive exercises.',
      riskHighDesc: 'Significant divergence identified across memory recall, vocal pause latency, or postural tremor stability. Strongly advise consulting a neurologist or geriatrician for a comprehensive clinical evaluation.',
      
      scoreBreakdown: 'Domain Breakdown',
      metricMemory: 'Visual & Working Memory',
      metricProcessing: 'Processing Speed & Executive Trail',
      metricSpeech: 'Speech Fluency & Acoustic Biomarkers',
      metricMotor: 'Motor Stability & Tremor Index',
      metricCardio: 'Autonomic & Pulse Regularity',
      
      clinicalAdviceHeading: 'Clinical & Family Action Steps',
      advice1: '1. Maintain social engagement and daily mental stimulation (puzzles, reading, memory tasks).',
      advice2: '2. Prioritize regular aerobic physical activity and heart-healthy Mediterranean-style nutrition.',
      advice3: '3. Share this summary report with your general practitioner at your next routine check-up.',
      
      disclaimer: 'DISCLAIMER: MindPlay is an exploratory multi-modal screening tool developed for Dexathon 2026. It is NOT a diagnostic medical device and does not replace standardized clinical neuropsychological testing (e.g. MoCA, MMSE, PET/MRI).',
      btnPrintReport: '🖨️ Print / Save Doctor Report (PDF)',
      btnRestart: '🔄 Start New Screening'
    },

    ta: {
      appName: 'மைண்ட்பிளே (MindPlay)',
      tagline: 'ஆல்சைமர் & மூளைத்திறன் ஆரம்பநிலை பரிசோதனை',
      dexathonBadge: 'டெக்சாதான் 2026 | குழு டெக்னோவா',
      switchLang: 'English',
      
      // Navigation
      navHome: 'முகப்பு',
      navAssessment: 'பரிசோதனை சோதனை',
      navSensors: 'சென்சார் மானிட்டர்',
      navReport: 'மருத்துவ அறிக்கை',
      navAbout: 'திட்டம் பற்றி',
      
      // Home Screen
      heroTitle: 'வீட்டிலேயே எளிய முறையில் ஆல்சைமர் மற்றும் நினைவாற்றல் பரிசோதனை',
      heroSubtitle: 'எளிய நினைவாற்றல் விளையாட்டுகள், குரல் பேச்சு பரிசோதனை மற்றும் கைக்கடிகார சென்சார் மூலம் 10 நிமிடங்களில் ஆரம்பநிலை விழிப்புணர்வு தரும் மென்பொருள்.',
      startAssessment: 'பரிசோதனையைத் தொடங்கு',
      viewSensors: 'நேரலை சென்சார் தரவு',
      screeningNotice: 'இது ஆரம்பநிலை விழிப்புணர்வு பரிசோதனை மட்டுமே — மருத்துவ நோய் அறுதியிடல் அல்ல',
      
      pillarsTitle: 'மைண்ட்பிளேயின் 3 முக்கிய தூண்கள்',
      pillarGamesTitle: 'நினைவாற்றல் விளையாட்டுகள்',
      pillarGamesDesc: 'குறுகிய கால காட்சி நினைவாற்றல், சிந்தனை வேகம் மற்றும் வரிசைப்படுத்துதலை சோதிக்கிறது.',
      pillarVoiceTitle: 'குரல் நுண்ணாய்வு (Voice Biomarkers)',
      pillarVoiceDesc: 'பேச்சு வேகம், யோசிக்கும் இடைவெளிகள் மற்றும் சொற்கள் நினைவுகூருதலை ஆராய்கிறது.',
      pillarSensorTitle: 'அணியக்கூடிய மணிக்கட்டு கருவி (IoT)',
      pillarSensorDesc: 'ESP32, MPU6050 (நடுக்கம்/Tremor) மற்றும் MAX30100 (இதயத் துடிப்பு) சிக்னல்களைக் கண்காணிக்கிறது.',

      // Assessment Flow Steps
      stepPatientInfo: 'பயனாளர் விவரம்',
      stepMemoryGame: '1. அட்டை விளையாட்டு',
      stepTrailGame: '2. எண் வரிசை வேகம்',
      stepWordGame: '3. சொல் நினைவுகூரல்',
      stepVoiceTest: '4. குரல் பரிசோதனை',
      stepSensorCheck: '5. உடல் சிக்னல்கள்',
      stepReport: 'முடிவுகள் & அறிக்கை',

      // Patient Info Form
      participantTitle: 'பயனாளர் தகவல்கள்',
      participantSub: 'பரிசோதனை பதிவிற்காக விவரங்களை உள்ளிடவும்.',
      nameLabel: 'முழுப் பெயர்',
      namePlaceholder: 'எ.கா: ராமச்சந்திரன்',
      ageLabel: 'வயது',
      agePlaceholder: 'எ.கா: 68',
      genderLabel: 'பாலினம்',
      genderMale: 'ஆண்',
      genderFemale: 'பெண்',
      genderOther: 'மற்றவை',
      eduLabel: 'கல்வித் தகுதி',
      eduHighSchool: 'பள்ளிப் படிப்பு',
      eduGraduate: 'பட்டப்படிப்பு',
      eduPostGrad: 'முதுகலை / உயர் படிப்பு',
      eduBasic: 'அடிப்படை எழுத்தறிவு',
      btnBeginGames: 'விளையாட்டைத் தொடங்கவும் →',

      // Game 1: Memory Match
      memoryTitle: 'சோதனை 1: காட்சி நினைவாற்றல் பொருத்துதல்',
      memoryInstruction: 'அட்டைகளைத் திறந்து ஒரே மாதிரியான ஜோடிகளைக் கண்டறியவும். அட்டைகளின் இருப்பிடத்தை நினைவில் வைக்க முயற்சிக்கவும்!',
      memoryFlips: 'திறந்தவை:',
      memoryPairs: 'பொருந்தியவை:',
      memoryTime: 'நேரம்:',
      memoryComplete: 'சிறப்பு! நினைவாற்றல் விளையாட்டு முடிந்தது.',
      btnNextTrail: 'அடுத்த சோதனைக்குச் செல்லவும் →',

      // Game 2: Trail Making
      trailTitle: 'சோதனை 2: வரிசைமுறை மற்றும் கவன வேகம்',
      trailInstruction: '1 முதல் 8 வரை உள்ள எண்களை சரியான வரிசையில் அடுத்தடுத்து தொடவும்.',
      trailTarget: 'அடுத்த எண்:',
      trailErrors: 'தவறுகள்:',
      trailTime: 'நேரம்:',
      trailComplete: 'எண் வரிசை வெற்றிகரமாக முடிந்தது!',
      btnNextWord: 'சொல் நினைவுகூரலுக்குச் செல்லவும் →',

      // Game 3: Word Recall
      wordTitle: 'சோதனை 3: சொற்கள் நினைவுகூரல் சோதனை',
      wordInstruction: 'இந்த 3 வார்த்தைகளை நினைவில் வையுங்கள்: [ ஆப்பிள், மேஜை, நாணயம் ]. கீழே உள்ளவற்றிலிருந்து சரியானவற்றைத் தேர்ந்தெடுக்கவும்.',
      wordTargetPrompt: 'முதலில் கூறப்பட்ட 3 வார்த்தைகளைத் தேர்ந்தெடுக்கவும்:',
      wordComplete: 'சொற்கள் நினைவுகூரல் முடிந்தது!',
      btnNextVoice: 'குரல் பரிசோதனைக்குச் செல்லவும் →',

      // Voice Test
      voiceTitle: 'சோதனை 4: குரல் சரளத்தன்மை மற்றும் பேச்சு ஆய்வு',
      voiceInstruction: 'ஒலிப்பதிவு பொத்தானை அழுத்தி, கீழே உள்ள படம் அல்லது உங்கள் நினைவுகளைப் பற்றி 15-30 வினாடிகள் பேசவும்.',
      voicePromptText: 'குறிப்பு: "தோட்டத்தில் குடும்பத்தினர் தேநீர் அருந்தும் படத்தைப் பார்த்து, அங்கு நடப்பவற்றை 3 முழு வாக்கியங்களில் விவரிக்கவும்."',
      btnStartRecord: 'குரல் பதிவு செய்யத் தொடங்கவும்',
      btnStopRecord: 'நிறுத்தி ஆய்வு செய்யவும்',
      recordingStatus: 'உங்கள் குரலைக் கேட்டு ஆய்வு செய்கிறது...',
      voiceDuration: 'பேசிய நேரம்:',
      voicePauses: 'தடுமாற்ற இடைவெளிகள்:',
      voiceRate: 'பேச்சு வேகம் (wpm):',
      voiceFluencyScore: 'பேச்சு சரளத்தன்மை மதிப்பெண்:',
      btnNextSensors: 'மணிக்கட்டு சிக்னல்களுக்குச் செல்லவும் →',

      // Sensor Telemetry
      sensorTitle: 'மணிக்கட்டு கருவி சிக்னல்கள் (IoT Telemetry)',
      sensorSub: 'ESP32 சென்சார் மூலம் நேரலை உடலியல் தரவு: MPU-6050 (கை நடுக்கம்) + MAX30100 (இதயத் துடிப்பு).',
      btnConnectBLE: 'ESP32-ஐ இணைக்கவும் (புளூடூத்)',
      simulatorMode: 'சென்சார் மாதிரி செயல்முறை இயக்கத்தில் உள்ளது',
      simNormal: 'சாதாரண சமநிலை',
      simMild: 'லேசான கை நடுக்கம்',
      simHigh: 'அதிக கை நடுக்கம்',
      accelTitle: 'கை நடுக்கம் மற்றும் சமநிலை (MPU-6050)',
      pulseTitle: 'இரத்த ஓட்ட நாடித்துடிப்பு அலை (MAX30100 PPG)',
      tremorIndex: 'நடுக்கக் குறியீடு:',
      heartRate: 'இதயத் துடிப்பு (BPM):',
      spo2: 'ஆக்சிஜன் அளவு (SpO2):',
      motionStatus: 'இயக்க நிலை: சீரானது',
      btnGenerateReport: 'முழுமையான அறிக்கையை உருவாக்கவும் →',

      // Report View
      reportTitle: 'மைண்ட்பிளே பரிசோதனை அறிக்கை',
      reportSub: 'குடும்பத்தினர் மற்றும் மருத்துவர்களுக்கான பல்துறை ஆய்வு அறிக்கை',
      patientInfoHeading: 'பயனாளர் விவரம்',
      riskIndicatorHeading: 'ஆல்சைமர் இடர்நிலை மதிப்பீடு',
      riskLow: 'குறைந்த இடர் — இயல்பான நினைவாற்றல் நிலை',
      riskModerate: 'மிதமான இடர் — சிறிய கவனக்குறைவு காணப்படுகிறது',
      riskHigh: 'உயர் இடர் — மருத்துவப் பரிசோதனை பரிந்துரைக்கப்படுகிறது',
      riskLowDesc: 'நினைவாற்றல் விளையாட்டுகள், பேச்சு சரளத்தன்மை மற்றும் கை சமநிலை ஆகியவை இயல்பான வரம்பிற்குள் உள்ளன.',
      riskModerateDesc: 'சிந்தனை வேகம் அல்லது பேச்சு இடைவெளிகளில் லேசான தாமதம் காணப்படுகிறது. 3-6 மாதங்களில் மீண்டும் பரிசோதிக்கவும், மூளைக்கு பயிற்சி தரும் செயல்பாடுகளைத் தொடரவும்.',
      riskHighDesc: 'நினைவுகூருதல், பேச்சில் நீடித்த இடைவெளி அல்லது கை நடுக்கத்தில் குறிப்பிடத்தக்க மாறுபாடுகள் உள்ளன. முழுமையான பரிசோதனைக்கு நரம்பியல் மருத்துவரை அணுகுமாறு பரிந்துரைக்கப்படுகிறது.',
      
      scoreBreakdown: 'மதிப்பெண் விவரங்கள்',
      metricMemory: 'காட்சி & குறுகிய கால நினைவாற்றல்',
      metricProcessing: 'சிந்தனை வேகம் & வரிசை முறை',
      metricSpeech: 'பேச்சு சரளத்தன்மை & குரல் தரம்',
      metricMotor: 'கை சமநிலை & நடுக்கக் குறியீடு',
      metricCardio: 'இதயத் துடிப்பு சீரான தன்மை',
      
      clinicalAdviceHeading: 'பரிந்துரைக்கப்படும் வழிமுறைகள்',
      advice1: '1. தினமும் புதிய விஷயங்களைக் கற்றுக்கொள்வது, புதிர்கள் விடுவிப்பது போன்ற மூளைப் பயிற்சிகளைச் செய்யவும்.',
      advice2: '2. உடற்பயிற்சி மற்றும் சீரான சத்தான உணவுகளைப் பழக்கப்படுத்திக் கொள்ளவும்.',
      advice3: '3. இந்த அறிக்கையை உங்கள் வழக்கமான மருத்துவப் பரிசோதனையின் போது மருத்துவரிடம் காண்பிக்கவும்.',
      
      disclaimer: 'பொறுப்புத் துறப்பு: மைண்ட்பிளே என்பது ஆரம்பநிலை இடர் கண்டறியும் முன்மாதிரி கருவியாகும். இது முழுமையான மருத்துவ நோய் அறுதியிடல் (Diagnosis) அல்ல. விரிவான ஆய்வுக்கு மருத்துவரை அணுகவும்.',
      btnPrintReport: '🖨️ அறிக்கையை அச்சிடவும் / PDF சேமிக்கவும்',
      btnRestart: '🔄 புதிய பரிசோதனை தொடங்கவும்'
    }
  },

  setLang(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      this.updateDOM();
      localStorage.setItem('mindplay_lang', lang);
    }
  },

  t(key) {
    const lang = this.translations[this.currentLang] || this.translations.en;
    return lang[key] || this.translations.en[key] || key;
  },

  updateDOM() {
    if (typeof document === 'undefined') return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = this.t(key);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', this.t(key));
      }
    });

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.textContent = this.currentLang === 'en' ? 'தமிழ்' : 'English';
    }
  },

  init() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('mindplay_lang');
      if (saved && this.translations[saved]) {
        this.currentLang = saved;
      }
    }
    this.updateDOM();
  }
};

if (typeof window !== 'undefined') {
  window.I18N = I18N;
} else if (typeof global !== 'undefined') {
  global.I18N = I18N;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18N;
  console.log('✅ MindPlay i18n module loaded.');
  console.log('🚀 To run the MindPlay Web Application, run: node server.js (or: npm start)');
}
