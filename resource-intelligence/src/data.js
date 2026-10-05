// Mock data (local, no backend). Fields follow the RE:SOURCE spec:
// resource: id,type,total,util(%),loc,avail,dept,attrs   demand: id,type,req,priority,dept,time,loc,constraint
export const DOMAINS = {
Manufacturing:{unit:'hrs/wk',
resources:[
{id:'M-101',type:'CNC Machine',total:120,util:38,loc:'Plant A',avail:'Available',dept:'Fabrication',attrs:'5-axis'},
{id:'M-102',type:'CNC Machine',total:120,util:91,loc:'Plant B',avail:'Available',dept:'Prototyping',attrs:'3-axis'},
{id:'M-201',type:'Forklift',total:80,util:22,loc:'Plant A',avail:'Available',dept:'Logistics',attrs:'3-ton'},
{id:'M-301',type:'Warehouse Space',total:500,util:45,loc:'Plant B',avail:'Available',dept:'Stores',attrs:'sq m'},
{id:'M-401',type:'Technician',total:160,util:60,loc:'Plant A',avail:'Available',dept:'Maintenance',attrs:'CNC certified'},
{id:'M-402',type:'Technician',total:160,util:30,loc:'Plant B',avail:'Maintenance',dept:'Quality',attrs:'Inspection'}],
demands:[
{id:'D-1',type:'CNC Machine',req:60,priority:'High',dept:'Assembly',time:'Next week',loc:'Plant A',constraint:'5-axis preferred'},
{id:'D-2',type:'Forklift',req:50,priority:'Medium',dept:'Dispatch',time:'This week',loc:'Plant A',constraint:'None'},
{id:'D-3',type:'Warehouse Space',req:300,priority:'High',dept:'Export',time:'Next month',loc:'Plant B',constraint:'Dry storage'},
{id:'D-4',type:'Technician',req:80,priority:'Low',dept:'Assembly',time:'Next week',loc:'Plant A',constraint:'Certified'},
{id:'D-5',type:'CNC Machine',req:70,priority:'High',dept:'R&D',time:'This week',loc:'Plant B',constraint:'None'}]},
Healthcare:{unit:'units',
resources:[
{id:'H-101',type:'ICU Bed',total:20,util:85,loc:'Main Block',avail:'Available',dept:'Critical Care',attrs:'Ventilator'},
{id:'H-102',type:'General Bed',total:120,util:52,loc:'East Wing',avail:'Available',dept:'General Ward',attrs:'Standard'},
{id:'H-201',type:'MRI Slot',total:40,util:35,loc:'Radiology',avail:'Available',dept:'Radiology',attrs:'3T'},
{id:'H-301',type:'Ambulance',total:6,util:50,loc:'Gate 2',avail:'Available',dept:'Emergency',attrs:'ALS'},
{id:'H-401',type:'Operating Theatre',total:30,util:40,loc:'Surgical Block',avail:'Available',dept:'Surgery',attrs:'Hours'}],
demands:[
{id:'D-1',type:'ICU Bed',req:3,priority:'High',dept:'Emergency',time:'Today',loc:'Main Block',constraint:'Ventilator'},
{id:'D-2',type:'General Bed',req:40,priority:'Medium',dept:'Orthopedics',time:'This week',loc:'East Wing',constraint:'None'},
{id:'D-3',type:'MRI Slot',req:20,priority:'High',dept:'Neurology',time:'This week',loc:'Radiology',constraint:'None'},
{id:'D-4',type:'Operating Theatre',req:14,priority:'Medium',dept:'Cardiology',time:'Next week',loc:'Surgical Block',constraint:'Sterile'}]},
Education:{unit:'hrs/wk',
resources:[
{id:'E-101',type:'Classroom',total:40,util:30,loc:'Block A',avail:'Available',dept:'Arts',attrs:'60 seats'},
{id:'E-102',type:'Classroom',total:40,util:88,loc:'Block B',avail:'Available',dept:'Engineering',attrs:'80 seats'},
{id:'E-201',type:'Computer Lab',total:50,util:42,loc:'Block C',avail:'Available',dept:'Science',attrs:'40 PCs'},
{id:'E-301',type:'Seminar Hall',total:30,util:20,loc:'Admin',avail:'Available',dept:'Administration',attrs:'200 seats'},
{id:'E-401',type:'Faculty',total:18,util:55,loc:'Block A',avail:'Available',dept:'Mathematics',attrs:'Statistics'}],
demands:[
{id:'D-1',type:'Classroom',req:20,priority:'High',dept:'Engineering',time:'Next semester',loc:'Block B',constraint:'80 seats'},
{id:'D-2',type:'Computer Lab',req:25,priority:'High',dept:'Commerce',time:'This week',loc:'Block C',constraint:'None'},
{id:'D-3',type:'Seminar Hall',req:12,priority:'Low',dept:'Placement Cell',time:'Next month',loc:'Admin',constraint:'None'},
{id:'D-4',type:'Faculty',req:8,priority:'Medium',dept:'Data Science',time:'Next semester',loc:'Block A',constraint:'Statistics'}]}}

