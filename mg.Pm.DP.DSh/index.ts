// ⋕nd.Mg.DP.DSh
import { MongoClient, ObjectId, WithId } from 'mongodb';
import express, { ErrorRequestHandler, Response } from 'express';

interface ProductDTO {
  name: string;
  cost: number;
  rest: number;
}

type Product = WithId<ProductDTO>;

interface Message {
  message: string;
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
  const products = db.collection<ProductDTO>('products');

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
    .get(
      '/products?/',
      async (_req, res: Response<{ products: Product[] }>, next) => {
        try {
          res.send({ products: await products.find({}).toArray() });
        } catch (error) {
          next(error);
        }
      }
    )
    // ⋕nd.Mg.DP.DSh.1
    .get(
      '/product/name/:name',
      async (req, res: Response<{ product: Product } | Message>, next) => {
        try {
          const { name } = req.params;
          const product = await products.findOne({ name });

          if (product === null) {
            res.status(404).send({ message: 'Not found' });
            return;
          }

          res.send({ product });
        } catch (error) {
          next(error);
        }
      }
    )
    // ⋕nd.Mg.DP.DSh.2
    .get(
      '/product/id/:id',
      async (req, res: Response<{ product: Product } | Message>, next) => {
        try {
          const { id } = req.params;

          if (!ObjectId.isValid(id)) {
            res.status(400).send({ message: 'Not valid id' });
            return;
          }

          const product = await products.findOne({
            _id: new ObjectId(req.params.id),
          });

          if (product === null) {
            res.status(404).send({ message: 'Not found' });
            return;
          }

          res.send({ product });
        } catch (error) {
          next(error);
        }
      }
    )
    .use(((err, _req, res: Response<Message>, _next) => {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }) as ErrorRequestHandler)
    .listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
}

main().then().catch(console.error);
