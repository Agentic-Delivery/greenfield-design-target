import { describe, it, expect } from 'vitest';
import { createBasketStore } from '../js/main.js';

describe('createBasketStore', () => {
  it('starts empty', () => {
    const basket = createBasketStore();
    expect(basket.isEmpty()).toBe(true);
    expect(basket.getCount()).toBe(0);
    expect(basket.getTotal()).toBe(0);
    expect(basket.getItems()).toEqual([]);
  });

  it('adds an item and reports it', () => {
    const basket = createBasketStore();
    basket.add({ title: 'A Year of Small Rain', author: 'Bea Okafor', price: 14.99, bg: 'oklch(0.40 0.06 25)' });
    expect(basket.isEmpty()).toBe(false);
    expect(basket.getCount()).toBe(1);
    expect(basket.getItems()[0].title).toBe('A Year of Small Rain');
  });

  it('computes total of multiple items', () => {
    const basket = createBasketStore();
    basket.add({ title: 'Book A', author: 'Author A', price: 14.99, bg: '#000' });
    basket.add({ title: 'Book B', author: 'Author B', price: 10.99, bg: '#000' });
    expect(basket.getTotal()).toBeCloseTo(25.98, 2);
  });

  it('returns a copy of items so callers cannot mutate internal state', () => {
    const basket = createBasketStore();
    basket.add({ title: 'Book A', author: 'Author A', price: 14.99, bg: '#000' });
    const items = basket.getItems();
    items.push({ title: 'Injected', author: 'X', price: 0, bg: '#000' });
    expect(basket.getCount()).toBe(1);
  });

  it('accumulates multiple items and reports count and total', () => {
    const basket = createBasketStore();
    basket.add({ title: 'A', author: 'AA', price: 5.00, bg: '#0' });
    basket.add({ title: 'B', author: 'BB', price: 7.50, bg: '#0' });
    basket.add({ title: 'C', author: 'CC', price: 12.00, bg: '#0' });
    expect(basket.getCount()).toBe(3);
    expect(basket.getTotal()).toBeCloseTo(24.50, 2);
  });

  it('total is 0 when basket is empty', () => {
    const basket = createBasketStore();
    expect(basket.getTotal()).toBe(0);
  });

  it('two basket instances are isolated', () => {
    const a = createBasketStore();
    const b = createBasketStore();
    a.add({ title: 'X', author: 'Y', price: 9.99, bg: '#0' });
    expect(b.getCount()).toBe(0);
  });
});
