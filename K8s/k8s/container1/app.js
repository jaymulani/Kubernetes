'use strict'

const express = require("express")
const app = express()
const controller = require("./controller")
const port = process.env.PORT || 6000
let reqNum = 0
app.use((req, res, next) => {
    console.info(`Request ${reqNum++} -`, req.method, req.headers['x-forwarded-for'] || req.connection.remoteAddress, req.path);
    next();
});

app.use(express.json())
app.use("/",  controller)
app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('Server started on port', port);
    }
})

module.exports = app
