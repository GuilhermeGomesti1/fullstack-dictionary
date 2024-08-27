import mongoose, { Document, Schema } from "mongoose";

interface IWord extends Document {
  word: string;
}

const wordSchema = new Schema<IWord>({
  word: { type: String, required: true },
});

const Word = mongoose.model<IWord>("Word", wordSchema, "dicWords");
export default Word;
export { IWord };
