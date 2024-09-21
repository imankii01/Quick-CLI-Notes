import {
    encryptNote,
    decryptNote
  } from '../services/encryptionService.js';
  import {
    uploadNotesToDrive,
    downloadNotesFromDrive
  } from '../services/cloudService.js';
  import {
    scheduleNoteReminder
  } from '../services/reminderService.js';
  import {
    createRecurringTaskSchedule
  } from '../services/recurringService.js';
  import {
    logTable,
    logSuccess
  } from '../utils/logger.js';
  
  export const addNote = async (db, args) => {
    const notesCollection = db.collection("notes");
    const note = {
      content: args[0],
      tags: getFlagValue(args, "--tag"),
      priority: getFlagValue(args, "--priority") || "normal",
      category: getFlagValue(args, "--category"),
      subcategory: getFlagValue(args, "--subcategory"),
      dueDate: getFlagValue(args, "--due") || null,
      createdAt: new Date()
    };
  
    await notesCollection.insertOne(note);
    logSuccess("Note added successfully.");
  };
  
  export const listNotes = async (db) => {
    const notesCollection = db.collection("notes");
    const notes = await notesCollection.find().toArray();
    logTable(notes);
  };
  
  export const searchNotes = async (db, args) => {
    const query = args[0];
    const notesCollection = db.collection("notes");
    const searchResults = await notesCollection
      .find({
        content: {
          $regex: query,
          $options: "i"
        }
      })
      .toArray();
    logTable(searchResults);
  };
  
  export const exportNotes = async (db, args) => {
    const format = args[0] || 'json';
    const notesCollection = db.collection("notes");
    const notes = await notesCollection.find().toArray();
    const filePath = await exportToFile(notes, format);
    logSuccess(`Notes exported to ${filePath}`);
  };
  
  export const importNotes = async (db, args) => {
    const filePath = args[0];
    const notes = await importFromFile(filePath);
    const notesCollection = db.collection("notes");
    await notesCollection.insertMany(notes);
    logSuccess("Notes imported successfully.");
  };
  
  export const encryptAllNotes = async (db) => {
    const notesCollection = db.collection("notes");
    const notes = await notesCollection.find().toArray();
    const encryptedNotes = notes.map((note) => ({
      ...note,
      content: encryptNote(note.content)
    }));
    await notesCollection.deleteMany({});
    await notesCollection.insertMany(encryptedNotes);
    logSuccess("All notes encrypted.");
  };
  
  export const decryptAllNotes = async (db) => {
    const notesCollection = db.collection("notes");
    const notes = await notesCollection.find().toArray();
    const decryptedNotes = notes.map((note) => ({
      ...note,
      content: decryptNote(note.content)
    }));
    await notesCollection.deleteMany({});
    await notesCollection.insertMany(decryptedNotes);
    logSuccess("All notes decrypted.");
  };
  
  export const syncNotes = async (db, args) => {
    const action = args[0];
    const notesCollection = db.collection("notes");
    const notes = await notesCollection.find().toArray();
  
    if (action === "upload") {
      await uploadNotesToDrive(notes);
      logSuccess("Notes uploaded to Google Drive.");
    } else if (action === "download") {
      const cloudNotes = await downloadNotesFromDrive();
      await notesCollection.deleteMany({});
      await notesCollection.insertMany(cloudNotes);
      logSuccess("Notes downloaded from Google Drive.");
    }
  };
  
  export const setReminder = async (args) => {
    const [dueDate, email] = args;
    await scheduleNoteReminder(dueDate, email);
    logSuccess("Reminder scheduled.");
  };
  
  export const createRecurringTask = async (args) => {
    const [task, frequency] = args;
    await createRecurringTaskSchedule(task, frequency);
    logSuccess("Recurring task created.");
  };
  
  // Helper function to parse flag arguments
  const getFlagValue = (args, flag) => {
    const arg = args.find(arg => arg.startsWith(flag));
    return arg ? arg.split('=')[1] : null;
  };
  