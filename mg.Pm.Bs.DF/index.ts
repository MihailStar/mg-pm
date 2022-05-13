// ⋕nd.Mg.Bs.DF
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

  // ⋕nd.Mg.Bs.DF.1
  const cost300 = await collection.find({ cost: 300 }).toArray();
  console.log('cost300', cost300);

  // ⋕nd.Mg.Bs.DF.2
  const rest10 = await collection.find({ rest: 10 }).toArray();
  console.log('rest10', rest10);

  // ⋕nd.Mg.Bs.DF.3
  const cost100Rest10 = await collection
    .find({ cost: 100, rest: 10 })
    .toArray();
  console.log('cost100Rest10', cost100Rest10);
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
