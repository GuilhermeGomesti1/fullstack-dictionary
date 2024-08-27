import Word, { IWord } from "../models/word";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export async function saveWordsToMongo(words: string[]): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    const wordDocuments = words.map((word) => ({ word }));
    await Word.insertMany(wordDocuments);
    console.log("Words saved to MongoDB successfully!");
  } catch (error) {
    console.error("Error saving words to MongoDB:", error);
  } finally {
    await mongoose.disconnect();
  }
}
