import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

export const connectToDatabase = async () => {
  try {
    await client.connect();
    return client.db("quick_cli_notes");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection failed.");
  }
};
