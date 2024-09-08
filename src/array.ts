// using square brackets
let fruits: string[] = ['apple', 'banana', 'orange', 'grape'];
console.log(fruits);

// using generic array type
let numbers: Array<number> = [1, 2, 3, 4, 5];
console.log(numbers);

// declare array with type
let declareArray: Array<number>;
declareArray = [1, 2, 3, 4, 5];
console.log(declareArray);

// multiple types
let mixedArr: Array<number | string | boolean> = [1, 2, 'banana', 3, 4, 5, 'orange', 'grape', true, false, 'apple', ''];
console.log(mixedArr);

let values: (string | number | boolean)[] = [1, 2, 'apple', 'banana', 'orange', true, false];
console.log(values);

// declare array with readonly, can't change
let arrReadOnly: readonly string[] = ['apple', 'banana', 'orange', 'grape'];
console.log(arrReadOnly);

function concatArr(items: Array<string>, newItem: string): Array<string> {
  return [...items, newItem];
}

console.log(concatArr(fruits, 'cherry'));

// array of options
const options: Array<{
  [key: string]: unknown;
}> = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' }
];

console.log(options);

function pick<TObject extends Record<string, unknown>>(object: TObject, keys: Array<keyof TObject>) {
  return keys.reduce((acc, key) => {
    acc[key] = object[key];
    return acc;
  }, {} as Partial<TObject>);
}
const myObject = {
  id: 1,
  name: 'Alice',
  age: 20,
  email: 'alice@example.com'
};

console.log(pick(myObject, ['name', 'age', 'email']));
