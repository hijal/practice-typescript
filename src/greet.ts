// type safety check

function greet(name: string): string {
  return 'Hello, ' + name + '!';
}

const user: string = 'Alice';
const greeting: string = greet(user);
console.log(greeting);

// type interface
interface Person {
  name: string;
  age: number;
  city: string;
}

function greetPerson(person: Person): string {
  return `${person.name} is ${person.age} years old and lives in ${person.city}.
  `;
}

const john: Person = {
  name: 'John',
  age: 30,
  city: 'New York'
};
const greeting2: string = greetPerson(john);
console.log(greeting2);

const test: any = {
  name: 'Hijal',
  age: 25,
  city: 'Bangalore'
};


console.log(test);