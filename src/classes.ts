class Point {
  x: number = 0;
  y: number = 0;
}

const pt = new Point();
console.log(pt.x, pt.y);

class GoodGreeter {
  name: string;
  email!: string;

  constructor(name: string) {
    this.name = name;
  }
}

const greeter = new GoodGreeter('Alice');
greeter.email = 'alice@example.com';
console.log(greeter.name);
console.log(greeter.email);

class Greeter {
  readonly name: string = 'Typescript';

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }
  err() {
    // Error: Cannot assign to 'name' because it is a read-only property.
    // this.name = 'Changed';
  }
}

const g = new Greeter();
console.log(g.name);
// Error: Cannot assign to 'name' because it is a read-only property.
// g.name = 'Hello Typescript';

/******************* Super Calls *******************/
class B {
  k: number = 4;
}

class A extends B {
  constructor() {
    super();
    console.log('k = ', this.k);
  }
}

new A();

/******************* Methods *******************/
class C {
  constructor(public name: string) {}
  greet(): void {
    console.log(`Hello, ${this.name}!`);
  }
}

const c = new C('Typescript');
c.greet();

/******************* Getters / Setters *******************/

class GS {
  constructor(public _length: number) {}

  // set
  set length(value: number) {
    this._length = value;
  }
  // get
  get length(): number {
    return this._length;
  }
}

const gs = new GS(10);
console.log(gs.length); // getter method is called
gs.length = 5; // setter method is called
console.log(gs.length); // getter method is called

/******************* Index Signatures *******************/
class Myclass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}

const mc = new Myclass();
mc['isOk'] = true;

/******************* Class Heritage *******************/

interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log('Pinging Sonar...');
  }
}

const sonar = new Sonar();
sonar.ping();

// Class 'Ball' incorrectly implements interface 'Pingable'.
// Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
// class Ball implements Pingable {
//   pong() {
//     console.log('Ponging Ball...');
//   }
// }

interface Checkable {
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  check(s: string) {
    return typeof s === 'string';
  }
}

const nc = new NameChecker();
console.log(nc.check('Alice'));

// implementing an interface with an optional property doesn’t create that property

interface XY {
  x: number;
  y?: number;
}

class XYChecker implements XY {
  x: number = 0;
}

const xyChecker = new XYChecker();
console.log(xyChecker.x);
// error: 'y' is missing in type 'XYChecker' but required in type 'XY'.
// console.log(xyChecker.y);

/******************* extends Clauses *******************/

// base class

class Employee {
  constructor(public id: number, public name: string, public email: string) {}

  work(): void {
    console.log(`${this.name} is working.`);
  }
}

// derived class
class Manager extends Employee {
  teamSize: number;

  constructor(id: number, name: string, email: string, teamSize: number) {
    super(id, name, email);
    this.teamSize = teamSize;
  }

  manage(): void {
    console.log(`${this.name} is managing a team of ${this.teamSize} members.`);
  }
}

const manager = new Manager(1, 'Manager', 'manager@example.com', 10);
manager.manage();

// derived class
class Engineer extends Employee {
  language: string;

  constructor(id: number, name: string, email: string, language: string) {
    super(id, name, email);
    this.language = language;
  }

  code(): void {
    console.log(`${this.name} is coding in ${this.language}.`);
  }
}

const engineer = new Engineer(2, 'Alice', 'typescript@example.com', 'Typescript');
engineer.code();

/******************* Overriding Methods *******************/
class Base {
  greet() {
    console.log('Hello, I am a Base class.');
  }
}

