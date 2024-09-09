function identity<T>(arg: T): T {
  return arg;
}

// example usage
console.log(identity<string>('myString'));
console.log(identity<number>(123));
console.log(identity<boolean>(true));
console.log(identity<object>({ name: 'Alice' }));
console.log(identity<Function>(() => {}));
console.log(identity<any[]>([1, 2, 3]));

// interface GenericIdentityFn {
//   <T>(arg: T): T;
// }

interface GenericIdentityFn<T> {
  (arg: T): T;
}
function identity1<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<string> = identity1;
console.log(myIdentity('myString'));

// Generic Classes with array

class MediaItem {
  title: string;
  creator: string;
  year: number;

  constructor(title: string, creator: string, year: number) {
    this.title = title;
    this.creator = creator;
    this.year = year;
  }
}

class MediaCatalog<T extends MediaItem> {
  private catalogItems: T[] = [];

  addItem(item: T): void {
    this.catalogItems.push(item);
  }

  removeItem(item: T): void {
    const itemIndex = this.catalogItems.findIndex(
      (i) => i.title === item.title && i.creator === item.creator && i.year === item.year
    );

    if (itemIndex > -1) {
      this.catalogItems.splice(itemIndex, 1);
    }
  }

  getItems(): T[] {
    return this.catalogItems;
  }
}

class Book extends MediaItem {
  genre: string;

  constructor(title: string, creator: string, year: number, genre: string) {
    super(title, creator, year);
    this.genre = genre;
  }
}

class Movie extends MediaItem {
  genre: string;

  constructor(title: string, creator: string, year: number, genre: string) {
    super(title, creator, year);
    this.genre = genre;
  }
}

const bookCatalog = new MediaCatalog<Book>();
const movieCatalog = new MediaCatalog<Movie>();

bookCatalog.addItem(new Book('To Kill a Mockingbird', 'Harper Lee', 1960, 'Classic Fiction'));
bookCatalog.addItem(new Book('1984', 'George Orwell', 1949, 'Classic Fiction'));
// books
console.log(bookCatalog.getItems());

movieCatalog.addItem(new Movie('Inception', 'Christopher Nolan', 2010, 'Science Fiction'));
movieCatalog.addItem(new Movie('The Matrix', 'The Wachowski Brothers', 1999, 'Science Fiction'));
// movies
console.log(movieCatalog.getItems());

// remove book
const bookToRemove = new Book('1984', 'George Orwell', 1949, 'Classic Fiction');
bookCatalog.removeItem(bookToRemove);
console.log(bookCatalog.getItems());

// remove movie
const movieToRemove = new Movie('The Matrix', 'The Wachowski Brothers', 1999, 'Science Fiction');
movieCatalog.removeItem(movieToRemove);
console.log(movieCatalog.getItems());

// generic class with stack implementation
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  print(): void {
    console.log(this.items);
  }
}

const stack = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);

console.log('Top element:', stack.peek()); // 3
stack.push(4);
console.log('Stack size:', stack.size()); // 4

stack.pop();
stack.pop();
console.log('Top element after popping:', stack.peek()); // 2
stack.print(); // [2, 1]
console.log('Is stack empty?', stack.isEmpty()); // false

// Generic class Dictionary approach

class EntityNotFoundException extends Error {
  constructor(id: number) {
    super(`Entity with ID ${id} not found!`);
    this.name = 'EntityNotFoundError';
  }
}

class EntityAlreadyExistException extends Error {
  constructor(id: number) {
    super(`Entity with ID ${id} already exists!`);
    this.name = 'EntityAlreadyExistException';
  }
}

class EntityManager<T> {
  private entities: Map<number, T>;

  constructor() {
    this.entities = new Map<number, T>();
  }

  addEntity(id: number, entity: T): void {
    if (this.entities.has(id)) {
      console.error(new EntityAlreadyExistException(id).message);
      return;
    }

    this.entities.set(id, entity);
  }

  getEntity(id: number): T | undefined {
    const entity = this.entities.get(id);
    if (entity === undefined) {
      console.error(new EntityNotFoundException(id).message);
      return;
    }
    return entity;
  }

  updateEntity(id: number, entity: T): void {
    if (!this.entities.has(id)) {
      console.error(new EntityNotFoundException(id).message);
      return;
    }

    this.entities.set(id, entity);
  }

  removeEntity(id: number): void {
    if (!this.entities.has(id)) {
      console.error(new EntityNotFoundException(id).message);
      return;
    }
    this.entities.delete(id);
  }

  list(): Map<number, T> {
    return this.entities;
  }
}

class Customer {
  name: string;
  address: string;
  email: string;

  constructor(name: string, address: string, email: string) {
    this.name = name;
    this.address = address;
    this.email = email;
  }
}

const customer = new EntityManager<Customer>();

customer.addEntity(1, new Customer('Alice', '123 Main St', 'alice@example.com'));
customer.addEntity(2, new Customer('Bob', '456 Elm St', 'bob@example.com'));

console.log('Customer list:', customer.list());

console.log(customer.getEntity(1));

const updatedCustomer1 = new Customer('Alice Smith', '123 Main St', 'alice.smith@example.com');
customer.updateEntity(1, updatedCustomer1);
console.log(customer.getEntity(1));

customer.removeEntity(2);
console.log('Customer list:', customer.list());
console.log(customer.getEntity(2));

// Generic Tree Implementation

class TreeNode<T> {
  value: T;
  children: TreeNode<T>[];

  constructor(value: T) {
    this.value = value;
    this.children = [];
  }
}

class GenericTree<T> {
  private root: TreeNode<T>;

  constructor(rootValue: T) {
    this.root = new TreeNode<T>(rootValue);
  }

