// ⋕nd.Mg.Bs.TC.1
import { MongoClient } from 'mongodb';

interface User {
  name: string;
  age: number;
  salary: number;
}

interface Prod {
  name: string;
  cost: number;
  rest: number;
}

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const dbName = 'myProject';

async function makeTestСollections(): Promise<void> {
  await mongoClient.connect();

  const db = mongoClient.db(dbName);

  const users = db.collection<User>('users');
  const insertUsers = await users.insertMany([
    {
      name: 'user1',
      age: 25,
      salary: 300,
    },
    {
      name: 'user2',
      age: 25,
      salary: 400,
    },
    {
      name: 'user3',
      age: 26,
      salary: 400,
    },
    {
      name: 'user4',
      age: 26,
      salary: 500,
    },
    {
      name: 'user5',
      age: 26,
      salary: 500,
    },
    {
      name: 'user6',
      age: 27,
      salary: 500,
    },
  ]);
  console.log('insertUsers', insertUsers);

  const prods = db.collection<Prod>('prods');
  const insertProds = await prods.insertMany([
    {
      name: 'prod1',
      cost: 100,
      rest: 10,
    },
    {
      name: 'prod2',
      cost: 100,
      rest: 10,
    },
    {
      name: 'prod3',
      cost: 200,
      rest: 10,
    },
    {
      name: 'prod4',
      cost: 300,
      rest: 20,
    },
    {
      name: 'prod5',
      cost: 300,
      rest: 30,
    },
  ]);
  console.log('insertProds', insertProds);
}

makeTestСollections()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
