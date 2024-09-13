type CurrencyRates = Record<string, number>;

const rates: CurrencyRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.78,
  JPY: 110.5,
  AUD: 1.35
};

function convertCurrency(amount: number, from: string, to: string): number {
  if (!rates[from] || !rates[to]) {
    throw new Error('Invalid currency code');
  }

  return (amount * rates[from]) / rates[to];
}

console.log(convertCurrency(100, 'USD', 'EUR')); // 117.64705882352942

type CatName = 'miffy' | 'boris' | 'mordred';

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' }
};

console.log(cats);
