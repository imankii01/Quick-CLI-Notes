# Quick CLI Notes

Quick CLI Notes is a simple and advanced command-line tool to manage your notes efficiently.

## Installation

```bash
npm install -g quick-cli-notes

///

---

### How to Run the Project

1. **Install dependencies**:
   - Navigate to the project directory and install the dependencies:
     ```bash
     npm install
     ```

2. **Make your CLI tool executable**:
   - After installing dependencies, link the project globally to use `quicknote` as a command:
     ```bash
     npm link
     ```

3. **Use the tool**:
   - Now you can use the tool in your terminal:
     ```bash
     quicknote add "Finish the report" --tag work --priority high
     quicknote list --tag work
     quicknote remove 1
     ```

### Improvements and Extensions

1. You can later switch from JSON file-based storage to SQLite, MongoDB, or Firebase for persistent storage.
2. Add encryption for sensitive notes using libraries like `crypto`.
3. Add note reminders or deadlines with a notification feature.

Let me know if you need any further help!

