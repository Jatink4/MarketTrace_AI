import express from 'express';
import { PipelineController } from '../controllers/pipelineController.js';
import { getDashboardSummary, getAnomalies, getAnomalyById } from '../controllers/dashboardController.js';
import { getDataSources, syncDataSource, generateReport } from '../controllers/narrativeController.js';

const router = express.Router();

// Datasets & Data Studio Ingestion
router.post('/datasets/upload', PipelineController.uploadDataset);
router.get('/datasets', PipelineController.getDatasets);
router.get('/datasets/:id', PipelineController.getDatasetById);
router.post('/datasets/:id/profile', PipelineController.profileDataset);
router.post('/datasets/:id/map', PipelineController.mapDataset);

// Analysis Execution & Results
router.post('/analysis/run', PipelineController.runAnalysis);
router.get('/analysis', PipelineController.getAnalyses);
router.get('/analysis/:id', PipelineController.getAnalysisById);
router.get('/analysis/:id/pipeline', PipelineController.getPipelineStages);
router.get('/analysis/:id/anomalies', PipelineController.getAnomalies);
router.get('/analysis/:id/decomposition', PipelineController.getDecomposition);
router.get('/analysis/:id/factors', PipelineController.getFactors);
router.get('/analysis/:id/hypotheses', PipelineController.getHypotheses);
router.get('/analysis/:id/evidence', PipelineController.getEvidence);
router.get('/analysis/:id/causal', PipelineController.getCausalAnalysis);
router.get('/analysis/:id/root-causes', PipelineController.getRootCauses);
router.post('/analysis/:id/narrative', PipelineController.getNarrative);
router.get('/analysis/:id/recommendations', PipelineController.getRecommendations);

// Compatibility with legacy investigation paths
router.get('/investigations/:id', PipelineController.getAnalysisById);
router.get('/investigations/:id/decomposition', PipelineController.getDecomposition);
router.get('/investigations/:id/hypotheses', PipelineController.getHypotheses);
router.post('/investigations/:id/narrative', PipelineController.getNarrative);
router.get('/investigations/:id/recommendations', PipelineController.getRecommendations);
router.get('/investigations/:id/report', generateReport);
router.get('/evidence', PipelineController.getEvidence);

// Dashboard Summary & Global Data Sources
router.get('/dashboard/summary', getDashboardSummary);
router.get('/anomalies', getAnomalies);
router.get('/anomalies/:id', getAnomalyById);
router.get('/datasources', getDataSources);
router.post('/datasources/:id/sync', syncDataSource);

// Feedback, Telemetry, Audit & Governance
router.post('/feedback', PipelineController.submitFeedback);
router.get('/feedback', PipelineController.getFeedback);
router.get('/telemetry/:analysisId', PipelineController.getTelemetry);
router.get('/audit', PipelineController.getAuditLogs);
router.get('/kpis', PipelineController.getKPIs);

export default router;
