import { SemanticLayer } from '../semantic/kpiRegistry.js';

export class SemanticMappingService {
  /**
   * Auto-suggest column mappings for a chosen KPI
   */
  static suggestMappings(kpiNameOrId, columnNames = []) {
    const contract = SemanticLayer.getContract(kpiNameOrId);
    const mapping = {
      kpi: contract.name,
      metric: null,
      date: null,
      dimensions: {}
    };

    const cols = columnNames.map(c => ({ original: c, lower: c.toLowerCase() }));

    // Find metric
    const metricCandidates = ['revenue', 'amount', 'val', 'deal_value', 'sales', 'units_sold', 'converted_deals', 'quantity'];
    for (const cand of metricCandidates) {
      const match = cols.find(c => c.lower === cand || c.lower.includes(cand));
      if (match) {
        mapping.metric = match.original;
        break;
      }
    }
    if (!mapping.metric && cols.length > 0) {
      // fallback to first numeric column if available
      mapping.metric = cols[cols.length - 1].original;
    }

    // Find date
    const dateCandidates = ['date', 'transaction_date', 'timestamp', 'created_at', 'day', 'time'];
    for (const cand of dateCandidates) {
      const match = cols.find(c => c.lower === cand || c.lower.includes(cand));
      if (match) {
        mapping.date = match.original;
        break;
      }
    }

    // Find contract dimensions
    contract.dimensions.forEach(dim => {
      const dimLower = dim.toLowerCase();
      const match = cols.find(c => {
        const l = c.lower;
        if (l === dimLower) return true;
        if (dimLower === 'customer_segment' && (l.includes('segment') || l.includes('customer_type') || l.includes('tier'))) return true;
        if (dimLower === 'region' && (l.includes('region') || l.includes('geography') || l.includes('country'))) return true;
        if (dimLower === 'product' && (l.includes('product') || l.includes('sku') || l.includes('item'))) return true;
        if (dimLower === 'channel' && (l.includes('channel') || l.includes('source') || l.includes('route'))) return true;
        return false;
      });

      if (match) {
        mapping.dimensions[dim] = match.original;
      } else {
        mapping.dimensions[dim] = null;
      }
    });

    return {
      kpi: contract.name,
      contract,
      suggestedMapping: mapping,
      confidenceScore: (mapping.metric && mapping.date) ? 95 : 60
    };
  }
}
