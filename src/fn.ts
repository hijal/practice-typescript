// Function Type Expressions

type GreetFn = (a: string) => void;
function greet(fn: GreetFn) {
  fn('Hello, Typescript!');
}

function printConsole(s: string) {
  console.log(s);
}

greet(printConsole);

// Call Signatures

type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction): void {
  console.log(fn.description + ' returned ' + fn(6));
}

function myFn(someArg: number): boolean {
  return someArg > 10;
}

myFn.description = 'Default description';

doSomething(myFn);

// Construct Signatures

type DateConstructor = {
  new (year: number, month: number, day: number): Date;
};

const myDate: DateConstructor = Date;
const date = new myDate(2008, 5, 10);
console.log(date);

// Generic Functions

function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>('myString'));
