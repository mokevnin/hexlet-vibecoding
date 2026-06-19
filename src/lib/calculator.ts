// Логика расчёта калорий (формула Миффлина-Сан Жеора).
// Чистые функции, не зависящие от UI, чтобы их можно было тестировать.

export type Gender = 'male' | 'female';

export interface BmrParams {
  gender: Gender;
  weight: number; // кг
  height: number; // см
  age: number; // лет
}

export interface CaloriesParams extends BmrParams {
  activity: number; // коэффициент активности (1.2–1.9)
  goal: number; // коэффициент цели (0.85, 1, 1.15)
}

export interface CaloriesResult {
  bmr: number;
  maintenance: number;
  calories: number;
}

export interface Macros {
  protein: number;
  fat: number;
  carbs: number;
}

/** Базовый обмен веществ (BMR), ккал/сутки. */
export function calculateBMR({ gender, weight, height, age }: BmrParams): number {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

/** Суточная норма калорий с учётом активности и цели. */
export function calculateCalories(params: CaloriesParams): CaloriesResult {
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
 */
export function calculateMacros(calories: number): Macros {
  return {
    protein: Math.round((calories * 0.3) / 4),
    fat: Math.round((calories * 0.3) / 9),
    carbs: Math.round((calories * 0.4) / 4),
  };
}
