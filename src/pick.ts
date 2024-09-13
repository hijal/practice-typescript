interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

async function fetchUser(id: number): Promise<User> {
  const user: User = {
    id: id,
    name: 'John Doe',
    email: 'john.doe@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return user;
}

type SafeUser = Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'>;

async function getSafeUser(id: number): Promise<SafeUser> {
  const user = await fetchUser(id);
  const safeUser: SafeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return safeUser;
}

getSafeUser(1).then((safeUser) => {
  console.log(safeUser);
});
