// Простые тесты без зависимостей. Запуск: node calculator.test.js
const assert = require('assert');
const { calculateBMR, calculateCalories, calculateMacros } = require('./calculator');

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log(`  ok  ${name}`);
}

// BMR по формуле Миффлина-Сан Жеора
test('BMR для мужчины', () => {
  // 10*80 + 6.25*180 - 5*30 + 5 = 1780
  assert.strictEqual(calculateBMR({ gender: 'male', weight: 80, height: 180, age: 30 }), 1780);
});

test('BMR для женщины', () => {
  // 10*60 + 6.25*165 - 5*25 - 161 = 1345.25
  assert.strictEqual(calculateBMR({ gender: 'female', weight: 60, height: 165, age: 25 }), 1345.25);
});

test('Суточная норма с активностью и поддержанием', () => {
  const r = calculateCalories({ gender: 'male', weight: 80, height: 180, age: 30, activity: 1.55, goal: 1 });
  assert.strictEqual(r.bmr, 1780);
  assert.strictEqual(r.maintenance, Math.round(1780 * 1.55)); // 2759
  assert.strictEqual(r.calories, Math.round(1780 * 1.55 * 1));
});

test('Цель похудение уменьшает калории', () => {
  const r = calculateCalories({ gender: 'male', weight: 80, height: 180, age: 30, activity: 1.55, goal: 0.85 });
  assert.ok(r.calories < r.maintenance);
});

test('Распределение БЖУ', () => {
  const m = calculateMacros(2000);
  assert.strictEqual(m.protein, Math.round((2000 * 0.3) / 4)); // 150
  assert.strictEqual(m.fat, Math.round((2000 * 0.3) / 9)); // 67
  assert.strictEqual(m.carbs, Math.round((2000 * 0.4) / 4)); // 200
});

console.log(`\n${passed} тестов пройдено.`);
