import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    firstName: String,
  },
  { versionKey: false }
);

export const ContactForm = mongoose.model("contactform", formSchema);
