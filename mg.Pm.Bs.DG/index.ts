// ⋕nd.Mg.Bs.DG
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

  // ⋕nd.Mg.Bs.DG.1
  const firstProd = await collection.findOne();
  console.log('firstProd', firstProd);

  // ⋕nd.Mg.Bs.DG.2
  const firstCost300 = await collection.findOne({ cost: 300 });
  console.log('firstCost300', firstCost300);

  // ⋕nd.Mg.Bs.DG.3
  const firstCost300Rest30 = await collection.findOne({ cost: 300, rest: 30 });
  console.log('firstCost300Rest30', firstCost300Rest30);
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
