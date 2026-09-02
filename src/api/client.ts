import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Datasets & Data Studio
export const uploadDataset = (data: { filename: string; content: string; grain?: string; refreshCadence?: string }) =>
  apiClient.post('/datasets/upload', data).then(res => res.data.data);

export const fetchDatasets = () =>
  apiClient.get('/datasets').then(res => res.data.data);

export const fetchDatasetById = (id: string) =>
  apiClient.get(`/datasets/${id}`).then(res => res.data.data);

export const profileDataset = (id: string) =>
  apiClient.post(`/datasets/${id}/profile`).then(res => res.data.data);

export const mapDataset = (id: string, payload: { kpi?: string; columnMapping?: any }) =>
  apiClient.post(`/datasets/${id}/map`, payload).then(res => res.data.data);

// Analysis Engine
export const runAnalysis = (payload: { datasetId?: string; kpi?: string; columnMapping?: any; persona?: string; scenarioKey?: string }) =>
  apiClient.post('/analysis/run', payload).then(res => res.data.data);

export const fetchAnalysis = (id: string, role = 'Data Analyst') =>
  apiClient.get(`/analysis/${id}`, { headers: { 'x-role': role } }).then(res => res.data.data);

export const fetchPipelineStages = (id: string) =>
  apiClient.get(`/analysis/${id}/pipeline`).then(res => res.data.data);

export const fetchAnomalies = () =>
  apiClient.get('/anomalies').then(res => res.data.data);

export const fetchInvestigation = (id: string, role = 'Data Analyst') =>
  apiClient.get(`/analysis/${id}`, { headers: { 'x-role': role } }).then(res => res.data.data);

export const fetchDecomposition = (id: string) =>
  apiClient.get(`/analysis/${id}/decomposition`).then(res => res.data.data);

export const fetchEvidence = (params = {}) =>
  apiClient.get('/evidence', { params }).then(res => res.data.data);

export const fetchHypotheses = (id: string) =>
  apiClient.get(`/analysis/${id}/hypotheses`).then(res => res.data.data);

export const fetchNarrative = (id: string, persona: string) =>
  apiClient.post(`/analysis/${id}/narrative`, { persona }).then(res => res.data.data);

export const fetchRecommendations = (id: string) =>
  apiClient.get(`/analysis/${id}/recommendations`).then(res => res.data.data);

export const fetchTelemetry = (analysisId: string) =>
  apiClient.get(`/telemetry/${analysisId}`).then(res => res.data.data);

export const fetchAuditLogs = () =>
  apiClient.get('/audit').then(res => res.data.data);

export const fetchKPIs = () =>
  apiClient.get('/kpis').then(res => res.data.data);

export const fetchFeedbackSummary = () =>
  apiClient.get('/feedback').then(res => res.data.data);

export const submitFeedback = (payload: any) =>
  apiClient.post('/feedback', payload).then(res => res.data);

// Legacy / Global Dashboard
export const fetchDashboardSummary = () =>
  apiClient.get('/dashboard/summary').then(res => res.data.data);

export const fetchDataSources = () =>
  apiClient.get('/datasources').then(res => res.data.data);

export const syncDataSource = (id: string) =>
  apiClient.post(`/datasources/${id}/sync`).then(res => res.data.data);

export default apiClient;