  getRoot(): TreeNode<T> {
    return this.root;
  }

  addChild(parent: TreeNode<T>, childValue: T): void {
    const childNode = new TreeNode(childValue);
    parent.children.push(childNode);
  }

  removeChild(parent: TreeNode<T>, childValue: T): boolean {
    const index = parent.children.findIndex((child) => JSON.stringify(child.value) === JSON.stringify(childValue));

    if (index > -1) {
      parent.children.splice(index, 1);
      return true;
    }
    return false;
  }

  findNode(predicate: (value: T) => boolean, current: TreeNode<T> = this.root): TreeNode<T> | null {
    if (predicate(current.value)) {
      return current;
    }

    for (const child of current.children) {
      const result = this.findNode(predicate, child);
      if (result) {
        return result;
      }
    }

    return null;
  }

  printTree(node: TreeNode<T> = this.root, indent: string = ''): void {
    console.log(`${indent}${JSON.stringify(node.value)}`);
    for (const child of node.children) {
      this.printTree(child, `${indent}  `);
    }
  }
}

class FamilyMember {
  name: string;
  birthDate: Date;

  constructor(name: string, birthDate: Date) {
    this.name = name;
    this.birthDate = birthDate;
  }
}

const rootMember = new FamilyMember('Alice', new Date('1970-01-01'));
const familyTree = new GenericTree<FamilyMember>(rootMember);

const child1 = new FamilyMember('Bob', new Date('1990-01-01'));
const child2 = new FamilyMember('Charlie', new Date('1995-01-01'));

familyTree.addChild(familyTree.getRoot(), child1);
familyTree.addChild(familyTree.getRoot(), child2);

familyTree.printTree();

console.log(
  'Search for Bob:',
  familyTree.findNode((member) => member.name === 'Alice')
);

console.log(familyTree.removeChild(familyTree.getRoot(), child2));

// Generic Graph Implementation

class GraphNode<T> {
  value: T;
  edges: GraphEdge<T>[];

  constructor(value: T) {
    this.value = value;
    this.edges = [];
  }
}

class GraphEdge<T> {
  from: GraphNode<T>;
  to: GraphNode<T>;
  weight: number;

  constructor(from: GraphNode<T>, to: GraphNode<T>, weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

class Graph<T> {
  private nodes: Map<T, GraphNode<T>>;

  constructor() {
    this.nodes = new Map<T, GraphNode<T>>();
  }

  addNode(value: T): GraphNode<T> {
    let node = this.nodes.get(value);
    if (!node) {
      node = new GraphNode<T>(value);
      this.nodes.set(value, node);
    }
    return node;
  }

  addEdge(fromValue: T, toValue: T, weight: number = 1): void {
    const fromNode = this.addNode(fromValue);
    const toNode = this.addNode(toValue);

    const edge = new GraphEdge(fromNode, toNode, weight);
    fromNode.edges.push(edge);
  }

  getNode(value: T): GraphNode<T> | undefined {
    return this.nodes.get(value);
  }

  getEdgesFrom(value: T): GraphEdge<T>[] | undefined {
    const node = this.getNode(value);

    return node?.edges;
  }
}

const graph = new Graph<string>();
graph.addEdge('LAX', 'JFK', 3000);
graph.addEdge('LAX', 'ORD', 4000);
graph.addEdge('JFK', 'SFO', 6000);

console.log('Graph:', graph.getEdgesFrom('LAX')); // LAX -> JFK -> ORD

class Airport {
  constructor(public name: string, public code: string) {}
}

class AGraph<T> {
  private adjacencyList: Map<T, Map<T, number>> = new Map();

  addEdge(from: T, to: T, distance: number): void {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, new Map());
    }

    this.adjacencyList.get(from)!.set(to, distance);

    if (!this.adjacencyList.has(to)) {
      this.adjacencyList.set(to, new Map());
    }
    this.adjacencyList.get(to)!.set(from, distance);
  }

  getEdgesNode(node: T): Map<T, number> | undefined {
    return this.adjacencyList.get(node);
  }
}

const airportGraph = new AGraph<Airport>();

const lax = new Airport('Los Angeles International Airport', 'LAX');
const jfk = new Airport('John F. Kennedy International Airport', 'JFK');
const ord = new Airport("O'Hare Intertional Airport", 'ORD');

airportGraph.addEdge(lax, jfk, 3000);
airportGraph.addEdge(lax, ord, 2000);
airportGraph.addEdge(jfk, ord, 600);

console.log('Airport Graph:', airportGraph.getEdgesNode(lax));

// Generic Constraints

interface LengthWise {
  length: number;
}

function loggingIdentity<T extends LengthWise>(arg: T): T {
  return arg;
}

// example usage
const obj: LengthWise = { length: 10 };
console.log(loggingIdentity(obj)); // { length: 10 }

// Using Type Parameters in Generic Constraints

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// example usage
const person: { name: string; age: number } = { name: 'Alice', age: 25 };
console.log(getProperty(person, 'name')); // 'Alice'
console.log(getProperty(person, 'age')); // 25

// common pattern of generic constraints
interface Database<T> {
  get(id: string): Promise<T | null>;
  save(data: T): Promise<T | null>;
}

class InMemoryDatabase<T> implements Database<T> {
  private db: Record<string, T> = {};

  async get(id: string): Promise<T | null> {
    return this.db[id] || null;
  }

  async save(data: T & { id: string }): Promise<T | null> {
    return (this.db[data.id] = data);
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}

const userDb = new InMemoryDatabase<User>();

userDb
  .save({
    id: '1',
    name: 'Alice',
    email: 'alice@example.com'
  })
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.error(err);
  });

userDb
  .get('1')
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.error(err);
  });
