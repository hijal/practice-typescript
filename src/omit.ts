interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type OmitUser = Omit<User, 'createdAt' | 'updatedAt'>;

const user: OmitUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com'
};

console.log(user);

interface MyBook {
  id: number;
  title: string;
  author: string;
  price: number;
}

const book: MyBook = {
  id: 1,
  title: 'The Catcher in the Rye',
  author: 'J.D. Salinger',
  price: 19.99
};

function getBookDetails(book: Omit<MyBook, 'id' | 'price'>) {
  return {
    title: book.title,
    author: book.author
  };
}

const bookDetails = getBookDetails(book);
console.log(bookDetails);
