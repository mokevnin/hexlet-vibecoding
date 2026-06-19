import { useState } from 'react';
import { Flame } from 'lucide-react';

import {
  calculateCalories,
  calculateMacros,
  type CaloriesResult,
  type Gender,
  type Macros,
} from '@/lib/calculator';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ACTIVITY_OPTIONS = [
  { value: '1.2', label: 'Минимальный (сидячий образ жизни)' },
  { value: '1.375', label: 'Низкий (1–3 тренировки в неделю)' },
  { value: '1.55', label: 'Средний (3–5 тренировок в неделю)' },
  { value: '1.725', label: 'Высокий (6–7 тренировок в неделю)' },
  { value: '1.9', label: 'Очень высокий (тяжёлый физический труд)' },
];

const GOAL_OPTIONS = [
  { value: '0.85', label: 'Похудение (−15%)' },
  { value: '1', label: 'Поддержание веса' },
  { value: '1.15', label: 'Набор массы (+15%)' },
];

const nf = new Intl.NumberFormat('ru-RU');

interface Results {
  result: CaloriesResult;
  macros: Macros;
}

function App() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.55');
  const [goal, setGoal] = useState('1');
  const [error, setError] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const ageNum = Number(age);
    const weightNum = Number(weight);
    const heightNum = Number(height);

    if (!ageNum || !weightNum || !heightNum) {
      setError('Заполните возраст, вес и рост корректными числами.');
      setResults(null);
      return;
    }
    if (ageNum <= 0 || weightNum <= 0 || heightNum <= 0) {
      setError('Возраст, вес и рост должны быть больше нуля.');
      setResults(null);
      return;
    }

    const result = calculateCalories({
      gender,
      age: ageNum,
      weight: weightNum,
      height: heightNum,
      activity: Number(activity),
      goal: Number(goal),
    });

    setError('');
    setResults({ result, macros: calculateMacros(result.calories) });
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Flame className="size-6 text-orange-500" />
            Калькулятор калорий
          </CardTitle>
          <CardDescription>
            Суточная норма по формуле Миффлина-Сан Жеора
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Пол</Label>
              <RadioGroup
                value={gender}
                onValueChange={(value) => setGender(value as Gender)}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="font-normal">Мужчина</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="font-normal">Женщина</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="age">Возраст</Label>
                <Input
                  id="age"
                  type="number"
                  inputMode="numeric"
                  placeholder="30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Вес, кг</Label>
                <Input
                  id="weight"
                  type="number"
                  inputMode="decimal"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Рост, см</Label>
                <Input
                  id="height"
                  type="number"
                  inputMode="decimal"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Уровень активности</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Цель</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GOAL_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Рассчитать
            </Button>
          </form>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          {results && (
            <div className="mt-6 space-y-4 border-t pt-6" aria-live="polite">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {nf.format(results.result.calories)}
                  </span>
                  <span className="text-muted-foreground">ккал / день</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Базовый обмен: {nf.format(results.result.bmr)} ккал · Поддержание:{' '}
                  {nf.format(results.result.maintenance)} ккал
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Macro label="Белки, г" value={results.macros.protein} />
                <Macro label="Жиры, г" value={results.macros.fat} />
                <Macro label="Углеводы, г" value={results.macros.carbs} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Macro({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-3 text-center">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export default App;
