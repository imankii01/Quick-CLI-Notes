import nodemailer from 'nodemailer';
import cron from 'node-cron';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const scheduleNoteReminder = (dueDate, email) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Task Reminder',
    text: `Reminder: You have a task due on ${dueDate}`,
  };

  const date = new Date(dueDate);
  const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;

  cron.schedule(cronTime, () => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("Error sending email:", err);
      else console.log("Reminder sent:", info.response);
    });
  });
};
