// ⋕nd.Mg.DP.CME.1
import { MongoClient } from 'mongodb';
import express, { ErrorRequestHandler } from 'express';

interface Product {
  name: string;
  cost: number;
  rest: number;
}

// MongoDB
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'myProject';

// Express
const port = 3000;
const app = express();

async function main(): Promise<void> {
  await client.connect();

  const db = client.db(dbName);
  const products = db.collection<Product>('products');

  await products.drop();
  await products.insertMany([
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

  app
    .get('/products/', async (_req, res, next) => {
      try {
        res.send(await products.find({}).toArray());
      } catch (error) {
        next(error);
      }
    })
    .use(((err, _req, res, _next) => {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }) as ErrorRequestHandler)
    .listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
}

main().then().catch(console.error);
