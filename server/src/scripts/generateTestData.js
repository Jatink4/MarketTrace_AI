import fs from 'fs';
import path from 'path';

const testDir = path.resolve('test-data');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

// 1. sales.csv
const salesRows = ['transaction_id,date,region,product,customer_segment,channel,quantity,revenue,unit_price,discount_pct'];
let txId = 1000;
for (let m = 6; m <= 7; m++) {
  const days = m === 6 ? 30 : 31;
  for (let d = 1; d <= days; d++) {
    const ds = d < 10 ? '0' + d : '' + d;
    const date = `2026-0${m}-${ds}`;
    txId++; salesRows.push(`TX-${txId},${date},APAC,CloudSuite,Enterprise,Direct,5,60000,12000,0`);
    txId++; salesRows.push(`TX-${txId},${date},North America,CloudSuite,Enterprise,Direct,6,72000,12000,0`);
    txId++; salesRows.push(`TX-${txId},${date},Europe,CloudSuite,Enterprise,Partner,4,48000,12000,0`);
    txId++; salesRows.push(`TX-${txId},${date},APAC,AnalyticsPro,Mid-Market,Direct,3,15000,5000,0`);
    txId++; salesRows.push(`TX-${txId},${date},North America,AnalyticsPro,SMB,Self-Serve,2,8000,4000,0`);
    txId++; salesRows.push(`TX-${txId},${date},Europe,SecurityShield,Enterprise,Direct,3,15000,5000,0`);
    txId++; salesRows.push(`TX-${txId},${date},LATAM,SecurityShield,SMB,Self-Serve,2,6000,3000,0`);
  }
}
for (let d = 1; d <= 31; d++) {
  const ds = d < 10 ? '0' + d : '' + d;
  const date = `2026-08-${ds}`;
  txId++;
  const apacQty = d % 3 === 0 ? 2 : 1;
  salesRows.push(`TX-${txId},${date},APAC,CloudSuite,Enterprise,Direct,${apacQty},${apacQty * 12000},12000,0`);
  txId++; salesRows.push(`TX-${txId},${date},North America,CloudSuite,Enterprise,Direct,6,72000,12000,0`);
  txId++; salesRows.push(`TX-${txId},${date},Europe,CloudSuite,Enterprise,Partner,4,48000,12000,0`);
  txId++; salesRows.push(`TX-${txId},${date},APAC,AnalyticsPro,Mid-Market,Direct,3,15000,5000,0`);
  txId++; salesRows.push(`TX-${txId},${date},North America,AnalyticsPro,SMB,Self-Serve,2,8000,4000,0`);
  txId++; salesRows.push(`TX-${txId},${date},Europe,SecurityShield,Enterprise,Direct,3,15000,5000,0`);
  txId++; salesRows.push(`TX-${txId},${date},LATAM,SecurityShield,SMB,Self-Serve,2,6000,3000,0`);
}
fs.writeFileSync(path.join(testDir, 'sales.csv'), salesRows.join('\n'));

