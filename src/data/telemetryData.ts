export const ARCHITECTURE_PIPELINE_STAGES = [
  {
    id: 'stage-1',
    name: '1. DATA SOURCES',
    subtext: 'Heterogeneous Enterprise Systems',
    items: ['Sales ERP (Hourly)', 'CRM Salesforce (Daily)', 'Zendesk (Streaming)', 'ClickHouse Telemetry (Daily)', 'Market Intelligence (Weekly)'],
    badge: 'Multi-Grain Ingestion',
    color: '#3B82F6'
  },
  {
    id: 'stage-2',
    name: '2. DATA RECONCILIATION',
    subtext: 'Deterministic Semantic Layer',
    items: ['Schema Normalization', 'Grain Alignment (Hourly → Day)', 'Freshness SLA Enforcer', 'Governed KPI Definitions', 'Row & Column Masking'],
    badge: 'Governed Semantics',
    color: '#6366F1'
  },
  {
    id: 'stage-3',
    name: '3. ANALYTICAL ENGINE',
    subtext: 'Non-LLM Mathematical Layer',
    items: ['Deterministic SQL Execution', 'Holt-Winters ARIMA Anomaly Gates', 'Statistical Z-Score (p < 0.001)', 'Multi-Factor Contribution Analysis', 'Causal Inference Checks'],
    badge: 'Deterministic Truth',
    color: '#8B5CF6'
  },
  {
    id: 'stage-4',
    name: '4. EVIDENCE ENGINE',
    subtext: 'Cross-Source Triangulation',
    items: ['Supporting Evidence Scorer', 'Contradicting Signal Detector', 'Missing Telemetry Auditor', 'Temporal Precedence Validator'],
    badge: 'Evidence Strength (0-100)',
    color: '#EC4899'
  },
  {
    id: 'stage-5',
    name: '5. CONFIDENCE & ABSTENTION',
    subtext: 'Statistical Guardrails',
    items: ['Collinearity Separation Test', 'Sparse History Detection (n < 26 wks)', 'Abstention Decision Gates', 'Uncertainty Calibration'],
    badge: 'Responsible Guardrails',
    color: '#F59E0B'
  },
  {
    id: 'stage-6',
    name: '6. LLM ORCHESTRATION LAYER',
    subtext: 'Compact Context & Synthesis',
    items: ['Intent Classification', 'Context Retrieval (3.4k Tokens)', 'Persona Narrative Synthesis', 'Natural Language Storytelling'],
    badge: 'LLM Role: Synthesis Only',
    color: '#10B981'
  },
  {
    id: 'stage-7',
    name: '7. ACTION RECOMMENDATION ENGINE',
    subtext: 'Governed Decision Rights',
    items: ['Driver → Controllable Lever Mapping', 'Role-Based Action Filtering', 'Action Confidence Scoring', 'Automated Monitoring Metrics'],
    badge: 'Governed Levers',
    color: '#06B6D4'
  },
  {
    id: 'stage-8',
    name: '8. HUMAN FEEDBACK LOOP',
    subtext: 'Analyst Evaluation & Calibration',
    items: ['Analyst Correction Submissions', 'Hypothesis Calibration Storage', 'Precision Tracking (76% → 84%)', 'Benchmark Drift Monitoring'],
    badge: 'Human-in-the-Loop',
    color: '#64748B'
  }
];

export const LLM_VS_NON_LLM_COMPARISON = [
  {
    capability: 'KPI Calculations & Formulas',
    nonLlmLayer: 'Deterministic SQL in semantic layer (SUM, COUNT, cohorts)',
    llmLayer: 'Zero calculations (strictly consumes pre-calculated metrics)',
    status: 'Non-LLM Owned'
  },
  {
    capability: 'Materiality & Anomaly Detection',
    nonLlmLayer: 'Statistical Z-score & Holt-Winters ARIMA confidence bands',
    llmLayer: 'Summarizes whether movement breached the statistical threshold',
    status: 'Non-LLM Owned'
  },
  {
    capability: 'Driver Decomposition (Waterfall)',
    nonLlmLayer: 'Deterministic contribution analysis (Volume, Churn, Price, Mix)',
    llmLayer: 'Explains the business narrative behind the top contribution factor',
    status: 'Non-LLM Owned'
  },
  {
    capability: 'Evidence Strength Scoring',
    nonLlmLayer: 'Cross-source empirical triangulation algorithm (0–100 score)',
    llmLayer: 'Orchestrates supporting vs contradicting record excerpts',
    status: 'Non-LLM Owned'
  },
  {
    capability: 'Abstention & Guardrails',
    nonLlmLayer: 'Collinearity test and sample-size minimum bounds (n < 26 wks)',
    llmLayer: 'Generates transparent explanation of why engine abstained',
    status: 'Non-LLM Owned'
  },
  {
    capability: 'Row-Level Security & Masking',
    nonLlmLayer: 'Deterministic database & gateway RBAC policy enforcement',
    llmLayer: 'Zero access to restricted fields (receives masked payload)',
    status: 'Non-LLM Owned'
  },
  {
    capability: 'Persona Story Adaptation',
    nonLlmLayer: 'Supplies identical underlying metrics & evidence objects',
    llmLayer: 'Tailors communication style, focus, and recommendations for CEO/PM',
    status: 'LLM Owned'
  },
  {
    capability: 'Natural Language Synthesis',
    nonLlmLayer: 'Extracts structured evidence tuples',
    llmLayer: 'Generates cohesive, executive-ready diagnostic paragraphs',
    status: 'LLM Owned'
  }
];

export const TELEMETRY_METRICS = {
  avgLatencySec: 2.8,
  llmCallsCount: 2,
  tokensUsed: 3420,
  estimatedCostUsd: 0.018,
  cacheHitRatePct: 64,
  latencyBreakdown: {
    sqlMs: 420,
    retrievalMs: 310,
    llmMs: 1200,
    renderMs: 870
  },
  insightsStats: {
    generated: 1284,
    failed: 3,
    abstained: 94
  },
  costComparison: {
    naiveRawLlmCost: 0.42, // $0.42 per query if dumping raw 50MB logs
    marketTraceCompactCost: 0.018, // $0.018 with pre-aggregated analytical evidence
    savingsPct: 95.7,
    tokenReduction: '92% context size reduction via analytical filtering'
  }
};
