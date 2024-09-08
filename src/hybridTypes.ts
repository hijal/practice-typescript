type StringOrNumber = number | string;
const v: StringOrNumber = 10;
const y: StringOrNumber = 'hello';

console.log(v);
console.log(y);

type Education = {
  degree: string;
  school: string;
  year: number;
};

type Student = {
  name: string;
  email: string;
  age: number;
  education: Education;
};

const student: Student = {
  name: 'Alice',
  email: 'alice@example.com',
  age: 25,
  education: {
    degree: 'Bachelor',
    school: 'ABC University',
    year: 2018
  }
};

console.log(student);

// Object-Function Hybrid Type
interface Logger {
  (message: string): void;
  level: string;
  setLevel(newLevel: string): void;
}

function createLogger(): Logger {
  let logger = function (message: string): void {
    console.log(`[${logger.level}] ${message}`);
  } as Logger;

  logger.level = 'INFO';
  logger.setLevel = function (newLevel: string): void {
    logger.level = newLevel;
  };
  return logger;
}

const myLogger = createLogger();
myLogger('This is an info message');
myLogger.setLevel('DEBUG');
myLogger('This is a debug message');

// Array-Object Hybrid Type

interface StringArray {
  [index: number]: string;
  length: number;
  description: string;
}

let myStringArray: StringArray = {
  description: 'Array of strings',
  length: 3,
  0: 'Alice',
  1: 'Bob',
  2: 'Charlie'
};

console.log(`[${myStringArray.description}] ${JSON.stringify(myStringArray)}`);
