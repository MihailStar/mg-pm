// ⋕nd.Mg.Bs.VA
import { MongoClient } from 'mongodb';

interface Entity {
  name: string;
  langs: string[];
}

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const dbName = 'myProject';

async function main(): Promise<void> {
  await mongoClient.connect();

  const db = mongoClient.db(dbName);

  const entities = db.collection<Entity>('entities');
  await entities.insertMany([
    {
      name: 'user1',
      langs: ['english', 'spanish'],
    },
    {
      name: 'user2',
      langs: ['english', 'german'],
    },
    {
      name: 'user3',
      langs: ['german', 'spanish'],
    },
    {
      name: 'user4',
      langs: ['spanish', 'english'],
    },
    {
      name: 'user5',
      langs: ['german', 'english', 'spanish'],
    },
  ]);

  // ⋕nd.Mg.Bs.VA.1
  console.log(await entities.find({ langs: 'spanish' }).toArray());

  // ⋕nd.Mg.Bs.VA.2
  const condition = { langs: ['german', 'spanish'] };
  console.log(await entities.find(condition).toArray());

  // Оффтоп, на память, из следующего раздела
  const filter = { langs: { $all: ['german', 'spanish'] } };
  console.log(await entities.find(filter).toArray());

  // ⋕nd.Mg.Bs.VA.3
  console.log(await entities.find({ 'langs.1': 'spanish' }).toArray());

  await entities.drop();
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
