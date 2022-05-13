// ⋕nd.Mg.Bs.CO
import { MongoClient } from 'mongodb';

// | $lt  | <  |
// | $lte | <= |
// | $gt  | >  |
// | $gte | >= |
// | $eq  | == |
// | $ne  | != |
// | $in  |    |
// | $nin |    |

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

  // ⋕nd.Mg.Bs.CO.1
  console.log(await prods.find({ cost: { $lt: 500 } }).toArray());

  // ⋕nd.Mg.Bs.CO.2
  console.log(await prods.find({ cost: { $gt: 500 } }).toArray());

  // ⋕nd.Mg.Bs.CO.4
  console.log(await prods.find({ cost: { $lte: 500 } }).toArray());

  // ⋕nd.Mg.Bs.CO.5
  console.log(await prods.find({ cost: { $gte: 500 } }).toArray());

  // ⋕nd.Mg.Bs.CO.6
  console.log(await prods.find({ cost: { $eq: 500 } }).toArray());

  // ⋕nd.Mg.Bs.CO.7
  console.log(await prods.find({ cost: { $ne: 500 } }).toArray());

  // ⋕nd.Mg.Bs.CO.8
  console.log(await prods.find({ cost: { $in: [500, 600, 700] } }).toArray());

  // ⋕nd.Mg.Bs.CO.9
  console.log(await prods.find({ cost: { $nin: [100, 200] } }).toArray());

  // ⋕nd.Mg.Bs.CO.10
  console.log(await prods.deleteMany({ cost: { $gt: 300 } }));

  // ⋕nd.Mg.Bs.CO.11
  const filter = { cost: { $in: [100, 200] } };
  console.log(await prods.deleteMany(filter));
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
