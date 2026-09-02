/**
 * Mathematical & Statistical Utilities for MarketTrace AI Anomaly Detection & Scoring
 */

export function calculateZScore(actual, expected, historicalStd = 0.12) {
  if (!historicalStd || historicalStd === 0) return 0;
  return Number(((actual - expected) / historicalStd).toFixed(2));
}

export function calculateAnomalyScore(actual, expected, historicalStd = 0.12) {
  const deviation = Math.abs(actual - expected);
  const zScore = Math.abs(calculateZScore(actual, expected, historicalStd));
  // Anomaly score between 0 and 100
  const score = Math.min(99, Math.max(10, Math.round(zScore * 28 + (deviation / expected) * 200)));
  return score;
}

export function calculateContributionPct(segmentLoss, totalLoss) {
  if (totalLoss === 0) return 0;
  return Number(((segmentLoss / totalLoss) * 100).toFixed(1));
}

export function formatCurrency(amount, currency = '$') {
  if (amount >= 1000000) {
    return `${currency}${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount >= 1000) {
    return `${currency}${(amount / 1000).toFixed(1)}K`;
  }
  return `${currency}${amount.toFixed(2)}`;
}
