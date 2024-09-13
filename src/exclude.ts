type T0 = Exclude<'a' | 'b', 'c'>;
type T1 = Extract<'a' | 'b', 'a'>;

type Animal = 'cat' | 'dog' | 'bird';
type NotCat = Exclude<Animal, 'cat'>;
