import fs from 'fs';
import path from 'path';

const DB_DIR = path.resolve('server/src/data/db');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DATASETS_FILE = path.join(DB_DIR, 'datasets.json');
const ANALYSES_FILE = path.join(DB_DIR, 'analyses.json');
const FEEDBACK_FILE = path.join(DB_DIR, 'feedback.json');
const AUDIT_FILE = path.join(DB_DIR, 'audit.json');

function loadJSON(file, defaultVal = []) {
  try {
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
  }
  return defaultVal;
}

function saveJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
}

export class DBStore {
  // Datasets
  static getDatasets() {
    return loadJSON(DATASETS_FILE, []);
  }

  static getDatasetById(id) {
    const all = this.getDatasets();
    return all.find(d => d.id === id) || null;
  }

  static saveDataset(dataset) {
    const all = this.getDatasets();
    const idx = all.findIndex(d => d.id === dataset.id);
    if (idx >= 0) {
      all[idx] = dataset;
    } else {
      all.unshift(dataset);
    }
    saveJSON(DATASETS_FILE, all);
    return dataset;
  }

  // Analyses
  static getAnalyses() {
    return loadJSON(ANALYSES_FILE, []);
  }

  static getAnalysisById(id) {
    const all = this.getAnalyses();
    return all.find(a => a.analysisId === id || a.id === id) || null;
  }

  static saveAnalysis(analysis) {
    const all = this.getAnalyses();
    const idx = all.findIndex(a => a.analysisId === analysis.analysisId || a.id === analysis.id);
    if (idx >= 0) {
      all[idx] = analysis;
    } else {
      all.unshift(analysis);
    }
    saveJSON(ANALYSES_FILE, all);
    return analysis;
  }

  // Feedback
  static getFeedback() {
    return loadJSON(FEEDBACK_FILE, []);
  }

  static saveFeedback(entry) {
    const all = this.getFeedback();
    const record = {
      id: entry.id || `FBK-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...entry
    };
    all.unshift(record);
    saveJSON(FEEDBACK_FILE, all);
    return record;
  }

  // Audit Logs
  static getAuditLogs() {
    return loadJSON(AUDIT_FILE, []);
  }

  static logAudit(entry) {
    const all = this.getAuditLogs();
    const record = {
      id: `AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      user: entry.user || 'Alex Morgan',
      role: entry.role || 'Data Analyst',
      kpi: entry.kpi || 'Revenue',
      dataAccessed: entry.dataAccessed || 'General Dataset',
      analysisType: entry.analysisType || 'Root Cause Pipeline',
      actionTaken: entry.actionTaken || 'View',
      policyEnforced: entry.policyEnforced || 'RBAC Governed'
    };
    all.unshift(record);
    if (all.length > 500) all.pop(); // keep last 500 logs
    saveJSON(AUDIT_FILE, all);
    return record;
  }
}
