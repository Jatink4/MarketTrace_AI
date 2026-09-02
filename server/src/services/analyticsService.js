import { calculateZScore, calculateAnomalyScore, calculateContributionPct } from '../utils/mathUtils.js';
import anomaliesData from '../data/anomalies.json' with { type: 'json' };
import revenueData from '../data/revenue.json' with { type: 'json' };
import salesData from '../data/sales.json' with { type: 'json' };

export class AnalyticsService {
  static getDashboardSummary() {
    const totalAnomalies = anomaliesData.length;
    const highPriority = anomaliesData.filter(a => a.severity === 'HIGH').length;
    const avgConfidence = 84;
    const evidenceCoverage = 78;

    return {
      company: 'NovaCommerce',
      period: 'August 2026',
      kpiSummary: {
        revenue: {
          current: '$4.82M',
          previous: '$5.25M',
          changePct: -8.2,
          status: 'CRITICAL_ANOMALY',
          anomalyScore: 94
        },
        conversionRate: {
          current: '18.4%',
          previous: '20.8%',
          changePct: -11.4,
          status: 'HIGH_ANOMALY',
          anomalyScore: 86
        },
        customerChurn: {
          current: '5.9%',
          previous: '5.6%',
          changePct: 4.8,
          status: 'ELEVATED',
          anomalyScore: 72
        },
        avgContractValue: {
          current: '$42.5K',
          previous: '$43.9K',
          changePct: -3.2,
          status: 'NORMAL',
          anomalyScore: 58
        }
      },
      stats: {
        activeAnomalies: totalAnomalies,
        highPriorityCount: highPriority,
        evidenceCoveragePct: evidenceCoverage,
        avgConfidencePct: avgConfidence,
        dataFreshness: '2 mins ago (Real-time sync)'
      }
    };
  }

  static getAnomalies() {
    return anomaliesData;
  }

  static getAnomalyById(id) {
    return anomaliesData.find(a => a.id === id) || null;
  }

  static getRevenueSeries() {
    return revenueData;
  }

  static getDecomposition() {
    return salesData;
  }
}