// 2. crm.csv
const crmRows = ['opportunity_id,date,region,customer_segment,stage,deal_value,renewal_status,account_name,sales_rep,notes'];
const crmAccounts = [
  { id: 'OPP-301', date: '2026-07-15', region: 'APAC', seg: 'Enterprise', stage: 'Negotiation', val: 180000, stat: 'Delayed', acc: 'Tokyo Digital Corp', rep: 'Kenji Sato', notes: 'Account raised severe concerns with custom ERP connector timeouts occurring after v4.2 update. Refusing renewal until resolved.' },
  { id: 'OPP-302', date: '2026-07-18', region: 'APAC', seg: 'Enterprise', stage: 'Under Review', val: 240000, stat: 'At Risk', acc: 'Singapore Telecomm Ltd', rep: 'Mei Ling', notes: 'Customer citing frequent daily sync failures and delayed month-end batch jobs. Renewal pipeline probability reduced to 30%.' },
  { id: 'OPP-303', date: '2026-07-22', region: 'APAC', seg: 'Enterprise', stage: 'Negotiation', val: 150000, stat: 'Delayed', acc: 'Sydney Financial Group', rep: 'David Miller', notes: 'Renewal stalled. Procurement team demands SLA guarantee for local API connector stability and rebate for downtime.' },
  { id: 'OPP-304', date: '2026-07-28', region: 'APAC', seg: 'Enterprise', stage: 'Lost', val: 120000, stat: 'Churned', acc: 'Seoul Media Systems', rep: 'Park Ji-sung', notes: 'Customer chose not to renew annual enterprise tier due to unaddressed ERP integration latency.' },
  { id: 'OPP-305', date: '2026-08-03', region: 'North America', seg: 'Enterprise', stage: 'Closed Won', val: 320000, stat: 'Renewed', acc: 'Apex Global Logistics', rep: 'Sarah Jenkins', notes: 'Smooth annual renewal executed. US standard connector operations running without friction.' },
  { id: 'OPP-306', date: '2026-08-07', region: 'APAC', seg: 'Enterprise', stage: 'Escalated', val: 210000, stat: 'Delayed', acc: 'Hong Kong Retail Holdings', rep: 'William Cheung', notes: 'Renewal deferred into Q4. Technical leadership requested engineering SWAT team on-site for database synchronization.' },
  { id: 'OPP-307', date: '2026-08-11', region: 'Europe', seg: 'Enterprise', stage: 'Closed Won', val: 190000, stat: 'Renewed', acc: 'Nordic Bank Solutions', rep: 'Lars Lindqvist', notes: 'Renewal completed with minor pricing concessions on analytics add-ons.' },
  { id: 'OPP-308', date: '2026-08-14', region: 'APAC', seg: 'Enterprise', stage: 'Negotiation', val: 175000, stat: 'At Risk', acc: 'Melbourne Logistics Tech', rep: 'Chloe Adams', notes: 'Client mentioned competitor CloudApex promotional outreach, but primary renewal blocker remains ERP sync latency.' },
  { id: 'OPP-309', date: '2026-08-19', region: 'APAC', seg: 'Mid-Market', stage: 'Closed Won', val: 45000, stat: 'Renewed', acc: 'Auckland Data Services', rep: 'Tane Williams', notes: 'Mid-market package renewed successfully without ERP dependencies.' },
  { id: 'OPP-310', date: '2026-08-25', region: 'APAC', seg: 'Enterprise', stage: 'Under Review', val: 260000, stat: 'Delayed', acc: 'Jakarta Enterprise Group', rep: 'Budi Santoso', notes: 'Annual contract renewal delayed pending resolution of Zendesk ticket #TK-8422.' }
];
crmAccounts.forEach(c => {
  crmRows.push([c.id, c.date, c.region, c.seg, c.stage, c.val, c.stat, JSON.stringify(c.acc), JSON.stringify(c.rep), JSON.stringify(c.notes)].join(','));
});
fs.writeFileSync(path.join(testDir, 'crm.csv'), crmRows.join('\n'));

// 3. support_tickets.csv
const supRows = ['ticket_id,date,region,category,severity,status,customer_segment,description'];
const tickets = [
  { id: 'TK-8401', date: '2026-07-10', region: 'APAC', cat: 'Integration', sev: 'P1 - Critical', stat: 'Open', seg: 'Enterprise', desc: 'OAuth token timeout during daily enterprise SAP ERP sync for Tokyo Digital Corp.' },
  { id: 'TK-8405', date: '2026-07-14', region: 'APAC', cat: 'Integration', sev: 'P1 - Critical', stat: 'Escalated', seg: 'Enterprise', desc: 'Sync connector latency exceeds 45s threshold causing batch job failure in Singapore instance.' },
  { id: 'TK-8412', date: '2026-07-20', region: 'APAC', cat: 'Integration', sev: 'P2 - High', stat: 'In Progress', seg: 'Enterprise', desc: 'APAC data connector v4.2 memory leak causes overnight pipeline disconnects.' },
  { id: 'TK-8418', date: '2026-07-26', region: 'APAC', cat: 'Billing', sev: 'P3 - Medium', stat: 'Resolved', seg: 'Mid-Market', desc: 'Invoice currency exchange rate display query for AUD transaction.' },
  { id: 'TK-8422', date: '2026-08-01', region: 'APAC', cat: 'Integration', sev: 'P1 - Critical', stat: 'Open', seg: 'Enterprise', desc: 'Critical: Jakarta Enterprise ERP connector disconnect during financial month-end closing.' },
  { id: 'TK-8429', date: '2026-08-06', region: 'North America', cat: 'UI/UX', sev: 'P3 - Medium', stat: 'Resolved', seg: 'SMB', desc: 'Dashboard report export button alignment issue on Safari.' },
  { id: 'TK-8433', date: '2026-08-10', region: 'APAC', cat: 'Integration', sev: 'P1 - Critical', stat: 'Escalated', seg: 'Enterprise', desc: 'Sydney Financial Group reporting repeated SSL handshake drops with on-prem Oracle DB.' },
  { id: 'TK-8440', date: '2026-08-15', region: 'Europe', cat: 'Performance', sev: 'P2 - High', stat: 'Resolved', seg: 'Enterprise', desc: 'Analytics query cache warming delayed after scheduled maintenance.' },
  { id: 'TK-8448', date: '2026-08-21', region: 'APAC', cat: 'Integration', sev: 'P1 - Critical', stat: 'Open', seg: 'Enterprise', desc: 'APAC Enterprise support ticket volume for connector timeouts increased 37% month-over-month.' },
  { id: 'TK-8452', date: '2026-08-28', region: 'APAC', cat: 'Performance', sev: 'P2 - High', stat: 'In Progress', seg: 'Enterprise', desc: 'CloudSuite API gateway rate limiting triggering false 429 errors for high-volume enterprise accounts.' }
];
tickets.forEach(t => {
  supRows.push([t.id, t.date, t.region, t.cat, t.sev, t.stat, t.seg, JSON.stringify(t.desc)].join(','));
});
fs.writeFileSync(path.join(testDir, 'support_tickets.csv'), supRows.join('\n'));