export const PROBLEM = {
causes:[
['Fragmented data','Resources sit in Excel, ERP, MIS, emails, registers and IoT feeds with no single intelligence layer.'],
['Invisible capacity','Nobody sees idle capacity across departments, so teams buy what the organisation already owns.'],
['Demand not linked to supply','A request in one department is never matched automatically to spare capacity in another.'],
['Reactive decisions','Excel → manual analysis → meetings → decision. Problems are found after the shortage hits.']],
users:[
['Operations head','See utilisation and hidden capacity across every department in one view.'],
['Department manager','Request a resource and get a ready match, or a reason none exists.'],
['Procurement / finance','Know whether reuse can replace a purchase before approving it.'],
['Leadership','Test what-if scenarios before committing budget.']],
inputs:['Resource: ID, type, total capacity, utilisation, available capacity, location, availability, department, attributes','Demand: ID, required type, required capacity, priority, department, required time, constraints','Sources: Excel, ERP, MIS, emails, IoT'],
outputs:['Utilisation insights','Hidden-capacity alerts','Ranked resource–demand matches','Recommendations: reuse, reallocate or acquire','What-if outcomes'],
constraints:['Domain-independent: one schema for machines, beds, classrooms and more','Must run without a backend for the demo (local data, localStorage)','Explainable: every match shows why it was chosen','Existing data is messy and cannot be replaced overnight'],
gaps:[
['Today','No shared view of capacity','Unified resource and demand model'],
['Today','Matching done by phone and meetings','Scored matching engine'],
['Today','Purchase decisions without reuse check','Reuse-before-acquire recommendation'],
['Today','Planning on last month’s numbers','Forecasting and what-if simulation']]}

export const SOLUTION = {
ai:[
['NLP / LLM','Read emails, registers and spreadsheets and turn them into structured resource and demand records. Explain each recommendation in plain language.'],
['ML forecasting','Predict utilisation and demand per resource type so idle capacity and shortages appear before they happen.'],
['Optimisation + scoring','Match demand to supply by type, capacity fit, location, priority and constraints. Rank the options.'],
['Anomaly detection','Flag resources whose utilisation drifts far from their peers.']],
pipeline:['Collect data','Normalise to one schema','Detect hidden capacity','Match demand','Recommend','What-if'],
phases:[
['Phase 1 — Prototype','React + Vite app, mock data, localStorage, three domains (Manufacturing, Healthcare, Education).','Done'],
['Phase 2 — Backend','Python/FastAPI service, database, CSV and Excel import.','Next'],
['Phase 3 — AI layer','LLM ingestion of unstructured files, ML demand forecasts, explanations.','Planned'],
['Phase 4 — Integration','ERP / MIS connectors, IoT feeds, role-based access, pilot in one organisation.','Planned']],
stack:[['Frontend','React, Vite'],['Backend','Python, FastAPI'],['AI','LLM API, scikit-learn forecasting, NLP extraction'],['Data','Local mock data → PostgreSQL'],['Tooling','AI coding tools for generation and review']]}
