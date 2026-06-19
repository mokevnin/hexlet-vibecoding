# hexlet-vibecoding

## Калькулятор калорий

Веб-приложение для расчёта суточной нормы калорий по формуле
**Миффлина-Сан Жеора** с учётом пола, возраста, веса, роста, уровня
активности и цели (похудение / поддержание / набор массы). Дополнительно
показывает рекомендуемое распределение БЖУ.

Интерфейс построен на **React + Vite + TypeScript** и компонентах
[**shadcn/ui**](https://ui.shadcn.com) (Tailwind CSS + Radix UI).

### Установка

```bash
npm install
```

### Запуск (режим разработки)

```bash
npm run dev
# http://localhost:5173
```

### Сборка и предпросмотр

```bash
npm run build
npm run preview
```

### Тесты

Логика расчёта вынесена в `src/lib/calculator.ts` и покрыта тестами (Vitest):

```bash
npm test
```

### Структура

- `src/App.tsx` — экран калькулятора на компонентах shadcn/ui
- `src/lib/calculator.ts` — чистые функции расчёта (BMR, калории, БЖУ)
- `src/lib/calculator.test.ts` — тесты логики
- `src/components/ui/*` — компоненты shadcn/ui (button, input, label, select, card, radio-group)
- `components.json` — конфигурация shadcn/ui
