interface User {
  name: string;
  email: string;
  age: number;
  isAdmin: boolean;
}

class UserService {
  private users: User[] = [];

  create(user: User): void {
    this.users.push(user);
  }

  details(email: string) {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    return user;
  }

  /** 
    // Partial<User> is equivalent to:
    // {
    //   name?: string;
    //   email?: string;
    //   age?: number;
    //   isAdmin?: boolean;
    // }
  */
  update(email: string, payload: Partial<User>): void {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    Object.assign(user, payload);
  }
}

const userService = new UserService();

userService.create({
  name: 'John Doe',
  email: 'johndoe@example.com',
  age: 30,
  isAdmin: false
});

userService.update('johndoe@example.com', { name: 'Jane Doe', age: 40 });

const johnDetails = userService.details('johndoe@example.com');
console.log(johnDetails);
