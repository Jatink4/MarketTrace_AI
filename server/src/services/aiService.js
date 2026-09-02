import datasourcesData from '../data/datasources.json' with { type: 'json' };

export class AIService {
  static async runInvestigationAnalysis(investigationId) {
    // Simulates AI orchestration pipeline latency & returns structured diagnosis
    return {
      status: 'SUCCESS',
      investigationId,
      modelProvider: process.env.AI_PROVIDER || 'deterministic-grounded-ai',
      analysisStages: {
        detect: { anomalyScore: 94, zScore: -3.42, deviation: '-8.2%' },
        decompose: { primaryRegion: 'APAC', primarySegment: 'Enterprise Renewals', sharePct: 62.2 },
        investigate: { retrievedSignals: 16, crossCorroborated: 12, conflicting: 4 },
        validate: { topHypothesis: 'APAC Enterprise Renewal Decline', confidencePct: 87, temporalPrecedence: 'CONFIRMED' },
        explain: { personasGenerated: ['Executive', 'Sales Manager', 'Product Manager', 'Data Analyst'] },
        act: { actionableLevers: 3, highestPriority: 'Deploy APAC Technical SWAT Team' }
      },
      runtimeTelemetry: {
        latencyMs: 820,
        tokenCount: 2450,
        estimatedCost: '$0.014'
      }
    };
  }

  static getDataSources() {
    return datasourcesData;
  }

  static syncDataSource(id) {
    const ds = datasourcesData.find(d => d.id === id);
    if (ds) {
      ds.lastSynced = 'Just now';
      ds.status = 'Connected';
    }
    return ds || { id, status: 'Connected', lastSynced: 'Just now' };
  }
}
