const DataStore = require("./datastore.js");
const url = "mongodb+srv://playgroundUser:playgroundPassword@mern-stack-playground.pandb.mongodb.net";

let myDataBase = new DataStore(
  url,
  "address_book",
  "contacts"
)

/*
* Contact schema
{
  name: string,
  phone: string,
  email: string,
  updated: date
}
*/

const getAllContacts = async (req, res) => {
  let response = await myDataBase.getAll();
  console.log(response);
  if (response.status === "ok") {
    res.status(200).send(response.data);
  } else {
    res.status(400).send(response.error);
  }
}

const insertContact = async (req, res) => {
  let contact = req.body.contact
  let date = new Date().toLocaleDateString();
  let newContact = {
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    updated: date,
  }
  let response = await myDataBase.insert(newContact);
  console.log(response);
  if (response.status === "ok") {
    let contacts = await myDataBase.getAll();
    if (contacts.status === "ok") {
      res.status(200).send(contacts.data);
    } else {
      res.status(400).send(contacts.error);
    }
  } else {
    res.status(400).send(contacts.error);
  }
}

const getOneContact = async (req, res) => {
  let id = req.params.id
  let response = await myDataBase.getOne(id);
  console.log(response)
  if (response.status === "ok") {
    res.status(200).send(response.data);
  } else {
    res.status(400).send(response.error);
  }
}

const updateContact = async (req, res) => {
  let id = req.params.id;
  let updateObject = req.body.updateObject
  let response = await myDataBase.update(id, updateObject);
  console.log(response);
  if (response.status === "ok") {
    let contacts = await myDataBase.getAll();
    if (contacts.status === "ok") {
      res.status(200).send(contacts.data);
    } else {
      res.status(400).send(contacts.error);
    }
  } else {
    res.status(400).send(contacts.error);
  }
}

const deleteContact = async (req, res) => {
  let id = req.params.id;
  let response = await myDataBase.delete(id);
  console.log(response);
  if (response.status === "ok") {
    let contacts = await myDataBase.getAll();
    if (contacts.status === "ok") {
      res.status(200).send(contacts.data);
    } else {
      res.status(400).send(contacts.error);
    }
  } else {
    res.status(400).send(contacts.error);
  }
}

module.exports = {
  getAllContacts: getAllContacts,
  getOneContact: getOneContact,
  insertContact: insertContact,
  updateContact: updateContact,
  deleteContact: deleteContact,
}
