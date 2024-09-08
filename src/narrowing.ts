// Narrowing is the process of refining types to more specific types than declared.
// useful when dealing with variables that can hold multiple possible types. such as any or unknown types
// types of narrowing -
//                1) Type Guards
//                2) Control Flow Analysis
//                3) Discriminated Union

//************************* Type Guards ********************************/
function padLeft(padding: number | string, input: string | number): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input;
  }
  return padding + input;
}

console.log(padLeft(10, 'hello'));

/************************************************* custom type guards ******************************/
interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

function isDog(animal: Dog | Cat): animal is Dog {
  return (animal as Dog).bark !== undefined;
}
// call isDog

const dog: Dog = {
  bark() {
    console.log('Woof!');
  }
};

// dog.bark();
if (isDog(dog)) {
  dog.bark();
}

function isCat(animal: Dog | Cat): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

const cat: Cat = {
  meow() {
    console.log('Meow!');
  }
};

// cat.meow();
if (isCat(cat)) {
  cat.meow();
}

/******************************* instanceof type guards ****************************/
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
}

function printDetails(person: Person | Employee): void {
  if (person instanceof Employee) {
    console.log(`Name: ${person.name}, Department: ${person.department}`);
  } else {
    console.log(`Name: ${person.name}`);
  }
}

// person instance
const alice = new Person('Alice');
printDetails(alice);

// employee instance
const jane = new Employee('Jane', 'IT');
printDetails(jane);

/***************** Control Flow Analysis *****************************/
function analysis() {
  let x: string | number | boolean; // initial types x can be boolean or number or string

  x = Math.random() < 0.5;
  console.log(x); // boolean

  if (Math.random() < 0.5) {
    x = 'Control Flow Analysis';
    console.log(x); // string
  } else {
    x = 1000;
    console.log(x); // number
  }
  return x; //  when return string or number types
}

analysis();

/***************** Discriminated Union *****************************/
enum Kind {
  Square = 'Square',
  Circle = 'Circle'
}

interface Square {
  kind: Kind.Square;
  side: number;
}

interface Circle {
  kind: Kind.Circle;
  radius: number;
}

type Shape = Square | Circle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case Kind.Square:
      return shape.side * shape.side;
    case Kind.Circle:
      return Math.PI * shape.radius * shape.radius;
    default:
      throw new Error('Invalid shape type');
  }
}

// Example usage
const square: Square = { kind: Kind.Square, side: 5 };
console.log(`Square area: ${calculateArea(square)}`);

const circle: Circle = { kind: Kind.Circle, radius: 3 };
console.log(`Circle area: ${calculateArea(circle)}`);

/***************** Discriminated Union *****************************/

enum UserKind {
  Manager = 'Manager',
  Admin = 'Admin'
}

interface Manager {
  kind: UserKind.Manager;
  name: string;
}

interface Admin {
  kind: UserKind.Admin;
  name: string;
  permissions: string[];
}

type User = Manager | Admin;

function displayUser(user: User): void {
  switch (user.kind) {
    case UserKind.Manager:
      console.log(`Employee: ${user.name}`);
      break;
    case UserKind.Admin:
      console.log(`Admin: ${user.name}, Permissions: ${user.permissions.join(', ')}`);
      break;
    default:
      throw new Error('Invalid user kind');
  }
}

// Example usage
const manager: Manager = { kind: UserKind.Manager, name: 'Alice' };
displayUser(manager);

const admin: Admin = { kind: UserKind.Admin, name: 'Bob', permissions: ['read', 'write', 'edit', 'remove'] };
displayUser(admin);

/***************** in operator *****************************/

interface Post {
  title: string;
  author?: string;
}

function printPost(post: Post): void {
  if ('author' in post) {
    console.log(`${post.title} by ${post.author}`);
  } else {
    console.log(`${post.title} by guest`);
  }
}

// Example usage
const post1: Post = { title: 'My First Post' };
printPost(post1);

const post2: Post = { title: 'My Second Post', author: 'Alice' };
printPost(post2);

/***************** null and undefined checks *****************************/

function divide(a: number, b: number) {
  if (b === 0) {
    return undefined;
  }

  return a / b;
}

const result = divide(10, 2);

if (result !== undefined) {
  console.log(result);
} else {
  console.log('Cannot divide by zero');
}

/***************** Truthiness Narrowing *****************************/
function getLength(s: string | null) {
  if (s) {
    return s.length;
  } else {
    return 0;
  }
}

// example usage
console.log(getLength('Typescript')); // 5
console.log(getLength(null)); // 0

/***************** Exhaustiveness Checking *****************************/

type Planet =
  | { type: 'Mercury' }
  | { type: 'Venus' }
  | { type: 'Earth' }
  | { type: 'Mars' }
  | { type: 'Jupiter' }
  | { type: 'Saturn' }
  | { type: 'Uranus' }
  | { type: 'Neptune' };

function getDistanceFromSun(planet: Planet): number {
  switch (planet.type) {
    case 'Mercury':
      return 57_910_000;
    case 'Venus':
      return 108_200_000;
    case 'Earth':
      return 149_600_000;
    case 'Mars':
      return 227_940_000;
    case 'Jupiter':
      return 778_330_000;
    case 'Saturn':
      return 1_429_400_000;
    case 'Uranus':
      return 2_870_990_000;
    case 'Neptune':
      return 4_498_390_000;
    default:
      const _exhaustiveCheck: never = planet;
      return _exhaustiveCheck;
  }
}

// example usage
console.log(getDistanceFromSun({ type: 'Earth' })); // 149_600_000
console.log(getDistanceFromSun({ type: 'Venus' })); // 108_200_000

// console.log(getDistanceFromSun({ type: 'Pluto' })); // throws an error
