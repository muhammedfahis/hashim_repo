const express = require("express");
const app = express()
const fs = require("fs")

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
    res.render('index')
})

app.post("/upload", (req, res) => {
    const file = req.body.file;
    if(file.match(/^data:image\/png;base64,/)){
        const file_data = file.replace(/^data:image\/png;base64,/, "");
        // const file_data = file.replace(/^data:image\/png|jpg|jpeg;base64,/, "");
        fs.writeFile("test.png", file_data, 'base64', (err) => {
            if(err) throw err
        })
    }
    if(file.match(/^data:image\/jpeg;base64,/)){
        const file_data = file.replace(/^data:image\/jpeg;base64,/, "");
        // const file_data = file.replace(/^data:image\/png|jpg|jpeg;base64,/, "");
        fs.writeFile("test.jpeg", file_data, 'base64', (err) => {
            if(err) throw err
        })
    }
    
    res.send("Success")
})

app.listen(4000, () => {
    console.log("server started on 4000")
})