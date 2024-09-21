#!/usr/bin/env node
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";
import { displayHelp } from '../utils/logger.js';
import {
  addNote,
  listNotes,
  searchNotes,
  exportNotes,
  importNotes,
  encryptAllNotes,
  decryptAllNotes,
  syncNotes,
  setReminder,
  createRecurringTask
} from '../controllers/notesController.js';

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGODB_URI);

const [command, ...args] = process.argv.slice(2);

(async () => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("quick_cli_notes");

    switch (command) {
      case 'add':
        await addNote(db, args);
        break;
      case 'list':
        await listNotes(db);
        break;
      case 'search':
        await searchNotes(db, args);
        break;
      case 'export':
        await exportNotes(db, args);
        break;
      case 'import':
        await importNotes(db, args);
        break;
      case 'encrypt':
        await encryptAllNotes(db);
        break;
      case 'decrypt':
        await decryptAllNotes(db);
        break;
      case 'sync':
        await syncNotes(db, args);
        break;
      case 'reminder':
        await setReminder(args);
        break;
      case 'recurring':
        await createRecurringTask(args);
        break;
      case 'help':
      default:
        displayHelp();
        break;
    }
  } catch (err) {
    console.error(chalk.red("Error:"), err.message);
  } finally {
    await mongoClient.close();
  }
})();
