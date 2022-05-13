// ⋕nd.Mg.Bs.VO
import { MongoClient } from 'mongodb';

interface User {
  name: string;
  addr: {
    country: string;
    city: string;
  };
}

interface Employee extends User {
  position: {
    name: string;
    salary: number;
  };
}

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const dbName = 'myProject';

async function main(): Promise<void> {
  await mongoClient.connect();

  const db = mongoClient.db(dbName);

  // ⋕nd.Mg.Bs.VO.1
  const users = db.collection<User>('users');
  await users.insertMany([
    {
      name: 'John',
      addr: {
        country: 'Britain',
        city: 'London',
      },
    },
    {
      name: 'Luis',
      addr: {
        country: 'Britain',
        city: 'London',
      },
    },
    {
      name: 'Eric',
      addr: {
        country: 'Britain',
        city: 'Manchester',
      },
    },
    {
      name: 'Kyle',
      addr: {
        country: 'France',
        city: 'Paris',
      },
    },
  ]);
  console.log(
    'addrCityLondon',
    await users.find({ 'addr.city': 'London' }).toArray()
  );
  await users.drop();

  // ⋕nd.Mg.Bs.VO.2
  const employees = db.collection<{ employee: Employee }>('employees');
  await employees.insertMany([
    {
      employee: {
        name: 'John',
        addr: {
          country: 'Britain',
          city: 'London',
        },
        position: {
          name: 'programmer',
          salary: 1000,
        },
      },
    },
    {
      employee: {
        name: 'Luis',
        addr: {
          country: 'Britain',
          city: 'London',
        },
        position: {
          name: 'programmer',
          salary: 1000,
        },
      },
    },
    {
      employee: {
        name: 'Eric',
        addr: {
          country: 'Britain',
          city: 'Manchester',
        },
        position: {
          name: 'programmer',
          salary: 2000,
        },
      },
    },
    {
      employee: {
        name: 'kyle',
        addr: {
          country: 'France',
          city: 'Paris',
        },
        position: {
          name: 'programmer',
          salary: 2000,
        },
      },
    },
  ]);
  console.log(
    'employeePositionSalary2000',
    await employees.find({ 'employee.position.salary': 2000 }).toArray()
  );
  await employees.drop();
}

main()
  .then()
  .catch(console.error)
  .finally(() => {
    mongoClient.close().catch(console.error);
  });
