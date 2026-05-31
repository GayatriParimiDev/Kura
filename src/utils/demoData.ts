import { UserReport } from '../types';

export const DEMO_REPORTS: UserReport[] = [
  {
    id: 'demo-lipid-panel-2026',
    fileName: 'Lipid_Panel_Report_May_2026.pdf',
    date: 'May 15, 2026',
    fileSize: '1.4 MB',
    language: 'English',
    status: 'analyzed',
    rawText: `
      LABORATORY ANALYSIS REPORT
      PATIENT ID: K-48291
      COLLECTION DATE: 2026-05-15
      
      TEST NAME             VALUE       UNIT      REFERENCE RANGE     STATUS
      Total Cholesterol     245         mg/dL     < 200               HIGH
      HDL Cholesterol       42          mg/dL     > 40                NORMAL
      LDL Cholesterol (Calc) 168        mg/dL     < 100               HIGH
      Triglycerides         175         mg/dL     < 150               HIGH
    `,
    analysis: {
      simple_summary: "Your overall blood fats (lipids) are higher than what is typically recommended for optimal heart health. Specifically, your total cholesterol and 'bad' LDL cholesterol are elevated, while your 'good' HDL cholesterol is in a healthy, supportive range. Triglycerides are also slightly high.",
      key_findings: [
        {
          marker: "Total Cholesterol",
          value: "245 mg/dL",
          status: "high",
          normalRange: "Less than 200 mg/dL",
          meaning: "This is your combined blood cholesterol level. Values above 200 are considered elevated. It points to a build-up of fats which can settle on arterial walls over time."
        },
        {
          marker: "HDL Cholesterol",
          value: "42 mg/dL",
          status: "normal",
          normalRange: "Greater than 40 mg/dL",
          meaning: "Often called 'good' cholesterol because it acts like a microscopic vacuum cleaner, clearing excess cholesterol from your bloodstream. Yours is currently in a safe and supportive range."
        },
        {
          marker: "LDL Cholesterol",
          value: "168 mg/dL",
          status: "high",
          normalRange: "Less than 100 mg/dL",
          meaning: "Known as 'bad' cholesterol because extra LDL can narrow blood vessels. Your level of 168 is elevated. This is a primary driver to discuss with your provider."
        },
        {
          marker: "Triglycerides",
          value: "175 mg/dL",
          status: "high",
          normalRange: "Less than 150 mg/dL",
          meaning: "A type of fat found in your blood used for physical energy. High levels are common if dietary sugars or processed carbs are elevated. Your level is slightly high."
        }
      ],
      term_definitions: [
        {
          term: "Lipid Panel",
          definition: "A panel of simple blood tests that measure the different types of fat molecules circulating in your bloodstream."
        },
        {
          term: "LDL (Low-Density Lipoprotein)",
          definition: "A protein-bound fat molecule that delivers cholesterol to cells. When in excess, it is prone to building sticky plaque on blood vessel walls."
        },
        {
          term: "HDL (High-Density Lipoprotein)",
          definition: "A helpful molecule that safely carries cholesterol away from blood vessels back to the liver to be recycled or processed out of your body."
        },
        {
          term: "Triglycerides",
          definition: "The most common form of physical fat stored in the body, derived from uneated food calories and used for long-term cell energy."
        }
      ],
      doctor_questions: [
        "What target LDL level should we aim for based on my overall health history?",
        "Would you recommend starting with specific dietary adjustments or do you feel medical therapy is indicated at this stage?",
        "When would you like to re-test my lipids to evaluate any ongoing trends or changes?",
        "How do these numbers relate to standard indicators like my blood pressure and fasting blood sugar?"
      ],
      safety_disclaimer: "Every healthy individual has different optimal lipid targets based on family history and overall wellness. This feedback is educational and must be discussed directly with your primary care provider."
    },
    chatHistory: [
      {
        id: 'msg-init-1',
        role: 'model',
        text: "Hello! I am KURA, your dedicated medical literacy assistant. I've broken down your May 2026 Lipid Panel. What educational questions do you have about these specific cholesterol parameters?",
        timestamp: '2026-05-15T14:30:00Z'
      }
    ],
    comparisonMetrics: [
      {
        marker: "Total Cholesterol",
        trend: "Decreased by 15 mg/dL since last year",
        changePercent: 5.7,
        direction: "down",
        sentiment: "better"
      },
      {
        marker: "LDL Cholesterol",
        trend: "Decreased by 12 mg/dL",
        changePercent: 6.6,
        direction: "down",
        sentiment: "better"
      },
      {
        marker: "Triglycerides",
        trend: "Increased by 20 mg/dL",
        changePercent: 12.9,
        direction: "up",
        sentiment: "worse"
      }
    ]
  },
  {
    id: 'demo-liver-function-2026',
    fileName: 'Comprehensive_Metabolic_Panel_Liver.pdf',
    date: 'April 22, 2026',
    fileSize: '950 KB',
    language: 'English',
    status: 'analyzed',
    rawText: `
      METABOLIC LABS INC.
      CMP LIVER HEALTH REVIEW
      
      TEST NAME             VALUE       UNIT      RANGE               STATUS
      ALT (Alanine Trans.)  78          U/L       7 - 56              HIGH
      AST (Aspartate Trans.) 49         U/L       10 - 40             HIGH
      Total Bilirubin       0.9         mg/dL     0.1 - 1.2           NORMAL
      Alkaline Phosphatase  82          U/L       44 - 147            NORMAL
    `,
    analysis: {
      simple_summary: "Your liver enzyme levels (ALT and AST) are slightly above the standard healthy references. These enzymes live inside your liver cells and can spill into your bloodstream when the liver experiences temporary stress or mild inflammation, which could be from medications, everyday metabolic processes, or other factors.",
      key_findings: [
        {
          marker: "ALT (Alanine Aminotransferase)",
          value: "78 U/L",
          status: "high",
          normalRange: "7 - 56 U/L",
          meaning: "An enzyme found predominantly in your liver. Slightly raised levels indicate that liver cells are experiencing some mild stress or temporary irritation."
        },
        {
          marker: "AST (Aspartate Aminotransferase)",
          value: "49 U/L",
          status: "high",
          normalRange: "10 - 40 U/L",
          meaning: "An enzyme present in liver cells as well as skeletal muscle and heart muscle. A slight elevation corresponds closely to the liver irritation seen in your ALT."
        },
        {
          marker: "Total Bilirubin",
          value: "0.9 mg/dL",
          status: "normal",
          normalRange: "0.1 - 1.2 mg/dL",
          meaning: "A natural yellowish byproduct formed when old red blood cells are cycled out. Normal bilirubin indicates your liver is successfully filtering and processing this pigment."
        }
      ],
      term_definitions: [
        {
          term: "ALT and AST",
          definition: "Specialized protein enzymes that assist in cellular metabolism within the liver. They act as markers for liver tissue irritation when found elevated in the bloodstream."
        },
        {
          term: "Bilirubin",
          definition: "A waste compound produced during the steady breakdown of red cells. The liver breaks this down and secretes it safely in bile."
        }
      ],
      doctor_questions: [
        "Do you think my current dosage of continuous medications could be causing these minor liver stress enzymes?",
        "Are there specific vitamins, supplements, or dietary habits I should alter to support my liver tissue?",
        "Should we establish a timeline to repeat this hepatic metabolic screen?"
      ],
      safety_disclaimer: "Minor liver enzyme alterations are highly common and can resolve naturally. Only a certified healthcare professional can evaluate these coordinates with your actual lifestyle."
    },
    chatHistory: [
      {
        id: 'msg-init-2',
        role: 'model',
        text: "Hi support seeker. I have mapped out your Liver Health analysis. I am here to clarify any aspect of ALT, AST or liver metabolic cycles in plain language.",
        timestamp: '2026-04-22T10:15:00Z'
      }
    ],
    comparisonMetrics: [
      {
        marker: "ALT",
        trend: "Increased by 12 U/L since winter",
        changePercent: 18.1,
        direction: "up",
        sentiment: "worse"
      },
      {
        marker: "AST",
        trend: "Stable (no change)",
        changePercent: 0,
        direction: "stable",
        sentiment: "neutral"
      }
    ]
  }
];
