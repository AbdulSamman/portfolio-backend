import { ContactForm } from "./models/ContactForm.js";
import mongoose from "mongoose";
import { IContactForm,IPerson,IProject,ISkill } from "./interfaces.js";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs"
const MONGODB_CONNECTION =
  process.env.MONGODB_CONNECTION || "mongodb://localhost/contactForm";

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_CONNECTION);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//data

export const getProjects=()=>{
try {
    const project  =  fs.readFileSync("./src/data/projects.json","utf-8")
    return JSON.parse(project) as IProject[]
} catch (error) {
  console.error("Error reading person data:",error);

}

}

export const getSkills=()=>{
  try {
      const skills=  fs.readFileSync("./src/data/skills.json","utf-8")
      return JSON.parse(skills) as ISkill
  } catch (error) {
    console.error("Error reading person data:",error);

  }

  }

  export const getPerson=()=>{
    try {
        const personData=  fs.readFileSync("./src/data/person.json","utf-8")
        return JSON.parse(personData) as IPerson
    } catch (error) {
      console.error("Error reading person data:",error);

    }

    }

export const getContactForm = async () => {
  const formData: IContactForm[] = await ContactForm.find();
  return formData;
};

export const sendContactForm = (contactForm: IContactForm) => {
  return new Promise(async (resolve, reject) => {
    try {
      const addContactForm = await ContactForm.create(contactForm);

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

export const sendEmailToUser = (contactForm: IContactForm) => {
  const msg = {
    to: `${contactForm.email}`,
    from: {
      name: "<no-reply> Samman's Web Development Services",
      email: process.env.GOOGLE_MAIL_ACCOUNT_USER,
    },
    bcc: process.env.PRIVATE_EMAIL,
    subject: `<no-reply> ${contactForm.subject}`,
    text: "<no-reply> Samman's Web Development Services",
    html: `
  <h1>Hello ${contactForm.name}!</h1>
  <p>Thank you for contacting me, I will get back to you as soon as possible.</p>
  <p>Your message:</p>
  <blockquote><em>${contactForm.message}</em></blockquote>
  <p>Click here to visit me: <a href="https://portfolio-psi-seven-56.vercel.app">Samman'S portfolio</a></p>
  `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
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
<h1>DATA Site API</h1>
<ul>
	<li><a href="/contacts">/contacts</a> - get all contacts</li>
  <li><a href="/projects">/projects</a> - get all projects</li>
</ul>
	`;
};
