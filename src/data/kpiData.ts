import { KPI, DataSourceContext } from '../types';

export const CONNECTED_KPIS: KPI[] = [
  {
    id: 'kpi-revenue',
    name: 'Revenue',
    category: 'Financial',
    currentValue: '₹9.16 Cr',
    previousValue: '₹10.00 Cr',
    numericCurrent: 9.16,
    numericPrevious: 10.00,
    unit: 'Cr',
    changePct: -8.4,
    isNegativeGood: false,
    materiality: 'HIGH',
    statisticalSignificance: 'HIGH',
    businessImpactFormatted: '₹84 Lakh loss vs baseline',
    freshness: '1 hr ago (Hourly sync)',
    sparklineData: [10.1, 10.2, 9.9, 10.3, 10.0, 9.8, 10.2, 10.1, 10.0, 9.9, 10.0, 9.16],
    expectedRange: {
      min: '₹9.8 Cr',
      max: '₹10.3 Cr',
      numericMin: 9.8,
      numericMax: 10.3,
      label: 'Expected: ₹9.8–₹10.3 Cr (95% CI)'
    },
    semanticContract: {
      kpi: 'Revenue',
      definition: 'Recognized net sales revenue after partner discounts and billing refunds, excluding unearned deferred revenue.',
      formula: 'SUM(net_sales_amount) - SUM(discounts) - SUM(refunds)',
      grain: 'Transaction / Day',
      dimensions: ['Region', 'Product', 'Customer Segment', 'Contract Type'],
      calendar: 'Fiscal Month (Standard Gregorian)',
      threshold: '±5.0% deviation from Holt-Winters ARIMA forecast baseline',
      owner: 'Finance & Revenue Operations (Owner: Marcus Vance)',
      access: 'Executive + Finance + Regional GMs (Row-Level Restricted)',
      lineage: [
        { step: 1, title: 'Sales Database', system: 'PostgreSQL RDS (Prod)', description: 'Raw transaction records & billing events' },
        { step: 2, title: 'Revenue Transformation', system: 'dbt Core on Snowflake', description: 'Applies ASC 606 revenue recognition rules & currency normalization' },
        { step: 3, title: 'Revenue Aggregation', system: 'Semantic Metric Layer (Cube.js)', description: 'Computes net sales aggregated by Region, Segment, and Product' },
        { step: 4, title: 'Revenue KPI Model', system: 'MarketTrace Semantic Registry', description: 'Governed KPI metric contract with automated anomaly gates' }
      ]
    }
  },
  {
    id: 'kpi-conversion',
    name: 'Enterprise Conversion',
    category: 'Growth',
    currentValue: '21.4%',
    previousValue: '24.1%',
    numericCurrent: 21.4,
    numericPrevious: 24.1,
    unit: '%',
    changePct: -11.2,
    isNegativeGood: false,
    materiality: 'HIGH',
    statisticalSignificance: 'HIGH',
    businessImpactFormatted: '38 lost qualified opportunities',
    freshness: '4 hrs ago (Daily batch)',
    sparklineData: [24.5, 24.8, 24.0, 25.1, 24.2, 23.9, 24.5, 24.0, 24.3, 24.1, 23.8, 21.4],
    expectedRange: {
      min: '23.5%',
      max: '25.0%',
      numericMin: 23.5,
      numericMax: 25.0,
      label: 'Expected: 23.5%–25.0%'
    },
    semanticContract: {
      kpi: 'Enterprise Conversion Rate',
      definition: 'Percentage of qualified enterprise stage-3 pilot opportunities converted to closed-won annual subscriptions.',
      formula: 'COUNT(closed_won_enterprise_deals) / COUNT(qualified_pilot_opportunities) * 100',
      grain: 'Opportunity / Day',
      dimensions: ['Region', 'Deal Size Tier', 'Lead Source', 'Sales Rep'],
      calendar: 'Fiscal Month',
      threshold: '±4.0% deviation from trailing 6-month average',
      owner: 'Sales Operations (Owner: Elena Rostova)',
      access: 'Executive + Sales Ops + Regional GMs',
      lineage: [
        { step: 1, title: 'CRM Ingestion', system: 'Salesforce Enterprise', description: 'Opportunity stage progression timestamps & win/loss tags' },
        { step: 2, title: 'Pipeline Normalization', system: 'Fivetran ETL', description: 'Deduplicates split opportunities and normalizes deal tiers' },
        { step: 3, title: 'Conversion Metrics Engine', system: 'Snowflake Analytics', description: 'Calculates stage conversion cohorts per fiscal cohort' },
        { step: 4, title: 'Conversion KPI Contract', system: 'MarketTrace Semantic Registry', description: 'Governed conversion thresholding' }
      ]
    }
  },
  {
    id: 'kpi-churn',
    name: 'Customer Churn',
    category: 'Customer',
    currentValue: '6.8%',
    previousValue: '6.5%',
    numericCurrent: 6.8,
    numericPrevious: 6.5,
    unit: '%',
    changePct: 4.2,
    isNegativeGood: false,
    materiality: 'MEDIUM',
    statisticalSignificance: 'HIGH',
    businessImpactFormatted: '₹16 Lakh annualized ARR churned',
    freshness: '6 hrs ago (Daily batch)',
    sparklineData: [6.1, 6.2, 6.0, 6.3, 6.4, 6.2, 6.3, 6.5, 6.4, 6.3, 6.5, 6.8],
    expectedRange: {
      min: '5.8%',
      max: '6.5%',
      numericMin: 5.8,
      numericMax: 6.5,
      label: 'Expected: 5.8%–6.5%'
    },
    semanticContract: {
      kpi: 'Customer Churn Rate',
      definition: 'Monthly recurring revenue lost due to subscription cancellations or non-renewals divided by start-of-month ARR.',
      formula: 'SUM(cancelled_arr) / SUM(start_of_month_arr) * 100',
      grain: 'Customer / Month',
      dimensions: ['Cohort', 'Region', 'Product Tier', 'Contract Term'],
      calendar: 'Fiscal Month',
      threshold: '+0.5% absolute increase above baseline',
      owner: 'Customer Success & Retention (Owner: David Chen)',
      access: 'Executive + CS Leadership + Finance',
      lineage: [
        { step: 1, title: 'Subscription Billing', system: 'Stripe Billing / Zuora', description: 'Cancellation events, churn reasons, and credit notes' },
        { step: 2, title: 'ARR Calculation Engine', system: 'dbt / Snowflake', description: 'Calculates net retention cohorts and gross churn' },
        { step: 3, title: 'Retention Metric Model', system: 'MarketTrace Semantic Registry', description: 'Customer health & churn benchmark layer' }
      ]
    }
  },
  {
    id: 'kpi-usage',
    name: 'Product Usage',
    category: 'Product',
    currentValue: '72.0%',
    previousValue: '76.7%',
    numericCurrent: 72.0,
    numericPrevious: 76.7,
    unit: '%',
    changePct: -6.1,
    isNegativeGood: false,
    materiality: 'HIGH',
    statisticalSignificance: 'HIGH',
    businessImpactFormatted: '24% drop in API & workflow executions',
    freshness: '2 hrs ago (Daily batch)',
    sparklineData: [77.5, 78.0, 77.2, 76.8, 77.0, 76.5, 77.1, 76.9, 76.8, 76.4, 76.7, 72.0],
    expectedRange: {
      min: '75.5%',
      max: '78.5%',
      numericMin: 75.5,
      numericMax: 78.5,
      label: 'Expected: 75.5%–78.5%'
    },
    semanticContract: {
      kpi: 'Active Product Usage (WAU/MAU)',
      definition: 'Percentage of provisioned enterprise seats executing at least 3 automated workflow events per week.',
      formula: 'COUNT(DISTINCT active_users_3_events_week) / COUNT(provisioned_licensed_seats) * 100',
      grain: 'Customer / Feature / Day',
      dimensions: ['Feature Module', 'Product Tier', 'SDK Language', 'Integration Type'],
      calendar: 'Rolling 7-day average',
      threshold: '±3.5% deviation from rolling 30-day baseline',
      owner: 'Product Analytics (Owner: Priya Sharma)',
      access: 'Product + Engineering + CS',
      lineage: [
        { step: 1, title: 'Event Telemetry', system: 'Segment + Kafka Clickstream', description: 'Real-time client SDK events & API route invocations' },
        { step: 2, title: 'Feature Sessionizer', system: 'ClickHouse / Mixpanel', description: 'Session aggregation and feature adoption tracking' },
        { step: 3, title: 'Usage Metrics Layer', system: 'MarketTrace Semantic Registry', description: 'Standardized WAU/MAU and engagement indices' }
      ]
    }
  },
  {
    id: 'kpi-support',
    name: 'Support Issues',
    category: 'Operations',
    currentValue: '1,284',
    previousValue: '980',
    numericCurrent: 1284,
    numericPrevious: 980,
    unit: 'tickets',
    changePct: 31.0,
    isNegativeGood: false,
    materiality: 'HIGH',
    statisticalSignificance: 'HIGH',
    businessImpactFormatted: '+304 excess incident tickets',
    freshness: '15 mins ago (Near real-time stream)',
    sparklineData: [920, 940, 910, 950, 930, 960, 945, 955, 970, 965, 980, 1284],
    expectedRange: {
      min: '920',
      max: '1,000',
      numericMin: 920,
      numericMax: 1000,
      label: 'Expected: 920–1,000 tickets'
    },
    semanticContract: {
      kpi: 'Critical Support Incident Volume',
      definition: 'Total incoming technical support tickets tagged with Priority P1/P2 or Integration/API failure taxonomy.',
      formula: 'COUNT(ticket_id) WHERE priority IN (P1, P2) OR tag IN (integration_error, api_failure, auth_error)',
      grain: 'Ticket / Irregular event',
      dimensions: ['Issue Category', 'Product Component', 'Client Tier', 'Resolution Status'],
      calendar: 'Fiscal Month',
      threshold: '>15% increase above 3-month rolling median',
      owner: 'Customer Support Engineering (Owner: Liam O\'Connor)',
      access: 'Support + Engineering + Product Leadership',
      lineage: [
        { step: 1, title: 'Helpdesk Ticketing', system: 'Zendesk Enterprise', description: 'Ticket creation, customer sentiment tags, and transcript logs' },
        { step: 2, title: 'NLP Issue Classifier', system: 'Internal Python Pipeline', description: 'Categorizes ticket root topics & integration keywords' },
        { step: 3, title: 'Incident Aggregator', system: 'MarketTrace Semantic Registry', description: 'Real-time incident rate monitor' }
      ]
    }
  }
];

