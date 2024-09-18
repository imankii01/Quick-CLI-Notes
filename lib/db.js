import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export const connectToDB = async () => {
  await client.connect();
  return client.db('quick-cli-notes');
};

export const closeDBConnection = async () => {
  await client.close();
};
