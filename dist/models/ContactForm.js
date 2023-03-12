import mongoose from "mongoose";
const formSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, "name must be at least 2 characters long"],
        required: [true, "name is required"],
    },
    subject: {
        type: String,
        minlength: [2, "subject must be at least 2 characters long"],
        required: [true, "subject is required"],
    },
    email: {
        type: String,
        lowerCase: true,
        required: [true, "email is required"],
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email, e.g. name@company.com",
        },
    },
    message: {
        type: String,
        minlength: [4, "message must be at least 2 characters long"],
        required: [true, "message is required"],
    },
}, { versionKey: false });
export const ContactForm = mongoose.model("contactform", formSchema);
//# sourceMappingURL=ContactForm.js.map