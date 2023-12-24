const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/ShortURL");

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", {
    useNewUrlParser: true, useUnifiedTopology: true
})

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


app.get("/", async (req, res) => {
    const datas = await ShortUrl.find();
    res.render('index', { datas: datas });
})

app.post("/urlShortner", async (req, res) => {
    const longURL = req.body.originalURL;
    await ShortUrl.create({ full: longURL })
    res.redirect('/')
})

app.listen(process.env.PORT || 5000);