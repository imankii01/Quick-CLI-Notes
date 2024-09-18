#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { listNotes, addNote, removeNote } from '../lib/notes.js';

program.version('1.0.0').description('Quick CLI Notes App');

program
  .command('list')
  .description('List all notes')
  .action(() => {
    listNotes();
  });

program
  .command('add <note>')
  .description('Add a new note')
  .action((note) => {
    addNote(note);
  });

program
  .command('remove <index>')
  .description('Remove a note by index')
  .action((index) => {
    removeNote(index);
  });

program.parse(process.argv);
