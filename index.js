const express = require("express"),
  JSZip = require("jszip"),
  sample_data = require("./sample_data.json");

const app = express();
const zip = new JSZip();

app.get("/download-zip/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  let data = sample_data.find((x) => x.id == user_id);
  zip
    .folder("user_details")
    .file(`${data.name}_details.txt`, JSON.stringify(data, null, 2));
  zip.file("README.md", "This is a sample readme file");
  zip.generateAsync({ type: "base64" }).then((base64) => {
    let zip = Buffer.from(base64, "base64");
    res.writeHead(200, {
      "Content-Type": "application/zip",
      "Content-disposition": `attachment; filename=user_report.zip`,
    });
    res.end(zip);
  });
});

app.listen(3002);
