// ⋕nd.Mg.Bs.CE.1
import { MongoClient } from 'mongodb';

interface User {
  name: string;
  age: number;
  salary: number;
}

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const dbName = 'myProject';

async function main(): Promise<string> {
  await mongoClient.connect();
  console.log('Successfully connected to database');

  const db = mongoClient.db(dbName);
  const users = db.collection<User>('users');
  const res = await users.find().toArray();

  console.log(res);

  return 'Done';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
