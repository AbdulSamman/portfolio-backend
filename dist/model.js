import { ContactForm } from "./models/ContactForm.js";
import mongoose from "mongoose";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION || "mongodb://localhost/contactForm";
mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_CONNECTION);
export const getContactForm = async () => {
    const formData = await ContactForm.find();
    return formData;
};
export const sendContactForm = (contactForm) => {
    return new Promise(async (resolve, reject) => {
        try {
            const addContactForm = await ContactForm.create(contactForm);
            resolve({
                status: "success",
                newId: addContactForm._id,
                addContactForm,
            });
        }
        catch (error) {
            reject({
                status: "error",
                message: "check your information",
            });
        }
    });
};
export const sendEmailToUser = (contactForm) => {
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
        from: `<do-not-replay> Samman's Web Development Services`,
        to: `${contactForm.email}`,
        subject: `<no-replay> ${contactForm.subject}`,
        html: `
    <h1>Hello ${contactForm.name}!</h1>
    <p>Thank you for contacting me, I will get back to you as soon as possible.</p>
    <p>Click here to visit me: <a href="http://www.5amman.eu/">https://5amman.eu/</a></p>
    `,
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
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
<h1>Employees Site API</h1>
<ul>
	<li><a href="employees">/employees</a> - get all employees</li>
	
</ul>
	`;
};
//# sourceMappingURL=model.js.map