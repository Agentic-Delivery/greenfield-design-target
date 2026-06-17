import { describe, it, expect } from 'vitest';
import { validateEmail, formatMoney } from '../js/main.js';

describe('validateEmail', () => {
  it('accepts a valid email', () => {
    expect(validateEmail('hello@example.com')).toBe(true);
  });

  it('accepts email with subdomains', () => {
    expect(validateEmail('user@mail.example.co.uk')).toBe(true);
  });

  it('rejects empty string', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('rejects null', () => {
    expect(validateEmail(null)).toBe(false);
  });

  it('rejects undefined', () => {
    expect(validateEmail(undefined)).toBe(false);
  });

  it('rejects address with no @', () => {
    expect(validateEmail('notanemail')).toBe(false);
  });

  it('rejects address with no domain after @', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  it('accepts email with surrounding whitespace (trims before validating)', () => {
    expect(validateEmail('  hello@example.com  ')).toBe(true);
  });

  it('rejects address that is only spaces', () => {
    expect(validateEmail('   ')).toBe(false);
  });
});

describe('formatMoney', () => {
  it('formats whole pounds', () => {
    expect(formatMoney(10)).toBe('£10.00');
  });

  it('formats price with pence', () => {
    expect(formatMoney(14.99)).toBe('£14.99');
  });

  it('rounds to two decimal places', () => {
    expect(formatMoney(14.999)).toBe('£15.00');
  });

  it('formats zero', () => {
    expect(formatMoney(0)).toBe('£0.00');
  });

  it('accepts numeric string', () => {
    expect(formatMoney('12.5')).toBe('£12.50');
  });
});
