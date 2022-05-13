// ⋕nd.Mg.Bs.DS
import { MongoClient } from 'mongodb';

// |  1 | по возрастанию |
// | -1 | по убыванию    |

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

  // ⋕nd.Mg.Bs.DS.1
  console.log(await prods.find().sort({ cost: 1, rest: 1 }).toArray());

  // ⋕nd.Mg.Bs.DS.2
  console.log(await prods.find().sort({ cost: -1, rest: 1 }).toArray());
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
