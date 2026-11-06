const L = require('./engine.js');
const assert = require('assert');

console.log('Running test suite for RapiLPJ v2 Engine...');

// Test 1: Clean compliant case
const validLpj = {
  docs: { report: 1, finance: 1, photos: 1, assignment: 1 },
  eventDate: '2026-10-01',
  submitDate: '2026-10-08',
  approvedTotal: 1500000,
  consumptionSessions: 2,
  attendanceSheets: 2,
  varianceTolerancePercent: 10,
  budget: [
    { item: 'Konsumsi', planned: 1000000 },
    { item: 'Banner', planned: 600000 }
  ],
  notes: [
    { no: 1, refNo: 'INV-01', item: 'Konsumsi', amount: 1000000, stamp: true, pphIncluded: true, date: '2026-10-01' },
    { no: 2, refNo: 'INV-02', item: 'Banner', amount: 500000, stamp: true, pphIncluded: true, date: '2026-10-02' }
  ]
};

let res = L.check(validLpj, 'all');
assert.equal(res.issues.length, 0, `Expected 0 issues for clean case, got: ${JSON.stringify(res.issues)}`);
assert.equal(res.spent, 1500000);
assert.equal(res.planned, 1600000);
assert.equal(res.budget[1].diff, -100000);

// Test 2: Duplicate invoice detection
const dupLpj = JSON.parse(JSON.stringify(validLpj));
dupLpj.notes.push({
  no: 3,
  refNo: 'INV-01', // duplicate of note #1
  item: 'Banner',
  amount: 100000,
  stamp: true,
  pphIncluded: true
});
let dupRes = L.check(dupLpj, 'standard');
assert(dupRes.issues.some((i) => i.rule === 'duplicateInvoice'), 'Must detect duplicate invoice reference');

// Test 3: Over-budget threshold violation (>10%)
const overBudgetLpj = JSON.parse(JSON.stringify(validLpj));
overBudgetLpj.notes[1].amount = 800000; // planned 600k -> 800k = +33.3% > 10%
let overRes = L.check(overBudgetLpj, 'standard');
assert(overRes.issues.some((i) => i.rule === 'budgetVariance'), 'Must detect budget variance violation');

// Test 4: Unplanned post detection
const unplannedLpj = JSON.parse(JSON.stringify(validLpj));
unplannedLpj.notes.push({
  no: 3,
  refNo: 'INV-99',
  item: 'Snack Tambahan Spontan',
  amount: 200000,
  stamp: true
});
let unpRes = L.check(unplannedLpj, 'standard');
assert(unpRes.issues.some((i) => i.rule === 'unplannedPost'), 'Must detect unplanned expense item');

// Test 5: Date sanity violation (receipt after submission date)
const dateViolationLpj = JSON.parse(JSON.stringify(validLpj));
dateViolationLpj.notes[0].date = '2026-10-20'; // submitDate is 2026-10-08
let dateRes = L.check(dateViolationLpj, 'standard');
assert(dateRes.issues.some((i) => i.rule === 'dateSanity'), 'Must detect date sanity violation');

// Test 6: Revenue stamp (Meterai) for amounts >= Rp5,000,000
const meteraiLpj = JSON.parse(JSON.stringify(validLpj));
meteraiLpj.notes.push({
  no: 3,
  item: 'Sewa Gedung',
  amount: 5000000,
  stamp: true,
  materai: false
});
let metRes = L.check(meteraiLpj, 'ugmfeb');
assert(metRes.issues.some((i) => i.rule === 'materai'), 'Must flag missing revenue stamp for >= Rp5.000.000');

// Test 7: Working day calculations (FILKOM UB: 7 working days)
assert.equal(L.workDays('2026-10-02', '2026-10-12'), 6);
assert.equal(L.workDays('2026-10-02', '2026-10-13'), 7);
assert.equal(L.workDays('2026-10-02', '2026-10-14'), 8);

// Test 8: CSV export check
const csvOut = L.csv(res);
assert(csvOut.includes('Konsumsi'), 'CSV output must contain budget item');
assert(csvOut.includes('1.000.000') || csvOut.includes('1000000'), 'CSV output must contain numbers');

console.log('ALL TESTS PASSED (8/8 SUCCESS)');
