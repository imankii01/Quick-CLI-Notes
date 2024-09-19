#!/usr/bin/env node
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  addNote,
  listNotes,
  searchNotes,
  exportNotes,
  importNotes,
  integrateService
} from "../lib/notes.js";
import chalk from "chalk";
import { table } from "table";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("quick-cli-notes");

const command = process.argv[2];
const args = process.argv.slice(3);

const displayHelp = () => {
  console.log(chalk.blueBright("Quick CLI Notes - Command Line Interface"));
  console.log("");
  console.log(chalk.green("Commands:"));
  console.log("  add <content> [options]        Add a new note");
  console.log("  list                           List all notes");
  console.log(
    "  search <query>                 Search for notes containing the query"
  );
  console.log(
    "  export <format>                Export notes to a file (json or csv)"
  );
  console.log("  import <file>                  Import notes from a file");
  console.log(
    "  integrate <service>            Integrate with a service (e.g., google-calendar)"
  );
  console.log("");
  console.log(chalk.yellow("Options:"));
  console.log("  --tag <tag>                    Tag for the note");
  console.log(
    "  --priority <priority>          Priority of the note (e.g., low, normal, high)"
  );
  console.log("  --category <category>          Category of the note");
  console.log("  --subcategory <subcategory>    Subcategory of the note");
  console.log(
    "  --due <date>                   Due date for the note in YYYY-MM-DD format"
  );
};

const executeCommand = async () => {
  try {
    await client.connect();

    switch (command) {
      case "add":
        await addNote(db, ...args);
        console.log(chalk.green("Note added successfully."));
        break;
      case "list":
        const notes = await listNotes(db);
        console.log(
          table(
            [
              [
                "Content",
                "Tags",
                "Priority",
                "Category",
                "Subcategory",
                "Due Date",
                "Created At"
              ],
              ...notes.map((note) => [
                note.content,
                note.tags,
                note.priority,
                note.category,
                note.subcategory,
                note.due,
                note.createdAt ? note.createdAt.toISOString() : ""
              ])
            ],
            {
              columnDefault: {
                alignment: "left"
              },
              columns: {
                0: {
                  width: 30
                },
                1: {
                  width: 15
                },
                2: {
                  width: 10
                },
                3: {
                  width: 15
                },
                4: {
                  width: 15
                },
                5: {
                  width: 12
                },
                6: {
                  width: 25
                }
              }
            }
          )
        );
        break;
      case "search":
        const searchResults = await searchNotes(db, ...args);
        console.log(
          table(
            [
              [
                "Content",
                "Tags",
                "Priority",
                "Category",
                "Subcategory",
                "Due Date",
                "Created At"
              ],
              ...searchResults.map((note) => [
                note.content,
                note.tags,
                note.priority,
                note.category,
                note.subcategory,
                note.due,
                note.createdAt ? note.createdAt.toISOString() : ""
              ])
            ],
            {
              columnDefault: {
                alignment: "left"
              },
              columns: {
                0: {
                  width: 30
                },
                1: {
                  width: 15
                },
                2: {
                  width: 10
                },
                3: {
                  width: 15
                },
                4: {
                  width: 15
                },
                5: {
                  width: 12
                },
                6: {
                  width: 25
                }
              }
            }
          )
        );
        break;
      case "export":
        await exportNotes(db, ...args);
        console.log(chalk.green("Notes exported successfully."));
        break;
      case "import":
        await importNotes(db, ...args);
        console.log(chalk.green("Notes imported successfully."));
        break;
      case "integrate":
        await integrateService(...args);
        console.log(chalk.green("Integration successful."));
        break;
      case "help":
        displayHelp();
        break;
      default:
        console.log(
          chalk.yellow(
            'Unknown command. Use "quicknote help" for a list of commands.'
          )
        );
        break;
    }
  } catch (err) {
    console.error(chalk.red("Error:"), err.message);
  } finally {
    await client.close();
  }
};

executeCommand();
