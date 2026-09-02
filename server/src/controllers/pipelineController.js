import { DBStore } from '../db/store.js';
import { DataIngestionService } from '../services/dataIngestionService.js';
import { DataProfilingService } from '../services/dataProfilingService.js';
import { SemanticMappingService } from '../services/semanticMappingService.js';
import { PipelineOrchestrator } from '../services/pipelineOrchestrator.js';
import { FeedbackService } from '../services/feedbackService.js';
import { TelemetryService, AuditService } from '../services/telemetryService.js';
import { SemanticLayer } from '../semantic/kpiRegistry.js';
import { LLMService } from '../services/llmService.js';

export class PipelineController {
  // Datasets
  static async uploadDataset(req, res, next) {
    try {
      const { filename, content, grain, refreshCadence } = req.body;
      if (!content) {
        return res.status(400).json({ success: false, message: 'Content is required for dataset upload' });
      }

      const safeFilename = filename || `upload_${Date.now()}.csv`;
      const parsed = DataIngestionService.parseRawContent(safeFilename, content);
      const datasetId = `ds-${Date.now()}`;

      const dataset = {
        id: datasetId,
        filename: safeFilename,
        grain: grain || parsed.detectedGrain || 'Transaction',
        refreshCadence: refreshCadence || 'Daily',
        rowCount: parsed.rowCount,
        columns: parsed.columns,
        rows: parsed.rows,
        uploadedAt: new Date().toISOString()
      };

      DBStore.saveDataset(dataset);
      const profile = DataProfilingService.profileDataset(dataset);

      DBStore.logAudit({
        user: req.headers['x-user'] || 'Alex Morgan',
        role: req.headers['x-role'] || 'Data Analyst',
        kpi: 'Dataset Ingestion',
        dataAccessed: safeFilename,
        analysisType: 'Data Studio Ingestion',
        actionTaken: 'Upload & Profile',
        policyEnforced: 'Compliant'
      });

      res.json({
        success: true,
        data: {
          dataset: {
            id: dataset.id,
            filename: dataset.filename,
            grain: dataset.grain,
            rowCount: dataset.rowCount,
            columns: dataset.columns
          },
          profile
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static getDatasets(req, res, next) {
    try {
      const datasets = DBStore.getDatasets().map(d => ({
        id: d.id,
        filename: d.filename,
        grain: d.grain,
        refreshCadence: d.refreshCadence,
        rowCount: d.rowCount,
        columns: d.columns,
        uploadedAt: d.uploadedAt
      }));
      res.json({ success: true, count: datasets.length, data: datasets });
    } catch (err) {
      next(err);
    }
  }

  static getDatasetById(req, res, next) {
    try {
      const dataset = DBStore.getDatasetById(req.params.id);
      if (!dataset) {
        return res.status(404).json({ success: false, message: 'Dataset not found' });
      }
      res.json({ success: true, data: dataset });
    } catch (err) {
      next(err);
    }
  }

  static profileDataset(req, res, next) {
    try {
      const dataset = DBStore.getDatasetById(req.params.id);
      if (!dataset) {
        return res.status(404).json({ success: false, message: 'Dataset not found' });
      }
      const profile = DataProfilingService.profileDataset(dataset);
      res.json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  }

  static mapDataset(req, res, next) {
    try {
      const { kpi, columnMapping } = req.body;
      const dataset = DBStore.getDatasetById(req.params.id);
      const cols = dataset ? dataset.columns : [];

      if (!columnMapping) {
        const suggested = SemanticMappingService.suggestMappings(kpi || 'Revenue', cols);
        return res.json({ success: true, data: suggested });
      }

      const validation = SemanticLayer.validateMapping(kpi || 'Revenue', columnMapping);
      res.json({ success: true, data: validation });
    } catch (err) {
      next(err);
    }
  }

  // LLM Engine Configuration & Live Test
  static getLLMConfig(req, res, next) {
    try {
      res.json({ success: true, data: LLMService.getConfig() });
    } catch (err) {
      next(err);
    }
  }

  static setLLMConfig(req, res, next) {
    try {
      const config = LLMService.setConfig(req.body);
      res.json({ success: true, data: config, message: 'LLM settings updated successfully.' });
    } catch (err) {
      next(err);
    }
  }

  static async testLLMConnection(req, res, next) {
    try {
      const result = await LLMService.testConnection(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // Analysis Execution
  static async runAnalysis(req, res, next) {
    try {
      const { datasetId, kpi, columnMapping, persona, scenarioKey, rawContent, filename, llmConfig } = req.body;
      const analysis = await PipelineOrchestrator.runAnalysis(datasetId, {
        kpi: kpi || 'Revenue',
        columnMapping,
        persona: persona || 'executive',
        scenarioKey,
        rawContent,
        filename,
        llmConfig,
        user: req.headers['x-user'] || 'Alex Morgan',
        role: req.headers['x-role'] || 'Data Analyst'
      });

      res.json({ success: true, data: analysis });
    } catch (err) {
      next(err);
    }
  }

  static getAnalyses(req, res, next) {
    try {
      const list = DBStore.getAnalyses().map(a => ({
        id: a.analysisId || a.id,
        analysisId: a.analysisId || a.id,
        title: a.title,
        kpi: a.kpi,
        changePct: a.changePct,
        status: a.status,
        createdAt: a.createdAt
      }));
      res.json({ success: true, count: list.length, data: list });
    } catch (err) {
      next(err);
    }
  }

  static getAnalysisById(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) {
        return res.status(404).json({ success: false, message: 'Investigation analysis not found' });
      }

      // Check RBAC
      const role = req.headers['x-role'] || 'Data Analyst';
      const access = AuditService.checkAccess(role, analysis.kpi);
      if (!access.allowed) {
        return res.status(403).json({ success: false, message: access.reason, restricted: true });
      }

      res.json({ success: true, data: analysis });
    } catch (err) {
      next(err);
    }
  }

  // Stage-by-stage granular endpoints
  static getPipelineStages(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: analysis.pipelineExecution });
    } catch (err) {
      next(err);
    }
  }

  static getAnomalies(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({
        success: true,
        data: {
          kpi: analysis.kpi,
          currentValue: analysis.currentValue,
          previousValue: analysis.previousValue,
          changePct: analysis.changePct,
          anomalyScore: analysis.anomalyScore,
          zScore: analysis.zScore,
          series: analysis.trendSeries
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static getDecomposition(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: analysis.decompositionSummary || analysis.decomposition });
    } catch (err) {
      next(err);
    }
  }

  static getFactors(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: { factors: analysis.factors, drivers: analysis.drivers, waterfall: analysis.waterfall } });
    } catch (err) {
      next(err);
    }
  }

  static getHypotheses(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: analysis.hypotheses });
    } catch (err) {
      next(err);
    }
  }

  static getEvidence(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id || 'inv-novacommerce-01');
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: analysis.allEvidenceFlat || [] });
    } catch (err) {
      next(err);
    }
  }

  static getCausalAnalysis(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: analysis.causalAnalysis });
    } catch (err) {
      next(err);
    }
  }

  static getRootCauses(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: analysis.rootCauses });
    } catch (err) {
      next(err);
    }
  }

  static getNarrative(req, res, next) {
    try {
      const persona = (req.body?.persona || req.query?.persona || 'executive').toLowerCase();
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });

      const story = analysis.personaNarratives?.[persona] || analysis.personaNarratives?.executive;
      res.json({ success: true, data: story });
    } catch (err) {
      next(err);
    }
  }

  static getRecommendations(req, res, next) {
    try {
      const analysis = DBStore.getAnalysisById(req.params.id);
      if (!analysis) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: analysis.recommendations });
    } catch (err) {
      next(err);
    }
  }

  // Feedback & Learning Loop
  static submitFeedback(req, res, next) {
    try {
      const result = FeedbackService.submitFeedback(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static getFeedback(req, res, next) {
    try {
      const summary = FeedbackService.getFeedbackSummary();
      res.json({ success: true, data: summary });
    } catch (err) {
      next(err);
    }
  }

  // Telemetry & Audit
  static getTelemetry(req, res, next) {
    try {
      const telemetry = TelemetryService.getTelemetry(req.params.analysisId);
      res.json({ success: true, data: telemetry });
    } catch (err) {
      next(err);
    }
  }

  static getAuditLogs(req, res, next) {
    try {
      const logs = AuditService.getLogs();
      res.json({ success: true, count: logs.length, data: logs });
    } catch (err) {
      next(err);
    }
  }

  static getKPIs(req, res, next) {
    try {
      const kpis = SemanticLayer.getAllKPIs();
      res.json({ success: true, data: kpis });
    } catch (err) {
      next(err);
    }
  }
}