class Derived extends Base {
  override greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name}! I am a Derived class.`);
    }
  }
}

const base = new Base();
base.greet();

const derived = new Derived();
derived.greet('Alice');

class Account {
  protected balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }
  }

  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
    }
  }

  getBalance(): number {
    return this.balance;
  }
}

class SavingAccount extends Account {
  private interestRate: number;

  constructor(initialBalance: number, interestRate: number) {
    super(initialBalance);
    this.interestRate = interestRate;
  }

  override deposit(amount: number): void {
    super.deposit(amount);
    this.balance += this.balance * this.interestRate;
  }
}

let savingAccount = new SavingAccount(1000, 0.05);
console.log('Saving Account balance: %d', savingAccount.getBalance());

savingAccount.deposit(500);
console.log('Saving Account balance after deposit: %d', savingAccount.getBalance());

savingAccount.withdraw(200);
console.log('Saving Account balance after withdrawal: %d', savingAccount.getBalance());

/*************************** Access Modifiers **************************/

class User {
  private _id: number;
  private _username: string;
  private _email: string;
  private _password: string;

  constructor(id: number, name: string, email: string, password: string) {
    this._id = id;
    this._username = name;
    this._email = email;
    this._password = password;
  }

  public getUsername(): string {
    return this._username;
  }

  public setEmail(email: string): void {
    this._email = email;
  }

  public getEmail(): string {
    return this._email;
  }

  private hashPassword(password: string): string {
    // password hashing
    return password;
  }

  public setPassword(password: string): void {
    this._password = this.hashPassword(password);
  }
}

class UserService {
  private _users: User[] = [];

  public createUser(username: string, email: string, password: string): User {
    const id = this._users.length + 1;
    const user = new User(id, username, email, password);
    this._users.push(user);
    return user;
  }

  public getUserByUsername(username: string): User | undefined {
    return this._users.find((user) => user.getUsername() === username);
  }
}

// Usage
const userService = new UserService();
const user1 = userService.createUser('alice', 'alice@example.com', 'alice123');

user1.setPassword('alice123');

const user2 = userService.createUser('bob', 'bob@example.com', 'bob456');
console.log('User created:', user1);
console.log('User created:', user2);

class Dish {
  private _id: number;
  private _name: string;
  private _price: number;
  private _isAvailable: boolean;

  constructor(id: number, name: string, price: number, isAvailable: boolean) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._isAvailable = isAvailable;
  }

  public getId(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getPrice(): number {
    return this._price;
  }

  public setPrice(price: number): void {
    this._price = price;
  }

  public isAvailable(): boolean {
    return this._isAvailable;
  }

  public setAvailability(isAvailable: boolean): void {
    this._isAvailable = isAvailable;
  }
}

class Menu {
  private _dishes: Dish[] = [];

  addDish(name: string, price: number, isAvailable: boolean): Dish {
    const id = this._dishes.length + 1;
    const dish = new Dish(id, name, price, isAvailable);
    this._dishes.push(dish);
    return dish;
  }

  public getDish(name: string): Dish | undefined {
    return this._dishes.find((dish) => dish.getName() === name);
  }

  getAvailableDishes(): Dish[] {
    return this._dishes.filter((dish) => dish.isAvailable());
  }
}

class Order {
  private _id: number;
  private _items: OrderItem[] = [];

  constructor(id: number) {
    this._id = id;
  }

  public addDish(dish: Dish, quantity: number): void {
    const existingItem = this._items.find((item) => item.getDish().getId() === dish.getId());
    if (existingItem) {
      existingItem.setQuantity(existingItem.getQuantity() + quantity);
    } else {
      const item = new OrderItem(dish, quantity);
      this._items.push(item);
    }
  }

  public getId(): number {
    return this._id;
  }

  public getItems(): OrderItem[] {
    return this._items;
  }

  public getTotalPrice(): number {
    return this._items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}

class OrderItem {
  private _dish: Dish;
  private _quantity: number;

  constructor(dish: Dish, quantity: number) {
    this._dish = dish;
    this._quantity = quantity;
  }

  public getDish(): Dish {
    return this._dish;
  }

  public getQuantity(): number {
    return this._quantity;
  }

  public setQuantity(quantity: number): void {
    this._quantity = quantity;
  }

  public getTotalPrice(): number {
    return this._dish.getPrice() * this._quantity;
  }
}

class Restaurant {
  private _menu: Menu;
  private _orders: Order[] = [];

  constructor(menu: Menu) {
    this._menu = menu;
  }

  public getMenu(): Menu {
    return this._menu;
  }

  public createOrder(): Order {
    const id = this._orders.length + 1;
    const order = new Order(id);
    this._orders.push(order);
    return order;
  }

  public getOrder(id: number): Order | undefined {
    return this._orders.find((order) => order.getId() === id);
  }
}

const menu = new Menu();

const pizza = menu.addDish('Pizza', 10.99, true);
const burger = menu.addDish('Burger', 5.99, true);

const restaurant = new Restaurant(menu);
const order = restaurant.createOrder();

order.addDish(pizza, 3);
order.addDish(burger, 3);

console.log('Total price for the order:', order.getTotalPrice());

/************************* Static Members ****************************/

class Login {
  static MAX_LOGIN_ATTEMPTS: number = 5;
  private _attempts: number = 0;

  constructor(private username: string, private password: string) {}
  public signIn(username: string, password: string): boolean {
    if (this.username === username && this.password === password) {
      this._attempts = 0;
      return true;
    } else {
      this._attempts++;
      if (this._attempts >= Login.MAX_LOGIN_ATTEMPTS) {
        console.log(`Exceeded maximum login attempts for user ${this.username}. Account locked.`);
        return false;
      }
      return false;
    }
  }
}

const s1 = new Login('john.doe', 'password123');
const s2 = new Login('jane.doe', 'password456');

console.log(s1.signIn('john.doe', 'wrongpassword')); // false
console.log(s1.signIn('john.doe', 'wrongpassword')); // false
console.log(s1.signIn('john.doe', 'wrongpassword')); // false
console.log(s1.signIn('john.doe', 'wrongpassword')); // false
console.log(s1.signIn('john.doe', 'wrongpassword')); // false, and Account locked.

console.log(s2.signIn('jane.doe', 'password456')); // true

/********************* Abstract Classes ************************/
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log(`${this.constructor.name} is moving.`);
  }
}

class Cat extends Animal {
  override makeSound(): void {
    console.log('Meow!');
  }
}

const cat = new Cat();
cat.makeSound();
cat.move();

abstract class Shape {
  abstract calculateArea(): number;
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }
  override calculateArea(): number {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(5, 10);
console.log('Area of the rectangle:', rectangle.calculateArea());

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  override calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

const circle = new Circle(3);
console.log('Area of the circle:', circle.calculateArea());

/************************ Inheritance and Polymorphism ****************************/

class LibraryItem {
  title: string;
  author: string;
  itemId: string;
  checkedOut: boolean;

  constructor(title: string, author: string, itemId: string) {
    this.title = title;
    this.author = author;
    this.itemId = itemId;
    this.checkedOut = false;
  }

  checkOut(): void {
    if (!this.checkedOut) {
      this.checkedOut = true;
      console.log(`${this.title} by ${this.author} checked out.`);
    } else {
      console.log(`${this.title} by ${this.author} is already checked out.`);
    }
  }

  checkIn(): void {
    if (this.checkedOut) {
      this.checkedOut = false;
      console.log(`${this.title} by ${this.author} checked in.`);
    } else {
      console.log(`${this.title} by ${this.author} is already checked in.`);
    }
  }
}

// derived class Book from LibraryItem

class Book extends LibraryItem {
  numPages: number;
  constructor(title: string, author: string, itemId: string, numPages: number) {
    super(title, author, itemId);
    this.numPages = numPages;
  }
}

// derived  class DVD from LibraryItem
class DVD extends LibraryItem {
  runtime: number;
  constructor(title: string, author: string, itemId: string, runtime: number) {
    super(title, author, itemId);
    this.runtime = runtime;
  }
}

// polymorphism
function checkOutItem(libraryItem: LibraryItem) {
  libraryItem.checkOut();
}

// polymorphism
function checkInItem(libraryItem: LibraryItem) {
  libraryItem.checkIn();
}

const book = new Book('To Kill a Mockingbird', 'Harper Lee', '12345', 288);
const dvd = new DVD('The Godfather', 'Francis Ford Coppola', '67890', 175);

checkOutItem(book);
checkOutItem(dvd);

checkInItem(book);
checkInItem(dvd);
