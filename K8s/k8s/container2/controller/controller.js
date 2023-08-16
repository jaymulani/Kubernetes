'use strict'

const csv = require('csv-parser')
const fs = require('fs');
const filePath = process.env.FILE_PATH || "/data/"

const parse = async (req, res) => {
  let path = filePath + req.body.file
  let sum = 0;
  await fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const isCSV = isCSVFormat(data);
    if (isCSV) {
      fs.createReadStream(path)
        .pipe(csv({
          mapHeaders: ({ header, index }) => header.trim(),
          mapValues: ({ header, index, value }) => value.trim()
        }))
        .on("data", (data) => {
          console.log("row", data)
          if (data.product.toLowerCase() === req.body.product.toLowerCase()) {
            sum += parseInt(data.amount)
            console.log("continuous sum - ", sum)
          }
        })
        .on("end", () => {
          if (sum == 0) {
            res.json({
              file: req.body.file,
              "error": "Input file not in CSV format."
            })
          } else {
            res.json({
              file: req.body.file,
              sum: sum.toString()
            })
          }
        })
    } else {
      res.json({
        "file": req.body.file,
        "error": "Input file not in CSV format."
      })
    }
  });
}

function isCSVFormat(content) {
  const lines = content.trim().split('\n');
  if (lines.length === 0) {
    console.log("Failed:1")
    return false;
  }

  const firstLine = lines[0].trim();
  const values = firstLine.split(',');
  if (values.length <= 1) {
    console.log("Failed:2")
    return false;
  } else if (values[0].toLowerCase() !== "product" || values[1].trim().toLowerCase() !== "amount") {
    console.log("Failed:3")

    return false
  }

  const numValues = values.length;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineValues = line.split(',');
    if (lineValues.length !== numValues) {
      console.log("Failed:4")

      return false;
    }
  }

  return true;
}

module.exports = {
  parse
}
