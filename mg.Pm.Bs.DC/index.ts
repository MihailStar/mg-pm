// ⋕nd.Mg.Bs.DC
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

  // ⋕nd.Mg.Bs.DC.1
  const count = await collection.countDocuments();
  console.log('count', count);

  // ⋕nd.Mg.Bs.DC.2
  const countCost500 = await collection.countDocuments({ cost: 500 });
  console.log('countCost500', countCost500);
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
