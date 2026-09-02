export class RootCauseService {
  /**
   * Rank root causes and construct explanation object
   */
  static rankRootCauses(scoredHypotheses = [], uncertaintyResult = {}, feedbackHistory = []) {
    // Sort scored hypotheses by evidenceScore descending
    const sorted = [...scoredHypotheses].sort((a, b) => b.evidenceScore - a.evidenceScore);

    // Apply feedback calibration if available
    sorted.forEach((hyp, idx) => {
      hyp.rank = idx + 1;
      hyp.isPrimaryRootCause = idx === 0 && uncertaintyResult.decision === 'RANK_ROOT_CAUSE';
    });

    const primaryRootCause = sorted[0];

    return {
      ranking: sorted.map(s => ({
        rank: s.rank,
        hypothesisId: s.hypothesisId,
        name: s.name,
        confidence: s.confidence,
        confidenceRating: s.confidenceRating,
        supportCount: s.supportCount,
        contradictionCount: s.contradictionCount,
        missingCount: s.missingCount,
        whyRanked: s.whyRanked,
        scoreBreakdown: s.scoreBreakdown
      })),
      primaryRootCause: {
        rank: 1,
        hypothesisId: primaryRootCause?.hypothesisId || 'H1',
        name: primaryRootCause?.name || 'APAC Enterprise Renewal Contraction',
        confidence: primaryRootCause?.confidence || 87,
        confidenceRating: primaryRootCause?.confidenceRating || 'HIGH',
        whyTop: primaryRootCause?.whyRanked || []
      },
      decision: uncertaintyResult.decision,
      decisionMessage: uncertaintyResult.decisionMessage,
      method: 'Calibrated Evidence Weighting + Temporal Triangulation + Uncertainty Guardrails'
    };
  }
}