// 4. customer_feedback.csv
const feedRows = ['feedback_id,date,region,product,rating,sentiment,text'];
const feedbacks = [
  { id: 'FB-501', date: '2026-07-16', region: 'APAC', prod: 'CloudSuite', rating: 2, sent: 'Negative', text: 'CloudSuite v4.2 broke our SAP ERP synchronization. We cannot complete our financial reconciliation.' },
  { id: 'FB-502', date: '2026-07-25', region: 'APAC', prod: 'CloudSuite', rating: 1, sent: 'Negative', text: 'Support takes days to respond to connector timeout tickets. Our upcoming enterprise renewal is on hold.' },
  { id: 'FB-503', date: '2026-08-04', region: 'North America', prod: 'AnalyticsPro', rating: 5, sent: 'Positive', text: 'AnalyticsPro query performance has improved significantly. Great ROI for our analytics team.' },
  { id: 'FB-504', date: '2026-08-12', region: 'APAC', prod: 'SecurityShield', rating: 4, sent: 'Positive', text: 'SecurityShield works well across all APAC branches, no complaints.' },
  { id: 'FB-505', date: '2026-08-16', region: 'APAC', prod: 'CloudSuite', rating: 2, sent: 'Negative', text: 'Saw CloudApex offering discounts, but honestly if NovaCommerce just fixed the ERP sync bug we would stay.' },
  { id: 'FB-506', date: '2026-08-22', region: 'Europe', prod: 'CloudSuite', rating: 4, sent: 'Neutral', text: 'Renewal pricing is slightly higher than expected, but product stability is solid.' }
];
feedbacks.forEach(f => {
  feedRows.push([f.id, f.date, f.region, f.prod, f.rating, f.sent, JSON.stringify(f.text)].join(','));
});
fs.writeFileSync(path.join(testDir, 'customer_feedback.csv'), feedRows.join('\n'));

// 5. market_signals.csv
const mktRows = ['event_id,date,region,competitor,event_type,description,impact'];
const mktEvents = [
  { id: 'EVT-901', date: '2026-08-12', region: 'APAC', comp: 'CloudApex', type: 'Promotional Launch', desc: 'CloudApex launched a 12% promotional discount targeting enterprise migrations in APAC region.', impact: 'Moderate' },
  { id: 'EVT-902', date: '2026-08-20', region: 'Global', comp: 'DataVanguard', type: 'Product Announcement', desc: 'DataVanguard announced AI forecasting feature for Q4 beta.', impact: 'Low' },
  { id: 'EVT-903', date: '2026-07-01', region: 'Europe', comp: 'EuroCloud', type: 'Regulatory Compliance', desc: 'EU data sovereignty directive implementation update.', impact: 'Low' }
];
mktEvents.forEach(m => {
  mktRows.push([m.id, m.date, m.region, m.comp, m.type, JSON.stringify(m.desc), m.impact].join(','));
});
fs.writeFileSync(path.join(testDir, 'market_signals.csv'), mktRows.join('\n'));

