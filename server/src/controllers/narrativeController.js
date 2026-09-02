import { NarrativeService } from '../services/narrativeService.js';
import { AIService } from '../services/aiService.js';

export function getNarrative(req, res, next) {
  try {
    const persona = req.body?.persona || req.query?.persona || 'executive';
    const investigationId = req.params.id || 'inv-novacommerce-01';
    const narrative = NarrativeService.getNarrative(investigationId, persona);
    res.json({ success: true, data: narrative });
  } catch (error) {
    next(error);
  }
}

export function getDataSources(req, res, next) {
  try {
    const ds = AIService.getDataSources();
    res.json({ success: true, count: ds.length, data: ds });
  } catch (error) {
    next(error);
  }
}

export function syncDataSource(req, res, next) {
  try {
    const synced = AIService.syncDataSource(req.params.id);
    res.json({ success: true, message: 'Data source synced successfully', data: synced });
  } catch (error) {
    next(error);
  }
}

export function generateReport(req, res, next) {
  try {
    const investigationId = req.params.id || 'inv-novacommerce-01';
    const persona = req.query.persona || 'executive';
    const inv = NarrativeService.getInvestigation(investigationId);
    const narrative = NarrativeService.getNarrative(investigationId, persona);

    const report = {
      title: `MarketTrace AI Diagnostic Report: ${inv.title}`,
      generatedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      company: inv.company,
      kpiAnomaly: {
        kpi: inv.kpi,
        observed: inv.currentValue,
        expected: inv.expectedValue,
        variance: `${inv.changePct}%`,
        anomalyScore: inv.anomalyScore,
        severity: inv.severity
      },
      diagnosticSummary: narrative,
      primaryRootCause: {
        name: inv.primaryDriver,
        confidence: `${inv.confidenceScore}%`,
        classification: inv.confidenceLevel
      },
      recommendedActions: inv.recommendations,
      dataLimitations: {
        coverage: `${inv.evidenceCoveragePct}%`,
        completeness: `${inv.dataCompletenessPct}%`,
        missingGaps: ["Detailed customer exit interviews", "Gateway packet error rate telemetry"]
      },
      auditSignature: "Verified by MarketTrace AI Governed Analytics Engine"
    };

    res.json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
}
