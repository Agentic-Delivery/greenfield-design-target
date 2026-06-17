/**
 * Returns an isolated basket state instance.
 * Pure state machine — no DOM, no side effects.
 */
export function createBasketStore() {
  const items = [];
  return {
    add(item) {
      items.push(item);
    },
    getItems() {
      return [...items];
    },
    getCount() {
      return items.length;
    },
    getTotal() {
      return items.reduce((sum, item) => sum + item.price, 0);
    },
    isEmpty() {
      return items.length === 0;
    }
  };
}

/**
 * Returns true when email is a plausible address, false otherwise.
 * Trims surrounding whitespace before testing.
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Formats a number (or numeric string) as British pounds: £X.XX
 */
export function formatMoney(n) {
  return '£' + Number(n).toFixed(2);
}
