// Логика расчёта калорий (формула Миффлина-Сан Жеора).
// Чистые функции, не зависящие от DOM, чтобы их можно было тестировать.

/**
 * Базовый обмен веществ (BMR), ккал/сутки.
 * @param {{ gender: 'male'|'female', weight: number, height: number, age: number }} params
 * @returns {number}
 */
function calculateBMR({ gender, weight, height, age }) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

/**
 * Суточная норма калорий с учётом активности и цели.
 * @param {object} params
 * @param {'male'|'female'} params.gender
 * @param {number} params.weight  - кг
 * @param {number} params.height  - см
 * @param {number} params.age     - лет
 * @param {number} params.activity - коэффициент активности (1.2–1.9)
 * @param {number} params.goal     - коэффициент цели (0.85, 1, 1.15)
 * @returns {{ bmr: number, maintenance: number, calories: number }}
 */
function calculateCalories(params) {
  const bmr = calculateBMR(params);
  const maintenance = bmr * params.activity;
  const calories = maintenance * params.goal;
  return {
    bmr: Math.round(bmr),
    maintenance: Math.round(maintenance),
    calories: Math.round(calories),
  };
}

/**
 * Распределение БЖУ из калорийности (30% белки, 30% жиры, 40% углеводы).
 * Белки и углеводы — 4 ккал/г, жиры — 9 ккал/г.
 * @param {number} calories
 * @returns {{ protein: number, fat: number, carbs: number }}
 */
function calculateMacros(calories) {
  return {
    protein: Math.round((calories * 0.3) / 4),
    fat: Math.round((calories * 0.3) / 9),
    carbs: Math.round((calories * 0.4) / 4),
  };
}

// Экспорт для Node (тесты) при сохранении работы в браузере.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateBMR, calculateCalories, calculateMacros };
}
