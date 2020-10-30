import React, { useState, useEffect } from "react";
import "./App.css";

import { useInput } from "./useInput";

function App() {
  const [contacts, setContacts] = useState(null);
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: phone, bind: bindPhone, reset: resetPhone } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");

  const handleDelete = (event) => {
    console.log(event.target.id)
    fetch(`/contacts/${event.target.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(contacts => {
      setContacts(contacts)
    })
  }

  const handleForm = (event) => {
    event.preventDefault();
    console.log(name, phone, email);
    let postBody = {
      contact: {
        name: name,
        phone: phone,
        email: email,
      },
    };
    fetch("/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((contacts) => {
        setContacts(contacts)
        resetName();
        resetPhone();
        resetEmail();
      });
  };

  useEffect(() => {
    if (!contacts) {
      fetch("/contacts")
        .then((res) => res.json())
        .then((contacts) => {
          setContacts(contacts);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="main-wrapper">
      <h1>Contacts</h1>
      <form id="contact-form" onSubmit={handleForm}>
        <input placeholder="Name" id="name" {...bindName} />
        <input placeholder="Phone" id="phone" {...bindPhone} />
        <input placeholder="Email" id="email" {...bindEmail} />
        <button type="submit">Submit</button>
      </form>
      {contacts ? (
        contacts.map((contact) => (
          <div className="contact" key={contact._id}>
            <button id={contact._id} className="delete" onClick={handleDelete}>X</button>
            <p>{contact.name}</p>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
          </div>
        ))
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
}

export default App;
