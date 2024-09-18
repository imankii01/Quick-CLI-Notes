#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { listNotes, addNote, removeNote, editNote, searchNotes } from '../lib/notes.js';

program.version('1.0.0').description('Quick CLI Notes App');

// Command to add a note with optional tag and priority
program
  .command('add <note>')
  .description('Add a new note with an optional tag and priority')
  .option('--tag <tag>', 'Tag for the note', 'general')
  .option('--priority <priority>', 'Priority of the note (low, medium, high)', 'low')
  .action((note, options) => {
    addNote(note, options.tag, options.priority);
  });

// Command to list all notes or filter by tag/priority
program
  .command('list')
  .description('List all notes or filter by tag/priority')
  .option('--tag <tag>', 'Filter notes by tag')
  .option('--priority <priority>', 'Filter notes by priority')
  .action((options) => {
    listNotes(options.tag, options.priority);
  });

// Command to remove a note by its index
program
  .command('remove <index>')
  .description('Remove a note by its index')
  .action((index) => {
    removeNote(index);
  });

// Command to edit a note by its index
program
  .command('edit <index> <newText>')
  .description('Edit an existing note by index')
  .action((index, newText) => {
    editNote(index, newText);
  });

// Command to search for notes by a keyword
program
  .command('search <keyword>')
  .description('Search for notes containing a keyword')
  .action((keyword) => {
    searchNotes(keyword);
  });

program.parse(process.argv);
