'use strict'

const request = require("request")
const fs = require("fs")
const filePath = process.env.FILE_PATH || "/data/"
const parserUri = process.env.PARSER_APP_URI || "http://127.0.0.1:6001"

const calculate = (req, res) => {

    if (!req.body || !req.body.file) res.json({
        "file": null,
        "error": "Invalid JSON input."
    })
    else {
        let path = filePath + req.body.file
        fs.stat(path, function (err, stat) {
            if (err == null) {
                console.log(parserUri)
                request({
                    "method": "POST",
                    "uri": `${parserUri}/parse`,
                    "body": req.body,
                    "json": true,
                    "headers": {
                        "Content-Type": "application/json"
                    }
                }, (err, resp, body) => {
                    if (err) {
                        console.log(err)
                    } else
                        res.json(body)
                })
            } else if (err.code === 'ENOENT') {
                res.json({
                    "file": req.body.file,
                    "error": "File not found."
                })
            } else {
                console.log('Some other error: ', err.code);
            }
        });

    }
}

const storefile = (req, res) => {

    if (!req.body || !req.body.file) {
        res.json({
            "file": null,
            "error": "Invalid JSON input."
        })

    } else {

        let path = filePath + req.body.file
        console.log(path)
        fs.writeFile(path, req.body.data, (err) => {
            if (err) {
                console.log(err)
                res.json({
                    "file": req.body.file,
                    "error": "Error while storing the file to the storage."
                })
            } else {
                res.json({
                    "file": req.body.file,
                    "message": "Success."
                })
            }
        })
    }
}

module.exports = {
    calculate,
    storefile
}
