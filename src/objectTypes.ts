function greet(person: { name: string; age: number; city: string }) {
  return 'Hello ' + person.name;
}

const john = { name: 'John', age: 30, city: 'New York' };
console.log(greet(john));

interface IPerson {
  name: string;
  age: number;
  city: string;
}

function IGreet(person: IPerson) {
  return 'Hello ' + person.name;
}

const jane: IPerson = { name: 'Jane', age: 25, city: 'Los Angeles' };
console.log(IGreet(jane));

type TPerson = {
  name: string;
  age: number;
  city: string;
};

function TGreet(person: TPerson) {
  return 'Hello ' + person.name;
}

const mary: TPerson = {
  name: 'Mary',
  age: 25,
  city: 'Los Angeles'
};

console.log(TGreet(mary));

/************************* Optional Properties ************************/
interface Shape {
  name: string;
}

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function painShape(opts: PaintOptions) {
  console.log('Paining shape:', opts.shape.name);
  if (opts.xPos && opts.yPos) {
    console.log(`At position: (${opts.xPos}, ${opts.yPos})`);
  }
}

function getShape(name: string): Shape {
  if (name === 'circle') {
    return { name: 'circle' };
  } else if (name === 'square') {
    return { name: 'square' };
  } else {
    throw new Error(`Invalid shape name: ${name}`);
  }
}

const shape = getShape('circle');
painShape({ shape });
painShape({ shape, xPos: 10, yPos: 20 });

/************************* readonly Properties ************************/

interface Home {
  readonly resident: {
    name: string;
    age: number;
  };
}

function visitForBirthday(home: Home) {
  console.log(`Happy birthday ${home.resident.name}!`);
  console.log(`Happy birthday ${home.resident.age}!`);
  home.resident.age++;
  console.log(`Happy birthday ${home.resident.age}!`);
}

// example usage
visitForBirthday({
  resident: {
    name: 'Alice',
    age: 30
  }
});

// Cannot assign to 'resident' because it is a read-only property.
/*
function evict(home: Home) {
  home.resident = {
    name: 'Bob',
    age: 35
  };
}
*/

interface Post {
  title: string;
  date: Date;
  fav: number;
}

interface ReadOnlyPost {
  readonly title: string;
  readonly date: Date;
  readonly fav: number;
}

let writeablePost: Post = {
  title: 'Hello World',
  date: new Date(),
  fav: 1000
};

let readonlyPost: ReadOnlyPost = writeablePost;

console.log(readonlyPost.fav); // 1000
writeablePost.fav++;
console.log(readonlyPost.fav); // 1001

/************************* Index Signatures ************************/
interface StringArray {
  [key: number]: string;
}

function getStringArray(): StringArray {
  return ['a', 'b', 'c'];
}

const myArr: StringArray = getStringArray();
console.log(myArr[1]); // 'b'

interface NumberOrStringDictionary {
  [key: string]: number | string;
  length: number;
  name: string;
}

let obj: NumberOrStringDictionary = {
  length: 10,
  name: 'Alice',
  '0': 'Alice',
  '1': 'Bob',
  '2': 'Charlie'
};

console.log(obj.length); // 10

interface ReadonlyStringArray {
  readonly [key: number]: string;
}
function getReadOnlyStringArray(): ReadonlyStringArray {
  return ['Alice', 'Bob', 'Charlie'];
}
let myArray: ReadonlyStringArray = getReadOnlyStringArray();
// Error: Cannot assign to '2' because it is a read-only property.
// myArray[2] = 'Mallory';
console.log(myArray);

/************************* Excess Property Checks ************************/
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    ...config,
    color: config.color || 'blue',
    area: config.width ? config.width * config.width : 20
  };
}

const mySquare = createSquare({
  color: 'black',
  width: 10
});

console.log(mySquare);

const mySquare2 = createSquare({
  opacity: 0.6,
  area: 25
});

console.log(mySquare2);

/************************* Extending Types ************************/
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}

const myAddress: AddressWithUnit = {
  street: '123 Main St',
  city: 'New York',
  country: 'USA',
  postalCode: '10001',
  unit: 'A'
};

console.log(myAddress);

interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
  stroke?: string;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: 'purple',
  radius: 5
};

console.log(cc);

/************************* Intersection Types ************************/

type ColorFullCircle = Circle & Colorful;

const cfc: ColorFullCircle = {
  color: 'green',
  radius: 15,
  stroke: 'black'
};

console.log(cfc);

/************************* Generic Object Types ************************/

interface Box {
  contents: unknown;
}

const x: Box = {
  contents: 'Hello'
};
if (typeof x.contents === 'string') {
  console.log(x.contents.toLowerCase());
}

console.log((x.contents as string).toLowerCase());

interface NBox {
  contents: number;
}

interface SBox {
  contents: string;
}

interface BBox {
  contents: boolean;
}

function setContentsN(b: NBox, content: string): void {
  console.log(b.contents + parseInt(content));
}

setContentsN(
  {
    contents: 10
  },
  '123'
);

function setContentsS(b: SBox, content: string): void {
  console.log(b.contents + ' ' + content);
}

setContentsS(
  {
    contents: 'Hello'
  },
  'World'
);

function setContentsB(b: BBox, content: boolean): void {
  console.log(b.contents + ' ' + content);
}

setContentsB(
  {
    contents: true
  },
  false
);

interface GBox<type> {
  contents: type;
}

let gbox: GBox<string>;
gbox = {
  contents: 'Hello'
};
console.log(gbox.contents.toUpperCase());
