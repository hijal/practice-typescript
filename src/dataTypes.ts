// number - represents both integers and floating point numbers
let age: number = 20;
let price: number = 99.99;
console.log(age, price);

// string - represents textual data
let name: string = 'Alice';
let message: string = `Hello, ${name}!`;
console.log(message);

// boolean - represents true or false values
let isStudent: boolean = true;
console.log(isStudent);

// any - disable type checking, can hold any type of value
let anyValue: any = 10;
anyValue = 'Alice';
anyValue = true;
console.log(anyValue);

// void - represents the absence of a value, usually used as the return type of functions that don't return anything
function printEvenNumbers(value: number): void {
  if (value % 2 === 0) {
    console.log(value);
  }
}

printEvenNumbers(10);

// null - represents the absence of a value
function getVowels(str: string) {
  const m = str.match(/[aeiou]/gi);
  if (m === null) {
    return null;
  }
  return m.length;
}

console.log('number of vowels: ', getVowels('sky'));

// undefined - represents an uninitialized variable
let undefinedVariable: undefined;
console.log(undefinedVariable);

// object - represents non-primitive types
let person: object = {
  name: 'Alice',
  age: 20
};
console.log(person);

// symbol - represents a unique and immutable value, used as a unique identifier
const obj_symbol: symbol = Symbol();

let object: {
  [key: symbol]: string;
} = {
  [obj_symbol]: 'obj value'
};

console.log(object[obj_symbol]);

// type alias - allows creating a custom name of type
type MyType = string | number;
let myTypeVariable: MyType = 'Alice';
console.log(myTypeVariable);
myTypeVariable = 20;
console.log(myTypeVariable);

// type union - a variable can hold several types
type MyUnionType = string | number | boolean;
let myUnionVariable: MyUnionType = 'Alice';
console.log(myUnionVariable);
myUnionVariable = 20;
console.log(myUnionVariable);
myUnionVariable = true;
console.log(myUnionVariable);

// intersection type - combine multiple types into a single type
type Person = { name: string };
type Employee = { age: number };
let worker: Person & Employee = {
  name: 'Alice',
  age: 20
};

console.log(worker);

// type assertions - tells the compiler to treat a value as a specific type
let someValue: any = 'string';
let length: number = (someValue as string).length;
console.log(length);

// never - represents the type of values that never occur, typically used for functions that always throw an error or infinite loops

function errorFunction(): never {
  throw new Error('An error occurred!');
}

console.log(errorFunction());
