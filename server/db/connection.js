const mongoose = require("mongoose")

const url = `mongodb+srv://yogeshsagaluri:hGSkqFExArNfYA0e@cluster0.jnnxa.mongodb.net/`;



mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to DB")).catch((e) => console.log("Error", e))