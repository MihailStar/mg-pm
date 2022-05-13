// ⋕nd.Mg.Bs.DD
import { MongoClient } from 'mongodb';

interface Prod {
  name: string;
  cost: number;
  rest: number;
}

interface User {
  name: string;
  age: number;
  salary: number;
}

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const dbName = 'myProject';

async function main(): Promise<void> {
  await mongoClient.connect();

  const db = mongoClient.db(dbName);
  const collection = db.collection<Prod>('prods');

  // ⋕nd.Mg.Bs.DD.1
  const deleteProdResult = await collection.deleteOne({ cost: 400 });
  console.log('deleteProdResult', deleteProdResult);

  // ⋕nd.Mg.Bs.DD.2
  const firstProd = await collection.findOne();

  if (firstProd !== null) {
    const deleteFirstProdResult = await collection.deleteOne({
      _id: firstProd._id,
    });
    console.log('deleteFirstProdResult', deleteFirstProdResult);
  }

  // ⋕nd.Mg.Bs.DD.3
  const deleteProdsResult = await collection.deleteMany({ cost: 500 });
  console.log('deleteProdsResult', deleteProdsResult);

  // ⋕nd.Mg.Bs.DD.4
  const result = await collection.findOneAndDelete({});
  console.log('result', result);

  // ⋕nd.Mg.Bs.DD.5
  const users = db.collection<User>('users');

  // Оффтоп, тестирование deleteOne с пустым фильтром
  const deleteFirstUserResult = await users.deleteOne({});
  console.log('deleteFirstUserResult', deleteFirstUserResult);

  const success = await users.drop();
  console.log('success ', success);
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