export const CONNECTED_DATA_SOURCES: DataSourceContext[] = [
  {
    id: 'source-sales',
    name: 'Sales Database (ERP/Billing)',
    grain: 'Transaction-level',
    refreshCadence: 'Hourly',
    freshness: '18 mins ago',
    coverage: 99.4,
    quality: 98.8,
    status: 'Healthy',
    recordsCount: '1.42M txns/mo',
    description: 'Direct transaction ledger containing line-item billings, credits, and ARR recognition.'
  },
  {
    id: 'source-crm',
    name: 'CRM Pipeline (Salesforce)',
    grain: 'Opportunity-level',
    refreshCadence: 'Daily',
    freshness: '4.2 hrs ago',
    coverage: 96.2,
    quality: 94.5,
    status: 'Healthy',
    recordsCount: '18.4K opportunities',
    description: 'Stage movements, win/loss post-mortems, competitor mentions, and rep call notes.'
  },
  {
    id: 'source-support',
    name: 'Support Helpdesk (Zendesk)',
    grain: 'Ticket-level',
    refreshCadence: 'Irregular (Streaming)',
    freshness: '12 mins ago',
    coverage: 91.0,
    quality: 92.4,
    status: 'Healthy',
    recordsCount: '8.9K tickets/mo',
    description: 'Customer incident tickets, priority ratings, error attachments, and CSAT logs.'
  },
  {
    id: 'source-product',
    name: 'Product Analytics (ClickHouse/SDK)',
    grain: 'Customer-feature-day',
    refreshCadence: 'Daily',
    freshness: '2.1 hrs ago',
    coverage: 94.0,
    quality: 96.1,
    status: 'Healthy',
    recordsCount: '42.8M telemetry events',
    description: 'API endpoint usage, authentication handshakes, workflow triggers, and SDK logs.'
  },
  {
    id: 'source-market',
    name: 'Market Intelligence (Gartner/Feed)',
    grain: 'Market-week',
    refreshCadence: 'Weekly',
    freshness: '2 days ago',
    coverage: 87.5,
    quality: 89.0,
    status: 'Healthy',
    recordsCount: '14 competitor briefs',
    description: 'External product launches, pricing shifts, review sentiment indexes (G2/Capterra).'
  }
];

export const CONNECTED_KPI_GRAPH_NODES = [
  {
    id: 'usage',
    name: 'Product Usage (WAU/MAU)',
    change: '-6.1%',
    isDrop: true,
    detail: 'API calls dropped 24% in Region C Enterprise accounts',
    color: '#EF4444'
  },
  {
    id: 'support',
    name: 'Support Issues',
    change: '+31.0%',
    isDrop: false,
    detail: 'Integration-related tickets surged by +37%',
    color: '#F59E0B'
  },
  {
    id: 'conversion',
    name: 'Enterprise Conversion',
    change: '-11.2%',
    isDrop: true,
    detail: 'Pilot-to-paid closing stalled on integration delays',
    color: '#EF4444'
  },
  {
    id: 'churn',
    name: 'Customer Churn',
    change: '+4.2%',
    isDrop: false,
    detail: 'Contract non-renewals increased in affected cohorts',
    color: '#F59E0B'
  },
  {
    id: 'revenue',
    name: 'Total Revenue',
    change: '-8.4%',
    isDrop: true,
    detail: '₹84 Lakh net contraction outside 95% confidence interval',
    color: '#EF4444'
  }
];
