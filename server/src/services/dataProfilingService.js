export class DataProfilingService {
  /**
   * Profile a dataset and return deep metadata, column stats, quality score, and warnings
   */
  static profileDataset(dataset) {
    const { rows, columns, filename } = dataset;
    if (!rows || rows.length === 0) {
      return {
        filename,
        rowCount: 0,
        columnCount: 0,
        columns: [],
        dataQualityScore: 0,
        warnings: ['Dataset contains 0 rows'],
        detectedGrain: 'Unknown',
        dateRange: null
      };
    }

    const columnProfiles = [];
    const warnings = [];
    let detectedDateCol = null;
    let detectedMetricCols = [];
    let minDate = null;
    let maxDate = null;

    columns.forEach(col => {
      let nullCount = 0;
      let numericCount = 0;
      let dateCount = 0;
      let distinctValues = new Set();
      let sum = 0;
      let min = Infinity;
      let max = -Infinity;

      rows.forEach(r => {
        const val = r[col];
        if (val === null || val === undefined || val === '') {
          nullCount++;
          return;
        }

        distinctValues.add(String(val));

        // Check if date
        if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val)) {
          dateCount++;
          const d = new Date(val);
          if (!isNaN(d.getTime())) {
            if (!minDate || d < minDate) minDate = d;
            if (!maxDate || d > maxDate) maxDate = d;
          }
        }

        // Check if numeric
        if (typeof val === 'number' || (!isNaN(val) && val !== '')) {
          numericCount++;
          const num = Number(val);
          sum += num;
          if (num < min) min = num;
          if (num > max) max = num;
        }
      });

      const total = rows.length;
      const missingPct = Number(((nullCount / total) * 100).toFixed(1));
      const uniqueCount = distinctValues.size;

      let inferredType = 'Category';
      const colLower = col.toLowerCase();

      if (colLower.includes('id') || colLower.endsWith('_pk') || (uniqueCount === total && total > 5)) {
        inferredType = 'ID';
      } else if (dateCount > total * 0.7 || colLower.includes('date') || colLower.includes('time')) {
        inferredType = 'Date';
        if (!detectedDateCol) detectedDateCol = col;
      } else if (numericCount > total * 0.8) {
        if (colLower.includes('revenue') || colLower.includes('price') || colLower.includes('cost') || colLower.includes('amount') || colLower.includes('val')) {
          inferredType = 'Currency';
          detectedMetricCols.push(col);
        } else {
          inferredType = 'Numeric';
          if (colLower.includes('qty') || colLower.includes('count') || colLower.includes('units') || colLower.includes('volume')) {
            detectedMetricCols.push(col);
          }
        }
      } else if (colLower.includes('region') || colLower.includes('country') || colLower.includes('city')) {
        inferredType = 'Geographic';
      } else if (colLower.includes('notes') || colLower.includes('text') || colLower.includes('desc') || colLower.includes('comment')) {
        inferredType = 'Text';
      }

      if (missingPct > 10) {
        warnings.push(`Column '${col}' has ${missingPct}% missing values.`);
      }

      columnProfiles.push({
        name: col,
        type: inferredType,
        missingPct,
        uniqueCount,
        min: min === Infinity ? null : min,
        max: max === -Infinity ? null : max,
        avg: numericCount > 0 ? Number((sum / numericCount).toFixed(2)) : null,
        sampleValues: Array.from(distinctValues).slice(0, 4)
      });
    });

    // Detect Grain
    let detectedGrain = 'Transaction';
    const filenameLower = (filename || '').toLowerCase();
    const colsStr = columns.join(' ').toLowerCase();

    if (filenameLower.includes('crm') || colsStr.includes('opportunity') || colsStr.includes('deal')) {
      detectedGrain = 'Opportunity';
    } else if (filenameLower.includes('support') || filenameLower.includes('ticket') || colsStr.includes('ticket')) {
      detectedGrain = 'Ticket';
    } else if (filenameLower.includes('feedback') || filenameLower.includes('review') || colsStr.includes('sentiment')) {
      detectedGrain = 'Review';
    } else if (filenameLower.includes('market') || filenameLower.includes('signal') || colsStr.includes('competitor')) {
      detectedGrain = 'Event';
    }

    // Check duplicate rows
    const serializedRows = new Set();
    let duplicates = 0;
    rows.forEach(r => {
      const s = JSON.stringify(r);
      if (serializedRows.has(s)) duplicates++;
      else serializedRows.add(s);
    });

    if (duplicates > 0) {
      warnings.push(`Dataset contains ${duplicates} duplicate rows.`);
    }

    // Calculate overall data quality score (0-100)
    let score = 100;
    columnProfiles.forEach(c => {
      if (c.missingPct > 0) score -= (c.missingPct * 0.5);
    });
    if (duplicates > 0) score -= (duplicates / rows.length) * 20;
    if (!detectedDateCol) score -= 15;
    if (detectedMetricCols.length === 0 && detectedGrain === 'Transaction') score -= 20;

    const dataQualityScore = Math.max(10, Math.min(100, Math.round(score)));

    return {
      filename,
      rowCount: rows.length,
      columnCount: columns.length,
      columns: columnProfiles,
      dataQualityScore,
      warnings,
      detectedGrain,
      dateRange: minDate && maxDate ? {
        start: minDate.toISOString().split('T')[0],
        end: maxDate.toISOString().split('T')[0],
        days: Math.round((maxDate - minDate) / (1000 * 60 * 60 * 24))
      } : null,
      kpiCandidates: detectedMetricCols
    };
  }
}
