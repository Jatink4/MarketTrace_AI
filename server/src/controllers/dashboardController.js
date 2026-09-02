import { AnalyticsService } from '../services/analyticsService.js';

export function getDashboardSummary(req, res, next) {
  try {
    const summary = AnalyticsService.getDashboardSummary();
    res.json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
}

export function getAnomalies(req, res, next) {
  try {
    const anomalies = AnalyticsService.getAnomalies();
    res.json({ success: true, count: anomalies.length, data: anomalies });
  } catch (error) {
    next(error);
  }
}

export function getAnomalyById(req, res, next) {
  try {
    const anomaly = AnalyticsService.getAnomalyById(req.params.id);
    if (!anomaly) {
      return res.status(404).json({ success: false, message: 'Anomaly not found' });
    }
    res.json({ success: true, data: anomaly });
  } catch (error) {
    next(error);
  }
}
