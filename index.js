const express = require('express');
const axios = require('axios');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


http.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

async function requestShots() {
    const response = await axios.get(`https://api.dribbble.com/v2/user/shots?access_token=${process.env.API_KEY}`)
    try {
        app.get("/getProject", (req, res) => {
            res.send(response.data)
        })
    } catch (err) {
        console.log(err)
    }
}
async function requestUser() {
    const response = await axios.get(`https://api.dribbble.com/v2/user/?access_token=${process.env.API_KEY}`)
    try {
        app.get("/getUser", (req,res) => {
            res.send(response.data)
        })
    } catch (err) {
        console.log(err)
    }
}

requestShots()
requestUser()
