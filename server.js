const dbFunctions = require("./dbFunctions");
const express = require("express");
const port = process.env.PORT || 5000;
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/contacts", dbFunctions.getAllContacts)
app.get("/contacts/:id", dbFunctions.getOneContact)
app.post("/contacts", dbFunctions.insertContact)
app.patch("/contacts/:id", dbFunctions.updateContact)
app.delete("/contacts/:id", dbFunctions.deleteContact)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})