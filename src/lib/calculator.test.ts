import { describe, expect, it } from 'vitest';
import { calculateBMR, calculateCalories, calculateMacros } from './calculator';

describe('calculateBMR', () => {
  it('считает BMR для мужчины', () => {
    // 10*80 + 6.25*180 - 5*30 + 5 = 1780
    expect(calculateBMR({ gender: 'male', weight: 80, height: 180, age: 30 })).toBe(1780);
  });

  it('считает BMR для женщины', () => {
    // 10*60 + 6.25*165 - 5*25 - 161 = 1345.25
    expect(calculateBMR({ gender: 'female', weight: 60, height: 165, age: 25 })).toBe(1345.25);
  });
});

describe('calculateCalories', () => {
  it('учитывает активность и поддержание', () => {
    const r = calculateCalories({ gender: 'male', weight: 80, height: 180, age: 30, activity: 1.55, goal: 1 });
    expect(r.bmr).toBe(1780);
    expect(r.maintenance).toBe(Math.round(1780 * 1.55));
    expect(r.calories).toBe(Math.round(1780 * 1.55));
  });

  it('уменьшает калории при цели похудения', () => {
    const r = calculateCalories({ gender: 'male', weight: 80, height: 180, age: 30, activity: 1.55, goal: 0.85 });
    expect(r.calories).toBeLessThan(r.maintenance);
  });
});

describe('calculateMacros', () => {
  it('распределяет БЖУ 30/30/40', () => {
    const m = calculateMacros(2000);
    expect(m.protein).toBe(150);
    expect(m.fat).toBe(67);
    expect(m.carbs).toBe(200);
  });
});
