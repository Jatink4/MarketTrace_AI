import revenueContract from './revenue.json' with { type: 'json' };
import conversionContract from './conversionRate.json' with { type: 'json' };
import churnContract from './customerChurn.json' with { type: 'json' };
import aovContract from './averageOrderValue.json' with { type: 'json' };
import ordersContract from './orders.json' with { type: 'json' };

export const KPI_REGISTRY = {
  'Revenue': revenueContract,
  'kpi-revenue': revenueContract,
  'Conversion Rate': conversionContract,
  'kpi-conversion': conversionContract,
  'Customer Churn': churnContract,
  'kpi-churn': churnContract,
  'Average Order Value': aovContract,
  'kpi-aov': aovContract,
  'Orders': ordersContract,
  'kpi-orders': ordersContract
};

export class SemanticLayer {
  static getAllKPIs() {
    return [
      revenueContract,
      conversionContract,
      churnContract,
      aovContract,
      ordersContract
    ];
  }

  static getContract(kpiNameOrId) {
    if (!kpiNameOrId) return revenueContract;
    return KPI_REGISTRY[kpiNameOrId] || KPI_REGISTRY[kpiNameOrId.toLowerCase()] || revenueContract;
  }

  static validateMapping(kpiNameOrId, columnMapping) {
    const contract = this.getContract(kpiNameOrId);
    const requiredDims = contract.dimensions;
    const mappedFields = Object.keys(columnMapping);

    const missingDimensions = requiredDims.filter(d => !columnMapping[d]);
    const isValid = !!columnMapping.metric && !!columnMapping.date;

    return {
      isValid,
      kpi: contract.name,
      contract,
      mappedFields,
      missingDimensions,
      warning: missingDimensions.length > 0
        ? `Dataset lacks columns for dimensions: ${missingDimensions.join(', ')}. Decomposition will be partial.`
        : null
    };
  }
}
