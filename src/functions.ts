// Function Type Expressions

function greeter(fn: (name: string) => void) {
  fn('Typescript');
}

function printToConsole(name: string) {
  console.log(`Hello, ${name}!`);
}

greeter(printToConsole);

// Call Signatures

type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction): void {
  console.log(fn.description + ' returned ' + fn(6));
}

function myFunction(someArg: number): boolean {
  return someArg > 10;
}

myFunction.description = 'Default description';

doSomething(myFunction);

type Calculator = {
  operation: string;
  (a: number, b: number): number;
};

const add: Calculator = function (a: number, b: number) {
  return a + b;
};

add.operation = 'Addition';

console.log(`${add.operation} returned ${add(5, 3)}`);

const subtraction: Calculator = function (a: number, b: number): number {
  return a - b;
};
subtraction.operation = 'Subtraction';

console.log(`${subtraction.operation} returned ${subtraction(5, 3)}`);

const multiply: Calculator = (a: number, b: number) => a * b;
multiply.operation = 'Multiplication';

console.log(`${multiply.operation} returned ${multiply(5, 3)}`);

const division: Calculator = (a: number, b: number) => a / b;
division.operation = 'Division';

console.log(`${division.operation} returned ${division(5, 3)}`);

// Construct Signatures

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const jane = new Person('Jane');
jane.greet();

class Book {
  constructor(public title: string, public author: string) {}
}

type BookConstructor = new (title: string, author: string) => Book;
function createBook(bookConstructor: BookConstructor, title: string, author: string) {
  return new bookConstructor(title, author);
}
const book = createBook(Book, 'Typescript', 'Microsoft');

console.log('Title: ' + book.title);
console.log('Author: ' + book.author);

// Generic Functions

function gft<T>(arg: T): T {
  console.log(arg);
  return arg;
}
let r1 = gft<string>('Hello TypeScript');
console.log(r1);
let r2 = gft<number>(12345);
console.log(r2);
let r3 = gft<boolean>(true);
console.log(r3);

function arrEl<T>(arr: T[]): void {
  for (let x of arr) {
    console.log(x);
  }
}

let e1: number[] = [1, 2, 3, 4, 5];
arrEl(e1);

let e2: string[] = ['A', 'B', 'C', 'D'];
arrEl(e2);

function mergeArr<T, U>(a1: T[], a2: U[]): (T | U)[] {
  return [...a1, ...a2];
}
const numbers: number[] = [1, 2, 3];
const words: string[] = ['hello', 'world'];

const mergedArray: (number | string)[] = mergeArr(numbers, words);

console.log(mergedArray);

// Constraints Generic function

function longest<
  T extends {
    length: number;
  }
>(a: T, b: T): T {
  if (a.length >= b.length) {
    return a;
  }
  return b;
}

const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray);

const longerString = longest('alice', 'bob');
console.log(longerString);

// Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
// const notOK = longest(10, 100);
// console.log(notOK);

// Working with Constrained Values

function minimumLength<
  T extends {
    length: number;
  }
>(obj: T, minimum: number): T {
  if (obj.length >= minimum) {
    return obj;
  }
  return {
    ...obj,
    length: minimum
  } as T;
}

const obj1 = { length: 5, value: 'hello' };
const result1 = minimumLength(obj1, 3);
console.log(result1);

const obj2 = { length: 5, value: 'hi' };
const result2 = minimumLength(obj2, 5);
console.log(result2);

const obj3 = { length: 10, value: 'world' };
const result3 = minimumLength(obj3, 10);
console.log(result3);

const obj4 = { length: 3, value: 'test', extra: 'property' };
const result4 = minimumLength(obj4, 2);
console.log(result4);

// Function Overloads

function addition(a: number, b: number): number;
function addition(a: string, b: string): number;

function addition(a: unknown, b: unknown): number {
  if (typeof a === 'string' && typeof b === 'string') {
    return Number(a) + Number(b);
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  return 0;
}

// example usage
console.log(addition(1, 2)); // 3
console.log(addition('3', '4')); // 7
console.log(addition('hello', 'world')); // NaN

function len(s: string): number;
function len(arr: any[] | string): number;
function len(x: any) {
  return x.length;
}

// example usage
console.log(len('hello')); // 5
console.log(len([1, 2, 3])); // 3
console.log(len(Math.random() > 0.5 ? 'Typescript' : [0])); // 10 or 1

// Declaring this in a Function

const user = {
  id: 1,
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  }
};

console.log(user);
