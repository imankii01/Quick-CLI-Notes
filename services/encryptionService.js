import CryptoJS from "crypto-js";

const encryptionKey = process.env.ENCRYPTION_KEY;

export const encryptNote = (noteContent) => {
  return CryptoJS.AES.encrypt(noteContent, encryptionKey).toString();
};

export const decryptNote = (encryptedContent) => {
  const bytes = CryptoJS.AES.decrypt(encryptedContent, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
