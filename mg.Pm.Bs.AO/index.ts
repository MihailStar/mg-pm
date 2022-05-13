// ⋕nd.Mg.Bs.AO
import { MongoClient } from 'mongodb';

interface Clothes {
  name: string;
  sizes: number[];
  colors: string[];
}

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const dbName = 'myProject';

async function main(): Promise<void> {
  await mongoClient.connect();

  const db = mongoClient.db(dbName);

  const clothes = db.collection<Clothes>('entities');
  await clothes.insertMany([
    {
      name: 'cloth1',
      sizes: [1, 2],
      colors: ['black', 'blue'],
    },
    {
      name: 'cloth2',
      sizes: [1, 2, 3],
      colors: ['black', 'white'],
    },
    {
      name: 'cloth3',
      sizes: [2, 3, 4],
      colors: ['green', 'blue'],
    },
    {
      name: 'cloth4',
      sizes: [4, 5, 6],
      colors: ['black', 'blue', 'green'],
    },
  ]);

  // ⋕nd.Mg.Bs.AO.1
  console.log(await clothes.find({ colors: { $size: 3 } }).toArray());

  // ⋕nd.Mg.Bs.AO.2
  console.log(
    await clothes.find({ sizes: { $elemMatch: { $gt: 3, $lt: 5 } } }).toArray()
  );

  await clothes.drop();
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
