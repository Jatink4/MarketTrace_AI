import { EvidenceService } from '../services/evidenceService.js';
import { HypothesisService } from '../services/hypothesisService.js';

export function getEvidence(req, res, next) {
  try {
    const filters = {
      source: req.query.source,
      hypothesisId: req.query.hypothesisId,
      query: req.query.q
    };
    const evidence = EvidenceService.getAllEvidence(filters);
    res.json({ success: true, count: evidence.length, data: evidence });
  } catch (error) {
    next(error);
  }
}

export function getEvidenceById(req, res, next) {
  try {
    const item = EvidenceService.getEvidenceById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Evidence not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export function getHypotheses(req, res, next) {
  try {
    const hypotheses = HypothesisService.getHypotheses();
    res.json({ success: true, count: hypotheses.length, data: hypotheses });
  } catch (error) {
    next(error);
  }
}

export function validateHypothesis(req, res, next) {
  try {
    const result = HypothesisService.validateHypothesis(req.params.hypothesisId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Hypothesis not found' });
    }
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
