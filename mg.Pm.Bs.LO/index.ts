// ⋕nd.Mg.Bs.LO
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

  await prods.drop();
  await prods.insertMany([
    {
      name: 'prod1',
      cost: 100,
      rest: 10,
    },
    {
      name: 'prod2',
      cost: 100,
      rest: 10,
    },
    {
      name: 'prod3',
      cost: 200,
      rest: 10,
    },
    {
      name: 'prod4',
      cost: 300,
      rest: 20,
    },
    {
      name: 'prod5',
      cost: 300,
      rest: 30,
    },
  ]);

  // ⋕nd.Mg.Bs.LO.2
  const filterAnd = {
    $and: [
      { cost: { $gte: 100 } },
      { cost: { $lte: 300 } },
      { rest: { $lte: 10 } },
    ],
  };
  console.log(await prods.find(filterAnd).toArray());

  // ⋕nd.Mg.Bs.LO.4
  const filterOr = {
    $or: [{ cost: { $lt: 100 } }, { name: { $eq: 'prod1' } }],
  };
  console.log(await prods.find(filterOr).toArray());

  // ⋕nd.Mg.Bs.LO.6
  // Оффтоп, на память
  console.log(await prods.find({ cost: { $gt: 100, $lt: 300 } }).toArray());
  console.log(
    await prods.find({ cost: { $not: { $gt: 100, $lt: 300 } } }).toArray()
  );
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
