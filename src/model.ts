import { ContactForm } from "./models/ContactForm.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { IContactForm } from "./interfaces.js";
dotenv.config();

const MONGODB_CONNECTION =
  process.env.MONGODB_CONNECTION || "mongodb://localhost/contactForm";

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_CONNECTION);

export const PORT = process.env.PORT;

export const getContactForm = async () => {
  const formData: IContactForm[] = await ContactForm.find();
  return formData;
};

export const sendContactForm = (contactForm: IContactForm) => {
  return new Promise(async (resolve, reject) => {
    try {
      const addContactForm = await ContactForm.create(contactForm);
      console.log(contactForm);
      resolve({
        status: "success",
        newId: addContactForm._id,
        addContactForm,
      });
    } catch (error) {
      reject({
        status: "error",
        message: "check your information",
      });
    }
  });
};

export const getApiInstructions = () => {
  return `
    <style>
	body {
		background-color: #444;
		padding: 1rem;
		color: #fff;
		font-family: courier;
	}
	a {
		color: yellow;
	}
</style>
<h1>Employees Site API</h1>
<ul>
	<li><a href="employees">/employees</a> - get all employees</li>
	
</ul>
	`;
};
