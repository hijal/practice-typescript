type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; x: number }
  | { kind: 'triangle'; x: number; y: number };

type OnlyCircle = Extract<Shape, { kind: 'circle' }>;

type Animal = 'cat' | 'human' | 'bird';
type OnlyHuman = Extract<Animal, 'human'>;
