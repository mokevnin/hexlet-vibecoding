// Связывание формы с логикой расчёта.

const form = document.getElementById('calc-form');
const errorEl = document.getElementById('error');
const resultEl = document.getElementById('result');

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  resultEl.hidden = true;
}

function render({ calories, bmr, maintenance }, macros) {
  document.getElementById('calories').textContent = calories.toLocaleString('ru-RU');
  document.getElementById('bmr-note').textContent =
    `Базовый обмен: ${bmr.toLocaleString('ru-RU')} ккал · Поддержание: ${maintenance.toLocaleString('ru-RU')} ккал`;
  document.getElementById('protein').textContent = macros.protein;
  document.getElementById('fat').textContent = macros.fat;
  document.getElementById('carbs').textContent = macros.carbs;
  errorEl.hidden = true;
  resultEl.hidden = false;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const params = {
    gender: data.get('gender'),
    age: Number(data.get('age')),
    weight: Number(data.get('weight')),
    height: Number(data.get('height')),
    activity: Number(data.get('activity')),
    goal: Number(data.get('goal')),
  };

  if (!params.age || !params.weight || !params.height) {
    showError('Заполните возраст, вес и рост корректными числами.');
    return;
  }
  if (params.age <= 0 || params.weight <= 0 || params.height <= 0) {
    showError('Возраст, вес и рост должны быть больше нуля.');
    return;
  }

  const result = calculateCalories(params);
  const macros = calculateMacros(result.calories);
  render(result, macros);
});
