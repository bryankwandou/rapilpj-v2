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

// Test 6: Revenue stamp (Meterai) strictly for amounts > Rp5,000,000 per UU No. 10/2020 Pasal 3
const meteraiExact5MLpj = JSON.parse(JSON.stringify(validLpj));
meteraiExact5MLpj.notes.push({
  no: 3,
  item: 'Sewa Gedung',
  amount: 5000000, // Exactly Rp5,000,000 does NOT require meterai
  stamp: true,
  materai: false
});
assert.equal(L.check(meteraiExact5MLpj, 'ugmfeb').issues.filter((i) => i.rule === 'materai').length, 0, 'Exact Rp5.000.000 must not trigger meterai per UU 10/2020');

const meteraiOver5MLpj = JSON.parse(JSON.stringify(validLpj));
meteraiOver5MLpj.notes.push({
  no: 3,
  item: 'Sewa Gedung',
  amount: 5000001, // Strictly > Rp5,000,000 DOES require meterai
  stamp: true,
  materai: false
});
let metRes = L.check(meteraiOver5MLpj, 'ugmfeb');
assert(metRes.issues.some((i) => i.rule === 'materai'), 'Must flag missing revenue stamp strictly for > Rp5.000.000');

// Test 7: Working day calculations (FILKOM UB: 7 working days)
assert.equal(L.workDays('2026-10-02', '2026-10-12'), 6);
assert.equal(L.workDays('2026-10-02', '2026-10-13'), 7);
assert.equal(L.workDays('2026-10-02', '2026-10-14'), 8);

// Test 8: CSV export check (ID & EN)
const csvOut = L.csv(res);
assert(csvOut.includes('Konsumsi'), 'CSV output must contain budget item');
assert(csvOut.includes('1.000.000') || csvOut.includes('1000000'), 'CSV output must contain numbers');
const csvOutEn = L.csv(res, 'en');
assert(csvOutEn.includes('Budget Category'), 'English CSV output must contain English headers');

// Test 9: UAJM preset verification
const uajmLpj = JSON.parse(JSON.stringify(validLpj));
let uajmRes = L.check(uajmLpj, 'uajm');
assert.equal(uajmRes.issues.length, 0, 'Valid LPJ must pass UAJM preset');
uajmLpj.attendanceSheets = 1; // session=2, sheets=1
assert(L.check(uajmLpj, 'uajm').issues.some(i => i.rule === 'attendance'), 'UAJM preset must enforce attendance matching');

// Test 10: Cryptographic SHA-256 standard test vector
const shaVector = L.sha256('test');
assert.equal(shaVector, '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'SHA-256 must match standard test vector');

// Test 11: Audit attestation hash generation
const attestationHash = L.computeAttestationHash(validLpj, res);
assert.equal(typeof attestationHash, 'string');
assert.equal(attestationHash.length, 64, 'Attestation hash must be a 64-character SHA-256 hex string');

// Test 12: Autonomous Addendum generation for budget variance (ID & EN)
const addendumLetter = L.generateAddendumDraft(overBudgetLpj, overRes);
assert(addendumLetter.includes('SURAT PERMOHONAN ADDENDUM PERGESERAN ANGGARAN'), 'Must generate formal addendum header');
assert(addendumLetter.includes('Banner'), 'Addendum must mention overbudget item');
const addendumLetterEn = L.generateAddendumDraft(overBudgetLpj, overRes, 'Student Affairs Bureau', 'en');
assert(addendumLetterEn.includes('OFFICIAL BUDGET VARIANCE ADDENDUM REQUEST LETTER'), 'Must generate English addendum header');
assert(addendumLetterEn.includes('Banner'), 'English addendum must mention overbudget item');

// Test 13: Offline .lpj draft export & import roundtrip
const exportedStr = L.exportDraft(validLpj);
assert(exportedStr.includes('"app": "RapiLPJ"'), 'Exported draft must include app signature');
const importedData = L.parseDraft(exportedStr);
assert.equal(importedData.eventDate, validLpj.eventDate);
assert.equal(importedData.budget.length, validLpj.budget.length);
assert.equal(importedData.notes.length, validLpj.notes.length);

// Test 14: Bilingual English violation messages (msgEn)
const metIssue = metRes.issues.find((i) => i.rule === 'materai');
assert(metIssue && metIssue.msgEn && metIssue.msgEn.includes('revenue stamp'), 'Every violation must carry English msgEn');

// Test 15: Governance Co-Pilot offline fallback without API key
L.callGeminiAdvisory('', overBudgetLpj, overRes, 'BKAM UAJM', 'en').then(async (adv) => {
  assert.equal(adv.mode, 'deterministic_template');
  assert(adv.text.includes('OFFICIAL BUDGET VARIANCE ADDENDUM REQUEST LETTER'));

  // Test 16: Interactive Fiscal Governance Learning Modules
  const materaiMod = L.getLearningModule('materai');
  assert(materaiMod && materaiMod.quiz, 'Must provide fiscal learning module for materai');
  assert(materaiMod.concept.includes('LEBIH DARI Rp5.000.000'), 'Concept must cite strictly > Rp5.000.000');
  const quizResCorrect = L.evaluateQuiz('materai', 0);
  assert(quizResCorrect.isCorrect === true, 'Quiz evaluation must validate correct answer');
  const quizResWrong = L.evaluateQuiz('materai', 1);
  assert(quizResWrong.isCorrect === false, 'Quiz evaluation must detect wrong answer');

  // Test 17: Gemini Multimodal Receipt Parser fallback mode
  const parsedReceipt = await L.parseReceiptWithGemini(null, '');
  assert.equal(parsedReceipt.mode, 'deterministic_heuristic');
  assert(parsedReceipt.receipt && parsedReceipt.receipt.amount > 0);

  // Test 18: Faculty Verifier Desk-Check Verification Engine
  const verifierRes = L.verifyLpjDossier(validLpj, attestationHash, 'uajm');
  assert.equal(verifierRes.hashMatch, true, 'Attestation hash must match valid LPJ');
  assert.equal(verifierRes.canApprove, true, 'Valid LPJ must be approved by faculty verifier');
  assert.equal(verifierRes.balanceVerified, true, 'Balance must be verified');

  // Test 19: Tampered LPJ detection in Verifier Mode
  const tamperedVerifierRes = L.verifyLpjDossier(validLpj, '0000000000000000000000000000000000000000000000000000000000000000', 'uajm');
  assert.equal(tamperedVerifierRes.hashMatch, false, 'Tampered hash must be rejected');
  assert.equal(tamperedVerifierRes.canApprove, false, 'Tampered dossier cannot be approved');

  console.log('ALL TESTS PASSED (19/19 SUCCESS)');
});
