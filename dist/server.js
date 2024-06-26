import cors from "cors";
import express from "express";
import * as model from "./model.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET"],
    credentials: true,
}));
// test
app.get("/", (req, res) => {
    try {
        res.status(200).send(model.getApiInstructions());
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//get Projects
app.get("/projects", (req, res) => {
    try {
        res.status(200).send(model.getProjects());
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//get skills
app.get("/skills", (req, res) => {
    try {
        res.status(200).send(model.getSkills());
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//get personData
app.get("/person", (req, res) => {
    try {
        res.status(200).send(model.getPerson());
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
    try {
        const contactForm = req.body;
        res.status(200).json(await model.sendContactForm(contactForm));
        model.sendEmailToUser(contactForm);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map