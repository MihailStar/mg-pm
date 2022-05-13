// ⋕nd.Mg.Bs.DU
import { MongoClient } from 'mongodb';

interface Prod {
  name: string;
  cost: number;
  rest: number;
  touch?: number;
}

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const dbName = 'myProject';

async function main(): Promise<void> {
  await mongoClient.connect();

  const db = mongoClient.db(dbName);
  const prods = db.collection<Prod>('prods');

  // ⋕nd.Mg.Bs.DU.1
  console.log(
    'updateOneCost300SetCost900',
    await prods.updateOne({ cost: 300 }, { $set: { cost: 900 } })
  );

  // ⋕nd.Mg.Bs.DU.2
  console.log(
    'updateManySetCost100',
    await prods.updateMany({}, { $set: { cost: 1000 } })
  );

  // ⋕nd.Mg.Bs.DU.3
  console.log(
    'updateManySetCost300Rest10',
    await prods.updateMany({}, { $set: { cost: 300, rest: 10 } })
  );

  // ⋕nd.Mg.Bs.DU.4
  console.log(
    'findOneAndUpdateSetTouchNow',
    await prods.findOneAndUpdate({}, { $set: { touch: Date.now() } })
  );
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
