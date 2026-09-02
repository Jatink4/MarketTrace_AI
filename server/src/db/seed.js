import { DBStore } from './store.js';
import { PipelineOrchestrator } from '../services/pipelineOrchestrator.js';
import { DataIngestionService } from '../services/dataIngestionService.js';
import fs from 'fs';
import path from 'path';

export async function seedDatabaseIfEmpty() {
  const existing = DBStore.getAnalyses();
  if (existing.length >= 3) {
    return;
  }

  console.log('Seeding demo datasets and investigations into persistent DB store...');

  // 1. Ingest sample datasets
  const filesToSeed = [
    { name: 'sales.csv', id: 'sales-001', grain: 'Transaction', refresh: 'Daily' },
    { name: 'crm.csv', id: 'crm-001', grain: 'Opportunity / Account', refresh: 'Daily' },
    { name: 'support_tickets.csv', id: 'support-001', grain: 'Ticket', refresh: 'Hourly' },
    { name: 'customer_feedback.csv', id: 'feedback-001', grain: 'Review', refresh: 'Continuous' },
    { name: 'market_signals.csv', id: 'market-001', grain: 'Event', refresh: 'Daily' },
    { name: 'low_confidence.csv', id: 'low-conf-001', grain: 'Transaction', refresh: 'Daily' },
    { name: 'new_product.csv', id: 'new-prod-001', grain: 'Transaction', refresh: 'Daily' }
  ];

  filesToSeed.forEach(f => {
    const fPath = path.resolve('test-data', f.name);
    if (fs.existsSync(fPath)) {
      const content = fs.readFileSync(fPath, 'utf-8');
      const parsed = DataIngestionService.parseRawContent(f.name, content);
      DBStore.saveDataset({
        id: f.id,
        filename: f.name,
        grain: f.grain,
        refreshCadence: f.refresh,
        rowCount: parsed.rowCount,
        columns: parsed.columns,
        rows: parsed.rows,
        uploadedAt: new Date().toISOString()
      });
    }
  });

  // 2. Run and seed Scenario A: High Confidence (inv-novacommerce-01)
  await PipelineOrchestrator.runAnalysis('sales.csv', {
    analysisId: 'inv-novacommerce-01',
    datasetId: 'sales-001',
    kpi: 'Revenue',
    scenarioKey: 'cloudflow-aug-2026'
  });

  // 3. Run and seed Scenario B: Ambiguous / Abstain (inv-ambiguous-02)
  await PipelineOrchestrator.runAnalysis('low_confidence.csv', {
    analysisId: 'inv-ambiguous-02',
    datasetId: 'low-conf-001',
    kpi: 'Revenue',
    scenarioKey: 'ambiguous-revenue'
  });

  // 4. Run and seed Scenario C: Sparse History (inv-sparse-03)
  await PipelineOrchestrator.runAnalysis('new_product.csv', {
    analysisId: 'inv-sparse-03',
    datasetId: 'new-prod-001',
    kpi: 'Revenue',
    scenarioKey: 'sparse-history'
  });

  console.log('Database seeded with 3 distinct benchmark scenarios!');
}
