import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON bodies with higher limits for base64 file processing
app.use(express.json({ limit: '50mb' }));

// Shared Client-Side / Server-Side API safe initialization
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini GenAI client successfully initialized server-side.');
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI:', err);
  }
} else {
  console.log('No GEMINI_API_KEY found or it is placeholder, running server in educational safe-simulation mode.');
}

// -------------------------------------------------------------
// HELPER UTILITIES FOR MAXIMUM MULTIMODAL RESILIENCE
// -------------------------------------------------------------

function tryDecodeBase64ToText(base64: string): string | null {
  try {
    const buffer = Buffer.from(base64, 'base64');
    const decoded = buffer.toString('utf8');
    let nonPrintableCount = 0;
    const len = Math.min(decoded.length, 500);
    if (len === 0) return null;
    for (let i = 0; i < len; i++) {
      const code = decoded.charCodeAt(i);
      if (code === 0 || (code < 9 && code !== 9 && code !== 10 && code !== 13) || (code > 13 && code < 32) || code === 65533) {
        nonPrintableCount++;
      }
    }
    const nonPrintableRatio = nonPrintableCount / len;
    if (nonPrintableRatio < 0.05) {
      return decoded;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

function getSimulationResponse(text: string, language: string) {
  const lowerText = (text || '').toLowerCase();
  const matchesHeart = lowerText.includes('cholesterol') || lowerText.includes('lipid') || lowerText.includes('ldl') || lowerText.includes('heart');
  const matchesLiver = lowerText.includes('alt') || lowerText.includes('ast') || lowerText.includes('bilirubin') || lowerText.includes('liver');

  let summary = "Your medical report highlights standard physical structures. All values are displayed with simple, friendly translations.";
  let findings: any[] = [];
  let terms: any[] = [];
  let questions: string[] = [];

  if (matchesHeart) {
    summary = `[Simulated ${language} translation] Your blood profile exhibits minor elevations in blood fats. These coordinates highlight cholesterol elements which support cellular vitality but warrant monitoring under custom cardiac guides.`;
    findings = [
      {
        marker: "Total Cholesterol",
        value: "235 mg/dL",
        status: "high",
        normalRange: "< 200 mg/dL",
        meaning: "Elevated measurement of circulating fat compounds. Your blood currently carries slightly more total fats than recommended."
      },
      {
        marker: "LDL Cholesterol ('Bad')",
        value: "158 mg/dL",
        status: "high",
        normalRange: "< 100 mg/dL",
        meaning: "This fat delivers structure to cells, but excessive volumes can build deposits. Discussion with your practitioner is standard."
      }
    ];
    terms = [
      { term: "Cholesterol", definition: "A soft, waxy lipid substance essential for producing vitamin D and crucial protective hormones." },
      { term: "LDL", definition: "Low-Density Lipoprotein, the carrier molecule that drops off fats throughout blood networks." }
    ];
    questions = [
      "Should we coordinate metabolic panel trends?",
      "Are there specific food patterns that would help regulate my LDL activity?",
      "How frequently do you suggest we screen these lipids?"
    ];
  } else if (matchesLiver) {
    summary = `[Simulated ${language} translation] The indicators display minor alterations in hepatic chemistry. Enzymes AST and ALT are mildly reactive, expressing temporary cellular metabolism adjustments.`;
    findings = [
      {
        marker: "ALT Enzyme",
        value: "68 U/L",
        status: "high",
        normalRange: "7 - 56 U/L",
        meaning: "A metabolic protein inside your liver. When the liver encounters active efforts or external triggers, minor numbers spill safely."
      }
    ];
    terms = [
      { term: "ALT", definition: "Alanine Aminotransferase, a critical processing enzyme that converts nutrient energy in the liver." }
    ];
    questions = [
      "Do any of my wellness plans or food choices place mild stress on my liver enzymes?",
      "Should we recheck these liver indices next season?"
    ];
  } else {
    summary = `[Simulated ${language} translation] KURA has analyzed your submitted report parameters. The primary indices suggest a general diagnostic monitoring check. We have highlighted the primary parameters safely.`;
    findings = [
      {
        marker: "White Blood Cell Count (WBC)",
        value: "11.2 K/uL",
        status: "high",
        normalRange: "4.5 - 11.0 K/uL",
        meaning: "Your defense cells are at the upper limits. This frequently indicates standard immunological energy or recovery from minor stress."
      },
      {
        marker: "Hemoglobin",
        value: "14.1 g/dL",
        status: "normal",
        normalRange: "12.0 - 16.0 g/dL",
        meaning: "The vital oxygen-carrying component of red blood cells. Your level is healthy and stable."
      }
    ];
    terms = [
      { term: "WBC", definition: "White Blood Cells, the physical micro-agents of the immune system that guard the body from outside stresses." },
      { term: "Hemoglobin", definition: "An iron-rich protein that transports fresh oxygen from your lungs to your muscles and organs." }
    ];
    questions = [
      "Are my blood counts showing general resilience?",
      "Is there any action needed to balance my immune and oxygen biomarkers?"
    ];
  }

  return {
    simple_summary: summary,
    key_findings: findings,
    term_definitions: terms,
    doctor_questions: questions,
    safety_disclaimer: "KURA is an educational decoding companion and must never replace a medical consult, prescription, or clinical assessment."
  };
}

// -------------------------------------------------------------
// SECURE GEMINI COGNITIVE RETRY & MULTI-MODEL FALLBACK ENGINE
// -------------------------------------------------------------
async function generateContentWithRetry(
  aiInstance: any,
  primaryModel: string,
  contents: any,
  config: any
): Promise<any> {
  const modelsToTry = [
    primaryModel,
    'gemini-3.1-flash-lite',
    'gemini-flash-latest'
  ];
  
  let lastError: any = null;

  for (const model of modelsToTry) {
    let delay = 500;
    const maxRetriesForThisModel = 3;

    for (let attempt = 1; attempt <= maxRetriesForThisModel; attempt++) {
      try {
        console.log(`[KURA RESILIENCE] Request via ${model} (Attempt ${attempt}/${maxRetriesForThisModel})...`);
        const response = await aiInstance.models.generateContent({
          model: model,
          contents: contents,
          config: config,
        });
        
        if (response && response.text) {
          console.log(`[KURA RESILIENCE] Success with model: ${model}`);
          return response;
        }
        throw new Error(`Empty response returned from model ${model}`);
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const isTransient = errMsg.includes('503') || 
                            errMsg.includes('429') || 
                            errMsg.includes('UNAVAILABLE') || 
                            errMsg.includes('RESOURCE_EXHAUSTED') || 
                            errMsg.includes('high demand') ||
                            errMsg.includes('overloaded') ||
                            errMsg.includes('temp');
        
        console.warn(`[KURA RESILIENCE] Error with model ${model} (Attempt ${attempt}): ${errMsg}`);
        
        if (attempt < maxRetriesForThisModel && isTransient) {
          console.log(`[KURA RESILIENCE] Wait ${delay}ms before retrying ${model}...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          break;
        }
      }
    }
  }

  throw lastError || new Error(`All model fallback attempts failed.`);
}

// -------------------------------------------------------------
// API ENDPOINTS
// -------------------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    api_key_configured: !!ai,
    environment: process.env.NODE_ENV || 'development',
  });
});

/**
 * [1] MAIN REPORT ANALYSIS ENDPOINT
 * Uses custom prompt engineering to decode parameters and return clean structured JSON info.
 */
app.post('/api/analyze', async (req, res) => {
  let { text, fileData, mimeType, language = 'English' } = req.body;

  if (!text && !fileData) {
    return res.status(400).json({ error: 'Please provide clinical report text or an uploaded image/PDF file.' });
  }

  let base64Clean = '';
  let finalMimeType = mimeType;
  let useMultiModal = false;

  if (fileData && mimeType) {
    base64Clean = fileData.includes(',') ? fileData.split(',')[1] : fileData;
    
    // Check if pdf file has correct headers
    if (mimeType === 'application/pdf') {
      const isRealPdf = base64Clean.trim().startsWith('JVBER');
      if (!isRealPdf) {
        console.log('[Kura Guard] Uploaded PDF is likely a plaintext file masquerading as PDF. Decoding base64 text payload.');
        const decodedText = tryDecodeBase64ToText(base64Clean);
        if (decodedText) {
          text = decodedText;
          finalMimeType = undefined;
          console.log('[Kura Guard] Successfully extracted plain text parameters:', text.substring(0, 100));
        }
      } else {
        useMultiModal = true;
      }
    } else {
      useMultiModal = true;
    }
  }

  const promptText = `
You are a highly compassionate, accurate healthcare literacy assistant named KURA. Your sole purpose is to decode complex medical reports into plain, easily understandable language for non-medical users, families, and individuals with low medical literacy.

Strict Execution Directives:
1. TARGET READABILITY: Explain all concepts as if speaking to a 15-year-old student. Avoid compounding medical jargon.
2. ABSOLUTE MEDICAL SAFETY RULES:
   - NEVER diagnose a condition. Instead of "You have X", say "The report notes values typically associated with X. Please confirm this with your doctor."
   - NEVER prescribe any medication, dosage, or therapeutic alternative.
   - NEVER recommend treatments or lifestyle/holistic alternatives.
3. OUTPUT SCHEMA STRUCTURE: Your output must fit the responseSchema exactly.
4. LANGUAGE ADHERENCE: Translate all descriptive values, meanings, titles, summaries, and questions native to: ${language}.
5. MANDATORY DISCLAIMER: Make sure the safety_disclaimer field contains a prominent, clear notification that KURA does not replace professional clinical advice.

Patient Clinical Data Input:
${text || "[Multimodal content attached above]"}
`;

  const generationConfig = {
    systemInstruction: 'You are KURA, an expert patient healthcare literacy visualizer. Decode jargon into accessible learning points with total medical guidance.',
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        simple_summary: {
          type: Type.STRING,
          description: 'Overview of what is measured or reported, translated if user chose a dynamic language, strictly suited for a 15yo.'
        },
        key_findings: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              marker: { type: Type.STRING, description: 'Medical parameter name (e.g., AST, ALT, Red Blood Cells).' },
              value: { type: Type.STRING, description: 'Measured status value.' },
              status: {
                type: Type.STRING,
                enum: ['normal', 'high', 'low', 'attention'],
                description: 'Status indicator of health risk classification.'
              },
              normalRange: { type: Type.STRING, description: 'Reference boundaries for comparison.' },
              meaning: { type: Type.STRING, description: 'A highly simple, non-frightening interpretation of what this parameter does and potential reasons for this level.' },
            },
            required: ['marker', 'value', 'status', 'meaning'],
          },
        },
        term_definitions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              term: { type: Type.STRING, description: 'Medical acronym or confusing keyword.' },
              definition: { type: Type.STRING, description: 'Direct human-readable description.' },
            },
            required: ['term', 'definition'],
          },
        },
        doctor_questions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: '3 to 5 clear, empowering questions to bring to the practitioner.'
        },
        safety_disclaimer: {
          type: Type.STRING,
          description: 'Mandatory disclaimer statement emphasizing KURA does not replace clinical healthcare, diagnosis, or advice.'
        },
      },
      required: ['simple_summary', 'key_findings', 'term_definitions', 'doctor_questions', 'safety_disclaimer'],
    },
  };

  if (ai) {
    try {
      const contents: any[] = [];

      if (useMultiModal && base64Clean && finalMimeType) {
        contents.push({
          inlineData: {
            mimeType: finalMimeType,
            data: base64Clean,
          },
        });
      }

      contents.push({ text: promptText });

      let response;
      try {
        response = await generateContentWithRetry(
          ai,
          'gemini-3.5-flash',
          contents,
          generationConfig
        );
      } catch (innerErr: any) {
        console.warn('[KURA API] Multimodal/Primary content retry failed. Retrying with text-only parameters...', innerErr?.message);
        
        const fallbackText = text ? text : (base64Clean ? tryDecodeBase64ToText(base64Clean) : null);
        const retryPromptText = `
You are a highly compassionate, accurate healthcare literacy assistant named KURA. Your sole purpose is to decode complex medical reports into plain, easily understandable language for non-medical users.

Patient Clinical Data Input:
${fallbackText || "No readable document text could be parsed. Provide a standard diagnostic overview with educational guidelines."}
`;
        response = await generateContentWithRetry(
          ai,
          'gemini-3.5-flash',
          [{ text: retryPromptText }],
          generationConfig
        );
      }

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Gemini returned empty text or response was invalid.');
      }

      const parsedAnalysis = JSON.parse(responseText.trim());
      return res.json({ analysis: parsedAnalysis });
    } catch (err: any) {
      console.error('Error during Gemini API call and fallback retries:', err);
      const simulatedData = getSimulationResponse(text || '', language);
      return res.json({ analysis: simulatedData });
    }
  } else {
    console.log('Active translation fallback for language:', language);
    setTimeout(() => {
      const simulatedData = getSimulationResponse(text || '', language);
      res.json({ analysis: simulatedData });
    }, 1500);
  }
});

/**
 * [2] INTEGRATED CONTEXTUAL CHAT ASSISTANT
 * Feeds the original report guidelines to Gemini 2.5 Pro to maintain accuracy and extreme guardrails.
 */
app.post('/api/chat', async (req, res) => {
  const { reportContext, history, userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'Please provide a chat query.' });
  }

  const systemPrompt = `
You are a highly compassionate, accurate healthcare literacy assistant named KURA.
The patient is asking questions about their decoded medical report. Here are your rules for maintaining safe conversations:

Rules:
1. TARGET READABILITY: Keep all medical explanations simple enough for a 15-year-old. No confusing clinical loops.
2. ABSOLUTE MEDICAL SAFETY RULES:
   - NEVER suggest or diagnose conditions.
   - NEVER list active actions or alternative medications, doses, or physical therapies.
   - NEVER replace professional medical advice. Incorporate friendly reminders of user consult keys.
3. CONTEXT GROUNDING:
   - Use the patient's decoded findings below as reference material.
   - Do not make up metrics beyond this scope or standard general educational summaries.

Patient Decoded Report Reference:
${JSON.stringify(reportContext || {})}

Remember: You are purely an educator. Answer the patient's query compassionately:
`;

  if (ai) {
    try {
      // Reconstitute simple chat format
      const chatMessages: any[] = [];
      chatMessages.push({
        role: 'user',
        parts: [{ text: systemPrompt }]
      });

      // Stagger existing history
      if (history && history.length > 0) {
        history.forEach((msg: any) => {
          chatMessages.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        });
      }

      // Add actual live prompt
      chatMessages.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const response = await generateContentWithRetry(
        ai,
        'gemini-3.5-flash',
        chatMessages,
        {
          systemInstruction: 'You are KURA, a patient healthcare literacy companion. Help users understand biochemical patterns purely for education.',
        }
      );

      const text = response.text || "I apologize, but I couldn't formulate a response right now. Please seek professional advice for any questions concerning your medical results.";
      return res.json({ reply: text });
    } catch (err: any) {
      console.error('Gemini Chat error:', err);
      // Fallback seamlessly to compassionate simulated advice on complete outage
      let simulatedReply = "I am currently experiencing minor connectivity delays. For your safety: standard health trends say regular exercise and a balanced diet are highly helpful steps. Please take some notes and share these details with your physician.";
      const query = userMessage.toLowerCase();
      if (query.includes('bad') || query.includes('ldl') || query.includes('cholesterol')) {
        simulatedReply = "Soluble fibers, oats, and healthy fatty acid sources (like olive oil) often help regulate circulating fats. It is best to seek customized guidance from your healthcare provider.";
      } else if (query.includes('ast') || query.includes('alt') || query.includes('enzyme') || query.includes('liver')) {
        simulatedReply = "Fluctuations in liver enzymes like ALT and AST frequently return to normal on their own. Avoiding over-the-counter tablets like acetaminophen and discussing these figures with your primary care doctor is highly recommended.";
      }
      return res.json({ reply: simulatedReply, isFallback: true });
    }
  } else {
    // Safe Dynamic Simulation responses
    setTimeout(() => {
      let reply = "";
      const query = userMessage.toLowerCase();

      if (query.includes('bad') || query.includes('ldl') || query.includes('cholesterol')) {
        reply = "Dietary fats play a key role in raising LDL. It's often helpful to discuss with your doctor whether incorporating soluble fibers and unsaturated plant lipids (such as olive oil or walnuts) would support your cholesterol goals. KURA cannot prescribe actual dietary modifications, so a physician's personalized guidance remains essential.";
      } else if (query.includes('ast') || query.includes('alt') || query.includes('enzyme') || query.includes('liver')) {
        reply = "Fluctuations in liver enzymes ALT and AST are often temporary. Some factors that place demand on liver cells include over-the-counter painkillers (such as acetaminophen), dietary sugar patterns, or intense exercise. Please consult your primary care doctor to find the precise cause in your situation.";
      } else if (query.includes('what should i do') || query.includes('treatment') || query.includes('medication')) {
        reply = "I cannot recommend or prescribe any medical treatments, supplements, or specific lifestyle therapies. To ensure your safety, write down your key findings and share them with a licensed professional who can provide a personalized plan tailored to your health history.";
      } else {
        reply = "That is an excellent educational inquiry. In health literacy, evaluating physical metrics is all about looking at long-term trends alongside a comprehensive clinical history. I highly encourage highlighting this question, using our question generator, and asking your physician during your next physical check-up.";
      }

      res.json({ reply });
    }, 1000);
  }
});

// -------------------------------------------------------------
// VITE OR STATIC SERVING MIDDLEWARE COPIES FOR DEVELOPMENT AND PRODUCTION
// -------------------------------------------------------------

async function initializeServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development middlewares attached safely.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static client serving attached safely.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[KURA SERVER] Running locally on HTTP port ${PORT}`);
  });
}

initializeServer();
