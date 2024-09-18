import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'notes.json');

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(filePath, dataJSON);
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('Your Notes:'));
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note}`);
  });
};

const addNote = (note) => {
  const notes = loadNotes();
  notes.push(note);
  saveNotes(notes);
  console.log(chalk.green('New note added!'));
};

const removeNote = (index) => {
  let notes = loadNotes();
  const noteIndex = parseInt(index, 10) - 1;
  if (noteIndex >= 0 && noteIndex < notes.length) {
    const removed = notes.splice(noteIndex, 1);
    saveNotes(notes);
    console.log(chalk.red(`Removed note: "${removed[0]}"`));
  } else {
    console.log(chalk.red('Invalid note index.'));
  }
};

export { listNotes, addNote, removeNote };
