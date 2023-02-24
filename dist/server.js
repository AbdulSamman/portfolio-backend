import { createTransport } from "nodemailer";
import cors from "cors";
import express from "express";
import * as model from "./model.js";
const port = model.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
// service, welche email type
// auth muss pass and not password
const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_MAIL_ACCOUNT_USER,
        pass: process.env.GOOGLE_MAIL_NODEMAILER_PASSWORD,
    },
});
// const mailOptions = {
//   from: `Samman's Tech Flashcard <${process.env.GOOGLE_MAIL_ACCOUNT_USER}@gmail.com>`,
//   to: `sammanab@outlook.de`,
//   subject: "Daily Tech Flashcard",
//   html: `
//     <h1>Flashcards</h1>
//     <p>What does HTML stand for?</p>
//     <p>Click here for the answer: <a href="http://www.5amman.eu/">https://5amman.eu/</a></p>
//     `,
// };
// transporter.sendMail(mailOptions, (err, info) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`Email send: ` + info.response);
//   }
// });
app.get("/", (req, res) => {
    try {
        res.status(200).send(model.getApiInstructions());
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.get("/contacts", async (req, res) => {
    try {
        const result = await model.getContactForm();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.post("/contact", async (req, res) => {
    const contactForm = req.body;
    console.log(contactForm);
    //const result = await model.sendContactForm(contactForm);
    res.status(200).json(await model.sendContactForm(contactForm));
});
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map