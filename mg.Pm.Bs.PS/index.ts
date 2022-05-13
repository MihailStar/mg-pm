// ⋕nd.Mg.Bs.PS
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
  const prods = db.collection<Prod>('prods');

  // ⋕nd.Mg.Bs.PS.1
  console.log(await prods.find().limit(3).toArray());

  // ⋕nd.Mg.Bs.PS.2
  console.log(await prods.find().skip(3).limit(3).toArray());

  // ⋕nd.Mg.Bs.PS.3
  console.log(await prods.find().sort({ cost: 1 }).limit(5).toArray());
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
