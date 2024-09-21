import cron from 'node-cron';

export const createRecurringTaskSchedule = (task, frequency) => {
  cron.schedule(frequency, () => {
    console.log(`Recurring task: ${task}`);
  });
};
