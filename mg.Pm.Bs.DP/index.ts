// ⋕nd.Mg.Bs.DP
import { MongoClient, WithId } from 'mongodb';

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

  // ⋕nd.Mg.Bs.DP.1
  const prodsWithNameAndCost = await collection
    .find()
    .project<WithId<Pick<Prod, 'name' | 'cost'>>>({ name: 1, cost: 1 })
    .toArray();
  console.log('prodsWithNameAndCost', prodsWithNameAndCost);

  // ⋕nd.Mg.Bs.DP.2
  const prodsWithoutId = await collection
    .find()
    .project<Prod>({ _id: 0 })
    .toArray();
  console.log('prodsWithoutId', prodsWithoutId);
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
