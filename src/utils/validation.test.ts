import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateBusinessName,
  validateEmail,
  validatePassword,
  validateGSTIN,
  formatINR,
} from './validation';

test('validateBusinessName checks requirements properly', () => {
  assert.equal(validateBusinessName('').isValid, false);
  assert.equal(validateBusinessName('   ').isValid, false);
  assert.equal(validateBusinessName('A').isValid, false);
  assert.equal(validateBusinessName('Sharma Electricals').isValid, true);
  assert.equal(validateBusinessName('Patel & Sons Trading Co.').isValid, true);
});

test('validateEmail checks standard and Indian domain emails', () => {
  assert.equal(validateEmail('').isValid, false);
  assert.equal(validateEmail('invalid-email').isValid, false);
  assert.equal(validateEmail('you@').isValid, false);
  assert.equal(validateEmail('you@yourbusiness.in').isValid, true);
  assert.equal(validateEmail('billing@sharma-enterprises.com').isValid, true);
});

test('validatePassword enforces at least 8 characters', () => {
  assert.equal(validatePassword('').isValid, false);
  assert.equal(validatePassword('short').isValid, false);
  assert.equal(validatePassword('1234567').isValid, false);
  assert.equal(validatePassword('12345678').isValid, true);
  assert.equal(validatePassword('securePass#2026').isValid, true);
});

test('validateGSTIN validates 15-character Indian GST format', () => {
  assert.equal(validateGSTIN('').isValid, true); // optional
  assert.equal(validateGSTIN('27AAPFU0939F1ZV').isValid, true);
  assert.equal(validateGSTIN('12345').isValid, false);
  assert.equal(validateGSTIN('27AAPFU0939F1Z').isValid, false);
});

test('formatINR formats numbers correctly using Indian number system', () => {
  assert.ok(formatINR(150000).includes('1,50,000'));
  assert.equal(formatINR(1250000, true), '₹12.50 L');
  assert.equal(formatINR(25000000, true), '₹2.50 Cr');
});
