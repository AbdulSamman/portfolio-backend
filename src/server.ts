import cors from "cors";
import express from "express";
import * as model from "./model.js";
import { IContactForm } from "./interfaces.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.get("/", (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send(model.getApiInstructions());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/contacts", async (req: express.Request, res: express.Response) => {
  try {
    const result = await model.getContactForm();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/contact", async (req: express.Request, res: express.Response) => {
  try {
    const contactForm: IContactForm = req.body;
    res.status(200).json(await model.sendContactForm(contactForm));
    model.sendEmailToUser(contactForm);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
