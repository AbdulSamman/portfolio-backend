import { ContactForm } from "./models/ContactForm.js";
import mongoose from "mongoose";
import { createTransport } from "nodemailer";
import { IContactForm } from "./interfaces.js";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_CONNECTION =
  process.env.MONGODB_CONNECTION || "mongodb://localhost/contactForm";

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_CONNECTION);

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
  // service, email type
  // auth muss pass and not password
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_MAIL_ACCOUNT_USER,
      pass: process.env.GOOGLE_MAIL_NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: `<do-not-reply> Samman's Web Development Services`,
    to: `${contactForm.email}`,
    bcc: `${"sammanab@outlook.de"}`,
    subject: `<no-reply> ${contactForm.subject}`,
    html: `
    <h1>Hello ${contactForm.name}!</h1>
    <p>Thank you for contacting me, I will get back to you as soon as possible.</p>
    <p>Click here to visit me: <a href="http://www.5amman.eu/">https://5amman.eu/</a></p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    const dt = new Date();
    console.log(`TIME: ${dt.toISOString()}`);
    if (err) {
      console.log(err);
    } else {
      console.log(`Email send: ` + info.response);
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
<h1>DATA Site API</h1>
<ul>
	<li><a href="/contacts">/contacts</a> - get all contacts</li>
	
</ul>
	`;
};