// 6. kpi_definitions.json
const kpiDefs = [
  {
    name: 'Revenue',
    kpiId: 'kpi-revenue',
    definition: 'Total recognized sales revenue across all regions and products',
    formula: 'SUM(revenue)',
    grain: 'transaction',
    dimensions: ['region', 'product', 'customer_segment', 'channel'],
    timeDimension: 'date',
    currency: 'USD',
    unit: '$',
    materialityThreshold: 5,
    alertThreshold: 2,
    allowedRoles: ['executive', 'sales', 'analyst', 'product']
  },
  {
    name: 'Conversion Rate',
    kpiId: 'kpi-conversion',
    definition: 'Percentage of qualified enterprise opportunities that close as won deals',
    formula: 'SUM(converted_deals) / SUM(total_opportunities) * 100',
    grain: 'opportunity',
    dimensions: ['region', 'customer_segment', 'channel'],
    timeDimension: 'date',
    currency: '%',
    unit: '%',
    materialityThreshold: 8,
    alertThreshold: 4,
    allowedRoles: ['executive', 'sales', 'analyst']
  },
  {
    name: 'Customer Churn',
    kpiId: 'kpi-churn',
    definition: 'Percentage of existing recurring contract value churned or not renewed',
    formula: 'SUM(churned_value) / SUM(renewed_base_value) * 100',
    grain: 'account',
    dimensions: ['region', 'product', 'customer_segment'],
    timeDimension: 'date',
    currency: '%',
    unit: '%',
    materialityThreshold: 5,
    alertThreshold: 3,
    allowedRoles: ['executive', 'sales', 'analyst', 'product']
  },
  {
    name: 'Average Order Value',
    kpiId: 'kpi-aov',
    definition: 'Average revenue realized per completed transaction or contract',
    formula: 'SUM(revenue) / COUNT(transaction_id)',
    grain: 'transaction',
    dimensions: ['region', 'product', 'channel'],
    timeDimension: 'date',
    currency: 'USD',
    unit: '$',
    materialityThreshold: 6,
    alertThreshold: 3,
    allowedRoles: ['executive', 'sales', 'analyst']
  },
  {
    name: 'Orders',
    kpiId: 'kpi-orders',
    definition: 'Total volume of completed sales transactions',
    formula: 'COUNT(transaction_id)',
    grain: 'transaction',
    dimensions: ['region', 'product', 'channel'],
    timeDimension: 'date',
    currency: 'Units',
    unit: 'Orders',
    materialityThreshold: 5,
    alertThreshold: 2,
    allowedRoles: ['executive', 'sales', 'analyst', 'product']
  }
];
fs.writeFileSync(path.join(testDir, 'kpi_definitions.json'), JSON.stringify(kpiDefs, null, 2));

// 7. low_confidence.csv (Scenario B: Ambiguous / Abstain)
const lowConfRows = ['date,region,product,customer_segment,channel,revenue,notes'];
for (let d = 1; d <= 30; d++) {
  const ds = d < 10 ? '0' + d : '' + d;
  const rev = 40000 + (Math.sin(d) * 6000);
  lowConfRows.push(['2026-08-' + ds, 'Multi-Region', 'MixedSuite', 'SMB', 'Digital', Math.round(rev), JSON.stringify('Conflicting pricing objections, slight marketing variance, holiday seasonality')].join(','));
}
fs.writeFileSync(path.join(testDir, 'low_confidence.csv'), lowConfRows.join('\n'));

// 8. new_product.csv (Scenario C: Sparse History)
const newProdRows = ['date,region,product,customer_segment,channel,revenue,units_sold'];
for (let d = 1; d <= 18; d++) {
  const ds = d < 10 ? '0' + d : '' + d;
  const rev = 12000 + (d * 500) + (d % 2 === 0 ? 1000 : -1000);
  newProdRows.push(['2026-08-' + ds, 'APAC', 'NexusAI', 'Enterprise', 'Direct', rev, Math.round(rev / 1500)].join(','));
}
fs.writeFileSync(path.join(testDir, 'new_product.csv'), newProdRows.join('\n'));

console.log('ALL 8 test-data files generated successfully in /test-data!');
