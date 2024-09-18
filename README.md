

# 📓 **Quick CLI Notes**

`quick-cli-notes` is a sophisticated command-line interface (CLI) tool for efficient note management and task organization. With a suite of powerful features, this tool is designed to help you stay organized, productive, and in control of your tasks.

## 🚀 **Version 1.1.1**

This version includes new features, enhancements, and fixes to improve your experience with note management.

## 📑 **Table of Contents**

- [🌟 Features](#-features)
  - [📝 Add Notes](#-add-notes)
  - [📜 List Notes](#-list-notes)
  - [🔍 Search Notes](#-search-notes)
  - [📤 Export Notes](#-export-notes)
  - [📥 Import Notes](#-import-notes)
  - [🔗 Integration](#-integration)
  - [❓ Help](#-help)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
  - [Environment Variables](#environment-variables)
- [🛠️ Development and Contribution](#-development-and-contribution)
- [📜 License](#-license)
- [📧 Contact](#-contact)

## 🌟 **Features**

### 📝 **Add Notes**

Create new notes with extensive customization options. Tailor each note with tags, priority levels, categories, and due dates to keep your tasks organized.

- **Command:**

  ```bash
  quicknote add "<content>" [options]
  ```

- **Options:**

  - `--tag <tag>`: Assign tags to categorize your note.
  - `--priority <priority>`: Set the priority level (`low`, `normal`, `high`).
  - `--category <category>`: Specify a category for better organization.
  - `--subcategory <subcategory>`: Further classify the note under a subcategory.
  - `--due <date>`: Set a due date in `YYYY-MM-DD` format.

- **Example:**

  ```bash
  quicknote add "Meeting with team at 10 AM" --tag work --priority high --category work --subcategory meetings --due "2024-10-01"
  ```

### 📜 **List Notes**

Display all your notes in a neatly formatted table, including details such as content, tags, priority, category, and due dates.

- **Command:**

  ```bash
  quicknote list
  ```

### 🔍 **Search Notes**

Find specific notes using keywords. This feature is essential for quickly locating relevant information amidst a large number of notes.

- **Command:**

  ```bash
  quicknote search "<query>"
  ```

### 📤 **Export Notes**

Export your notes to various formats for backup, sharing, or processing. This ensures that your data is safe and easily accessible.

- **Commands:**

  - **To JSON:**

    ```bash
    quicknote export json
    ```

  - **To CSV:**

    ```bash
    quicknote export csv
    ```

### 📥 **Import Notes**

Import notes from external files to integrate or restore your data. This feature supports both JSON and CSV formats.

- **Commands:**

  - **From JSON:**

    ```bash
    quicknote import notes_export.json
    ```

  - **From CSV:**

    ```bash
    quicknote import notes_export.csv
    ```

### 🔗 **Integration**

Seamlessly connect with external services like Google Calendar. This integration will help synchronize your notes with your calendar for better task management.

- **Command:**

  ```bash
  quicknote integrate google-calendar
  ```

### ❓ **Help**

Get a detailed list of available commands and their usage to fully leverage the capabilities of `quick-cli-notes`.

- **Command:**

  ```bash
  quicknote help
  ```

## 📦 **Installation**

To install `quick-cli-notes`, use npm to install it globally on your system:

```bash
npm install -g quick-cli-notes
```

## 🔧 **Configuration**

### **Environment Variables**

Create a `.env` file in the root directory of your project to configure the tool:

- **Variables:**
  - `MONGODB_URI`: Your MongoDB connection string.

**Example `.env` file:**

```
MONGODB_URI=mongodb://your-mongodb-uri
```

Ensure this file is added to your `.gitignore` to keep sensitive information secure.

## 🛠️ **Development and Contribution**

We encourage contributions to make `quick-cli-notes` even better! Follow these steps to contribute:

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/imankii01/Quick-CLI-Notes
   ```

3. **Create a new branch** for your feature or fix:

   ```bash
   git checkout -b feature/your-feature
   ```

4. **Make your changes** and **commit** them:

   ```bash
   git commit -am 'Add new feature'
   ```

5. **Push** to the branch:

   ```bash
   git push origin feature/your-feature
   ```

6. **Submit a Pull Request** on GitHub to propose your changes.

## 📜 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 📧 **Contact**

For any questions, feedback, or support, please reach out:

- **Name**: Ankit
- **Email**: [private.ankit047@gmail.com](mailto:private.ankit047@gmail.com)
- **LinkedIn**: [linkedin.com/in/imankii01](https://linkedin.com/in/imankii01)

---

This `README.md` file provides a comprehensive and professional overview of the `quick-cli-notes` tool, including detailed descriptions of features, commands, installation steps, configuration, and contribution guidelines. The Table of Contents enhances navigation, and the use of emojis and structured formatting makes the document visually appealing and user-friendly.
