/* * * * * * * * * * * * * as type  * * * * * * * * * * * * * * * * * */

// Example 1:
let someValue: any = 'hello typescript';
let length: number = (someValue as string).length;
console.log(length);

let value: any = 12345;
let strValue: string = (value as number).toFixed(2);
console.log(strValue);

// Example 2: Working with JSON Data
interface User {
  id: number;
  name: string;
  email: string;
}

const jsonData = '{"id": 1, "name": "John Doe", "email": "john@example.com"}';
const user: User = JSON.parse(jsonData) as User;
console.log(user);

// Example 3: Casting in TypeScript with Generics
interface Book {
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const book: Book = {
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  publicationYear: 1925,
  genre: 'Classic'
};

const title = getProperty(book, 'title') as string;
console.log(title.toUpperCase());

const author = getProperty(book, 'author') as string;
console.log(author.toUpperCase());

const genre = getProperty(book, 'genre') as string;
console.log(genre.toUpperCase());

const publicationYear = getProperty(book, 'publicationYear') as number;
console.log(publicationYear);

// Example 4: Casting in Higher-Order Functions
function map<T, U>(array: T[], callback: (item: T) => U): U[] {
  return array.map(callback);
}

const numbers = [1, 2, 3, 4, 5];
const squares = map(numbers, (num) => (num * num) as number);
console.log(squares);

const nums = [1, 2, 3, 4, 5];
const stringNumbers = map(nums, (num) => num.toString() as string);
console.log(stringNumbers);

function customFilter<T>(
  array: (T | undefined)[],
  callback: (item: T | undefined) => boolean | number | undefined
): (T | undefined)[] {
  const result: (T | undefined)[] = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

const filteredNumbers = customFilter([1, 2, undefined, 4, 5], (num) => num) as number[];

console.log(filteredNumbers);

/* * * * * * * * * * * * * * * * as any * * * * * * * * * * * * * */

let anyValue: any = 123;
console.log(anyValue);
anyValue = 'hello world';
console.log(anyValue);

/* * * * * * * * * * * * * * * * as const * * * * * * * * * * * * */
const colors = ['red', 'green', 'blue'] as const;
console.log(colors);
// colors[0] = 'yellow'; // error

/* * * * * * * * * * * * * * * * Non Null Assertion  * * * * * * * * * * * * */
interface Profile {
  id: number;
  name: string;
  email: string;
}

let profile: Profile | undefined;

async function fetchUser() {
  profile = await getUserFromAPI();
  console.log(profile!.name ?? 'Profile not found');
  console.log(profile!.email ?? ' Profile not found');
}

async function getUserFromAPI(): Promise<Profile> {
  return { id: 1, name: 'John Doe', email: 'john@example.com' };
}

fetchUser();

/* * * * * * * * * * * * * * * * satisfies Keyword * * * * * * * * * * * * */
type Post = {
  title: string;
  author: string;
  date: string;
};

const apiResponse = {
  title: 'My First Post',
  author: 'John Doe',
  date: '2022-01-01',
  status: 'published'
} satisfies Post;

console.log(apiResponse);

type Config = {
  appName: string;
  version: string;
};

const userConfig = {
  appName: 'My App',
  version: '1.0.0',
  theme: 'Dark'
} satisfies Config;

console.log(userConfig);

type Product = {
  id: number;
  name: string;
  price: number;
};

const electronicProduct = {
  id: 1,
  name: 'Smartphone',
  price: 1000,
  type: 'Electronics'
} satisfies Product;

console.log(electronicProduct);

type Payload = {
  action: string;
  data: object;
};

const requestPayload = {
  action: 'GET_DATA',
  data: { id: 1, name: 'Alice' },
  timestamp: Date.now()
} satisfies Payload;

console.log(requestPayload);
