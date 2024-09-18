import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://codewithankit047:nVhYb1cI7bl1VXdy@cluster0.fnsfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';  // Replace with your MongoDB connection string
let client;

export const connectToDB = async () => {
  if (!client) {
    try {
      client = new MongoClient(uri);
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  }
  return client.db('quicknotesDB').collection('notes');  // Return a reference to the notes collection
};

export const closeConnection = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};
