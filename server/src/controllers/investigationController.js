import { NarrativeService } from '../services/narrativeService.js';
import { AnalyticsService } from '../services/analyticsService.js';
import { AIService } from '../services/aiService.js';

export function getInvestigationById(req, res, next) {
  try {
    const inv = NarrativeService.getInvestigation(req.params.id);
    if (!inv) {
      return res.status(404).json({ success: false, message: 'Investigation not found' });
    }
    res.json({ success: true, data: inv });
  } catch (error) {
    next(error);
  }
}

export function getDecomposition(req, res, next) {
  try {
    const decomp = AnalyticsService.getDecomposition();
    res.json({ success: true, data: decomp });
  } catch (error) {
    next(error);
  }
}

export async function analyzeInvestigation(req, res, next) {
  try {
    const result = await AIService.runInvestigationAnalysis(req.params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export function getRecommendations(req, res, next) {
  try {
    const recs = NarrativeService.getRecommendations(req.params.id);
    res.json({ success: true, count: recs.length, data: recs });
  } catch (error) {
    next(error);
  }
}
