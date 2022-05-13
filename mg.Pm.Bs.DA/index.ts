// ⋕nd.Mg.Bs.UV.1
import { MongoClient } from 'mongodb';

interface Prod {
  name: string;
  cost: number;
  rest: number;
}

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const dbName = 'myProject';

async function main(): Promise<void> {
  await mongoClient.connect();

  const db = mongoClient.db(dbName);
  const collection = db.collection<Prod>('prods');

  const prod: Prod = { name: 'test', cost: 300, rest: 30 };
  const insertOneResult = await collection.insertOne(prod);

  console.log('insertOneResult', insertOneResult);
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
