import chalk from "chalk";
import { connectToDB, closeConnection } from "./db.js";

// Add a new note with MongoDB
export const addNote = async (note, tag = "general", priority = "low") => {
  try {
    const notesCollection = await connectToDB();
    await notesCollection.insertOne({
      text: note,
      tag,
      priority,
      createdAt: new Date()
    });
    console.log(chalk.green("New note added with priority: " + priority));
  } catch (error) {
    console.error(chalk.red("Error adding note:", error));
  } finally {
    await closeConnection();
  }
};

// List notes with MongoDB (optionally filter by tag or priority)
export const listNotes = async (tag = null, priority = null) => {
  try {
    const notesCollection = await connectToDB();
    const query = {};
    if (tag) query.tag = tag;
    if (priority) query.priority = priority;

    const notes = await notesCollection.find(query).toArray();
    if (notes.length > 0) {
      console.log(chalk.blue.inverse("Your Notes:"));
      notes.forEach((note, index) => {
        console.log(
          `${index + 1}. ${note.text} [Priority: ${note.priority}, Tag: ${
            note.tag
          }]`
        );
      });
    } else {
      console.log(chalk.yellow("No matching notes found."));
    }
  } catch (error) {
    console.error(chalk.red("Error listing notes:", error));
  } finally {
    await closeConnection();
  }
};

// Remove a note by index with MongoDB
export const removeNote = async (index) => {
  try {
    const notesCollection = await connectToDB();
    const notes = await notesCollection.find().toArray();
    const note = notes[index - 1];

    if (note) {
      await notesCollection.deleteOne({ _id: note._id });
      console.log(chalk.red(`Removed note: "${note.text}"`));
    } else {
      console.log(chalk.red("Invalid note index."));
    }
  } catch (error) {
    console.error(chalk.red("Error removing note:", error));
  } finally {
    await closeConnection();
  }
};

// Edit a note by index with MongoDB
export const editNote = async (index, newText) => {
  try {
    const notesCollection = await connectToDB();
    const notes = await notesCollection.find().toArray();
    const note = notes[index - 1];

    if (note) {
      await notesCollection.updateOne(
        { _id: note._id },
        { $set: { text: newText } }
      );
      console.log(chalk.green(`Note updated: ${newText}`));
    } else {
      console.log(chalk.red("Invalid note index."));
    }
  } catch (error) {
    console.error(chalk.red("Error editing note:", error));
  } finally {
    await closeConnection();
  }
};

// Search notes by keyword with MongoDB
export const searchNotes = async (keyword) => {
  try {
    const notesCollection = await connectToDB();
    const notes = await notesCollection
      .find({ text: new RegExp(keyword, "i") })
      .toArray();

    if (notes.length > 0) {
      console.log(chalk.green(`Found ${notes.length} matching notes:`));
      notes.forEach((note, index) => {
        console.log(
          `${index + 1}. ${note.text} [Priority: ${note.priority}, Tag: ${
            note.tag
          }]`
        );
      });
    } else {
      console.log(chalk.red("No matching notes found."));
    }
  } catch (error) {
    console.error(chalk.red("Error searching notes:", error));
  } finally {
    await closeConnection();
  }
};
