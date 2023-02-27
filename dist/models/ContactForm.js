import mongoose from "mongoose";
const formSchema = new mongoose.Schema({
    name: String,
    subject: String,
    email: {
        type: String,
        lowerCase: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email, e.g. name@company.com",
        },
    },
    message: {
        type: String,
        required: true,
    },
}, { versionKey: false });
export const ContactForm = mongoose.model("contactform", formSchema);
//# sourceMappingURL=ContactForm.js.map