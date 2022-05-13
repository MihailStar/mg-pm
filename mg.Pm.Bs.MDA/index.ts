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

  const prods: Prod[] = [
    {
      name: 'prod1',
      cost: 1000,
      rest: 100,
    },
    {
      name: 'prod2',
      cost: 2000,
      rest: 200,
    },
    {
      name: 'prod3',
      cost: 3000,
      rest: 300,
    },
  ];
  const insertProdsResult = await collection.insertMany(prods);

  console.log('insertProdsResult', insertProdsResult);
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
