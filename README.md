Sure! Here’s an advanced and professional README template for your **Quick CLI Notes** package, updated to reflect the MongoDB integration, command usage, and features.

---

# Quick CLI Notes

[![npm](https://img.shields.io/npm/v/quick-cli-notes)](https://www.npmjs.com/package/quick-cli-notes) [![License](https://img.shields.io/npm/l/quick-cli-notes)](LICENSE) ![Node.js CI](https://github.com/username/quick-cli-notes/actions/workflows/node.js.yml/badge.svg)

A simple and powerful CLI tool to quickly create, manage, and organize notes right from your terminal. This tool allows you to store your notes locally or in MongoDB with support for tags, priority levels, and search functionality.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [Add a Note](#add-a-note)
  - [List Notes](#list-notes)
  - [Edit a Note](#edit-a-note)
  - [Remove a Note](#remove-a-note)
  - [Search Notes](#search-notes)
- [MongoDB Integration](#mongodb-integration)
  - [Setting Up MongoDB](#setting-up-mongodb)
  - [Environment Variables](#environment-variables)
- [Advanced Features](#advanced-features)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

Install the package globally using npm:

```bash
npm install -g quick-cli-notes
```

This will make the `quicknote` command available globally on your system.

## Features

- **Add notes**: Quickly add notes with an optional tag and priority level.
- **List notes**: View all your notes, filter by tag, or priority.
- **Edit notes**: Modify an existing note by its index.
- **Remove notes**: Delete a note by its index.
- **Search notes**: Search through your notes by keyword.
- **MongoDB integration**: Store your notes in a MongoDB database for persistent, scalable storage.
- **Priority and Tags**: Organize notes by setting priority levels and tags (e.g., `work`, `personal`).

## Usage

### Add a Note

Add a new note with optional tag and priority (default tag is `general` and priority is `low`):

```bash
quicknote add "This is a new note" --tag work --priority high
```

**Options:**

- `--tag`: Assign a tag to the note (default: `general`).
- `--priority`: Set the priority level (`low`, `medium`, `high`).

### List Notes

List all notes, filter by tag or priority:

```bash
quicknote list
```

**Optional Filters:**

- `--tag <tag>`: Filter notes by tag.
- `--priority <priority>`: Filter notes by priority level.

Example:

```bash
quicknote list --tag work
```

### Edit a Note

Edit a note by its index:

```bash
quicknote edit <index> "Updated note text"
```

Example:

```bash
quicknote edit 2 "Updated note with new content"
```

### Remove a Note

Remove a note by its index:

```bash
quicknote remove <index>
```

Example:

```bash
quicknote remove 3
```

### Search Notes

Search for notes that contain a specific keyword:

```bash
quicknote search <keyword>
```

Example:

```bash
quicknote search "meeting"
```

## MongoDB Integration

The package allows you to use MongoDB for storing notes. This is especially useful when you need a scalable and persistent storage solution.

### Setting Up MongoDB

1. Create a **MongoDB cluster** on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or use your local MongoDB server.
2. Get your MongoDB connection URI (something like this):

   ```
   mongodb+srv://username:password@cluster.mongodb.net/quicknotesDB?retryWrites=true&w=majority
   ```

3. Add your MongoDB URI to the environment variables (explained below).

### Environment Variables

To secure your MongoDB connection, use an environment variable to store the MongoDB URI. Create a `.env` file in your project root:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quicknotesDB?retryWrites=true&w=majority
```

Make sure your `.env` file is not exposed publicly by adding it to your `.gitignore`:

```bash
echo ".env" >> .gitignore
```

In production, set the environment variable `MONGODB_URI` with your MongoDB URI.

## Advanced Features

1. **Tag and Priority Management**: Organize your notes with custom tags and priority levels. Example: `quicknote add "Buy groceries" --tag personal --priority high`.
2. **Timestamps**: Track when notes were created or updated (possible feature enhancement).
3. **Cloud Storage**: Use MongoDB for cloud-based storage.
4. **User Authentication**: Future plans for integrating user authentication to allow multi-user support and personal note management.
5. **Encryption**: Option to encrypt sensitive notes (future feature).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you'd like to contribute to this project.

To contribute:

1. Fork this repository.
2. Create a new feature branch.
3. Make your changes and ensure the tests pass.
4. Submit a pull request.

## License

This project is licensed under the [linkedin.com/in/imankii01/](LICENSE).

---

### Example Workflow

1. **Adding Notes**:
   ```bash
   quicknote add "Complete CLI tool project" --tag work --priority high
   ```

2. **Listing Notes**:
   ```bash
   quicknote list --tag work
   ```

3. **Searching Notes**:
   ```bash
   quicknote search "CLI"
   ```
