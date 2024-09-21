import chalk from 'chalk';
import Table from 'cli-table';

export const logSuccess = (message) => {
  console.log(chalk.green(message));
};

export const logError = (message) => {
  console.log(chalk.red(message));
};

export const logTable = (data) => {
  const table = new Table({ head: Object.keys(data[0]) });
  data.forEach((row) => {
    table.push(Object.values(row));
  });
  console.log(table.toString());
};

export const displayHelp = () => {
  console.log(chalk.blue("CLI Help:"));
  console.log("Usage: quicknote <command> [options]");
  console.log("Commands:");
  console.log("  add <note> --tag=<tag> --priority=<priority> --due=<date>");
  console.log("  list");
  console.log("  search <query>");
  console.log("  export [json|csv]");
  console.log("  import <file>");
  console.log("  encrypt");
  console.log("  decrypt");
  console.log("  sync upload|download");
  console.log("  reminder <date> <email>");
  console.log("  recurring <task> <frequency>");
};
