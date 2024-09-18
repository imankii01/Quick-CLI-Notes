import fs from "fs";
import path from "path";

export const addNote = async (db, noteContent, ...args) => {
  const notesCollection = db.collection("notes");
  const note = {
    content: noteContent,
    tags: args.find((arg) => arg.startsWith("--tag"))?.split("=")[1] || "",
    priority:
      args.find((arg) => arg.startsWith("--priority"))?.split("=")[1] ||
      "normal",
    category:
      args.find((arg) => arg.startsWith("--category"))?.split("=")[1] || "",
    subcategory:
      args.find((arg) => arg.startsWith("--subcategory"))?.split("=")[1] || "",
    due: args.find((arg) => arg.startsWith("--due"))?.split("=")[1] || null,
    createdAt: new Date()
  };
  await notesCollection.insertOne(note);
};

export const listNotes = async (db) => {
  const notesCollection = db.collection("notes");
  return notesCollection.find().toArray();
};

export const searchNotes = async (db, query) => {
  const notesCollection = db.collection("notes");
  return notesCollection
    .find({ content: { $regex: query, $options: "i" } })
    .toArray();
};

export const exportNotes = async (db, format) => {
  const notesCollection = db.collection("notes");
  const notes = await notesCollection.find().toArray();

  const filePath = path.resolve(process.cwd(), `notes_export.${format}`);
  if (format === "json") {
    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
  } else if (format === "csv") {
    const csvContent = notes
      .map((note) =>
        [
          note.content,
          note.tags,
          note.priority,
          note.category,
          note.subcategory,
          note.due,
          note.createdAt ? note.createdAt.toISOString() : ""
        ].join(",")
      )
      .join("\n");
    fs.writeFileSync(filePath, csvContent);
  }
};

export const importNotes = async (db, filePath) => {
  const notesCollection = db.collection("notes");
  const ext = path.extname(filePath);
  const data = fs.readFileSync(filePath, "utf-8");

  let notes;
  if (ext === ".json") {
    notes = JSON.parse(data);
  } else if (ext === ".csv") {
    notes = data.split("\n").map((line) => {
      const [content, tags, priority, category, subcategory, due, createdAt] =
        line.split(",");
      return {
        content,
        tags,
        priority,
        category,
        subcategory,
        due,
        createdAt: createdAt ? new Date(createdAt) : new Date()
      };
    });
  }
  await notesCollection.insertMany(notes, { ordered: false });
};

export const integrateService = async (service) => {
  // Placeholder for integration logic
};
